pipeline {
    agent { label 'built-in' }

    parameters {
        booleanParam(name: 'FORCE_ANDROID', defaultValue: false, description: 'Собрать APK, даже если android/ не менялся')
        booleanParam(name: 'APK_ON_INTEL', defaultValue: false, description: 'Собрать APK на .230, а не на agent-222 (запасной вариант: там мало памяти)')
    }

    environment {
        // === 1. НАСТРОЙКИ СЕРВЕРА И РЕЕСТРА ===
        REGISTRY_IP   = "192.168.0.222"
        REGISTRY_PORT = "5050"
        DEPLOY_SERVER = "192.168.0.230"
        SERVER_USER   = "serge"
        
        // === 2. НАСТРОЙКИ ПРОЕКТА ===
        IMG_WEB       = "${REGISTRY_IP}:${REGISTRY_PORT}/cypruscup-web"
        IMG_BACKEND   = "${REGISTRY_IP}:${REGISTRY_PORT}/cypruscup-backend"
        
        PROJECT_NAME  = "cypruscup"
        APP_PORT      = "8020" // Порт для веб-версии
        API_PORT      = "3000" // Порт для бэкенда
        
        // Путь на физическом сервере Ubuntu
        DEPLOY_DIR    = "/opt/cypruscup"

        GIT_CREDS     = "github-ssh-key"
        SSH_CREDS     = "serge"
        REPO_URL      = "git@github.com:sergesvalov/orienter.git"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', 
                    branches: [[name: "*/main"]], 
                    userRemoteConfigs: [[url: env.REPO_URL, credentialsId: env.GIT_CREDS]]
                ])
            }
        }

        stage('Test Backend (QA)') {
            steps {
                script {
                    echo "🧪 Running automated Jest tests for API Gateway..."
                    // Запускаем тесты внутри эфемерного Docker-контейнера
                    sh """
                        docker run --rm -v "\$(pwd)/backend:/app" -w /app node:20-alpine sh -c "npm install && npm test"
                    """
                }
            }
        }

        stage('Build & Push Images') {
            steps {
                script {
                    echo "🔨 Building Web Frontend..."
                    sh "docker build --platform linux/amd64 -t ${IMG_WEB}:${BUILD_NUMBER} -t ${IMG_WEB}:latest ./web"
                    echo "🔨 Building API Backend..."
                    sh "docker build --platform linux/amd64 -t ${IMG_BACKEND}:${BUILD_NUMBER} -t ${IMG_BACKEND}:latest ./backend"

                    echo "🚀 Pushing images..."
                    sh "docker push ${IMG_WEB}:${BUILD_NUMBER}"
                    sh "docker push ${IMG_WEB}:latest"
                    sh "docker push ${IMG_BACKEND}:${BUILD_NUMBER}"
                    sh "docker push ${IMG_BACKEND}:latest"
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                sshagent(credentials: [SSH_CREDS]) {
                    script {
                        sh """
                            ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${DEPLOY_SERVER} '
                                set -e
                                
                                mkdir -p ~/${PROJECT_NAME}
                                cd ~/${PROJECT_NAME}

                                echo "📄 Generating docker-compose.yml..."
                                cat <<EOF > docker-compose.yml
services:
  web:
    image: ${IMG_WEB}:${BUILD_NUMBER}
    container_name: ${PROJECT_NAME}-web
    restart: unless-stopped
    ports:
      - "${APP_PORT}:80"
  backend:
    image: ${IMG_BACKEND}:${BUILD_NUMBER}
    container_name: ${PROJECT_NAME}-backend
    restart: unless-stopped
    ports:
      - "${API_PORT}:3000"
EOF

                                echo "⬇️ Pulling images..."
                                docker compose pull

                                echo "🔄 Restarting services..."
                                docker compose up -d --remove-orphans

                                echo "🧹 Removing old cypruscup images (keeping last 3 builds)..."
                                docker images "${IMG_WEB}" --format "{{.Tag}}" | grep -E "^[0-9]+\\$" | sort -rn | tail -n +4 | xargs -r -I{} docker rmi "${IMG_WEB}:{}" || true
                                docker images "${IMG_BACKEND}" --format "{{.Tag}}" | grep -E "^[0-9]+\\$" | sort -rn | tail -n +4 | xargs -r -I{} docker rmi "${IMG_BACKEND}:{}" || true
                                
                                echo "📊 Status:"
                                docker compose ps
                            '
                        """
                    }
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    echo "🔍 Checking availability..."
                    sleep 5
                    sh "curl -f -I http://${DEPLOY_SERVER}:${APP_PORT}/"
                    sh "curl -f http://${DEPLOY_SERVER}:${API_PORT}/health"
                }
            }
        }

        // APK: только если менялся android/ (или FORCE_ANDROID)
        stage('Build Android APK') {
            when { expression { return params.FORCE_ANDROID || androidChanged() } }
            environment {
                ANDROID_BUILDER_IMAGE = "orienter-android-builder"
                AGENT_CACHE_DIR = "${env.WORKSPACE}/../orienter-caches"
                GRADLE_CACHE_DIR = "${AGENT_CACHE_DIR}/gradle"
                KEYSTORE_DIR = "${AGENT_CACHE_DIR}/signing"
                KEYSTORE_PATH = "${KEYSTORE_DIR}/release.keystore"
                KEYSTORE_ALIAS = "orienter"
                KEYSTORE_CREDENTIALS = "orienter-keystore-password" // Замените на нужный
            }
            steps {
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    withCredentials([string(credentialsId: env.KEYSTORE_CREDENTIALS, variable: 'ORIENTER_KEYSTORE_PASSWORD')]) { script {
                        sh "docker build -t ${ANDROID_BUILDER_IMAGE} - < android/Dockerfile"
                        ensureKeystore()

                        if (params.APK_ON_INTEL) {
                            echo "📱 Building Android APK on built-in (.230)"
                            try {
                                buildApk(KEYSTORE_DIR, GRADLE_CACHE_DIR, '--cpus=2 --memory=2g --memory-swap=2g', 1, null)
                                archiveArtifacts artifacts: 'android/orienter.apk', fingerprint: true
                                publishApk()
                            } finally {
                                cleanAndroidBuild()
                            }
                        } else {
                            sh 'mkdir -p .signing && docker run --rm -v "$KEYSTORE_DIR":/k -v "$(pwd)/.signing":/out alpine sh -c "cp /k/release.keystore /out/ && chown $(id -u):$(id -g) /out/release.keystore"'
                            stash name: 'signing-key', includes: '.signing/release.keystore'
                            sh 'rm -rf .signing'

                            node('agent-222') {
                                checkout scm
                                echo "📱 Building Android APK on agent-222 (arm64)"
                                sh '[ -e /proc/sys/fs/binfmt_misc/qemu-x86_64 ] || docker run --privileged --rm tonistiigi/binfmt --install amd64'
                                sh "docker build -t ${ANDROID_BUILDER_IMAGE} - < android/Dockerfile"
                                unstash 'signing-key'
                                try {
                                    buildApk("${env.WORKSPACE}/.signing", "${env.WORKSPACE}/../orienter-caches/gradle",
                                             '--memory=4g --memory-swap=4g', 4, '-Xmx3g -XX:MaxMetaspaceSize=512m -XX:+UseParallelGC -Dfile.encoding=UTF-8')
                                    archiveArtifacts artifacts: 'android/orienter.apk', fingerprint: true
                                    stash name: 'apk', includes: 'android/orienter.apk'
                                } finally {
                                    cleanAndroidBuild()
                                    sh 'rm -rf .signing'
                                }
                            }
                            unstash 'apk'
                            try {
                                publishApk()
                            } finally {
                                sh 'rm -f android/orienter.apk android/latest.json'
                            }
                        }
                    } }
                }
            }
        }
    }
}

def androidChanged() {
    def previous = env.GIT_PREVIOUS_SUCCESSFUL_COMMIT
    if (!previous) { return true }
    return sh(script: "git diff --quiet ${previous} HEAD -- android", returnStatus: true) != 0
}

def ensureKeystore() {
    sh '''
        set +x
        mkdir -p "$KEYSTORE_DIR"
        if [ -s "$KEYSTORE_PATH" ]; then
            if docker run --rm -v "$KEYSTORE_DIR":/keystore "$ANDROID_BUILDER_IMAGE" \\
                 keytool -list -alias "$KEYSTORE_ALIAS" -keystore /keystore/release.keystore \\
                 -storepass "$ORIENTER_KEYSTORE_PASSWORD" > /dev/null 2>&1; then
                echo "Ключ подписи на месте, пароль подходит"
                exit 0
            fi
            echo "Пароль из credentials не подходит к ключу - создаем новый ключ"
            docker run --rm -v "$KEYSTORE_DIR":/keystore alpine rm -f /keystore/release.keystore
        fi
        echo "Создаем ключ подписи: $KEYSTORE_PATH"
        docker run --rm -v "$KEYSTORE_DIR":/keystore "$ANDROID_BUILDER_IMAGE" \\
          keytool -genkeypair -keyalg RSA -alias "$KEYSTORE_ALIAS" -keystore /keystore/release.keystore \\
          -storepass "$ORIENTER_KEYSTORE_PASSWORD" -keypass "$ORIENTER_KEYSTORE_PASSWORD" \\
          -dname "CN=CyprusCup,O=wndr,C=CY" -validity 9999
    '''
}

def buildApk(String keystoreDir, String gradleCache, String limits, int workers, String jvmArgs) {
    sh "mkdir -p ${gradleCache}"
    def jvmOverride = jvmArgs ? "'-Dorg.gradle.jvmargs=${jvmArgs}'" : ''
    docker.image(env.ANDROID_BUILDER_IMAGE).inside("${limits} -u root --entrypoint= -v ${keystoreDir}:/keystore -v ${gradleCache}:/root/.gradle") {
        withEnv(['GRADLE_USER_HOME=/root/.gradle',
                 'ORIENTER_KEYSTORE_PATH=/keystore/release.keystore',
                 "ORIENTER_KEYSTORE_ALIAS=${env.KEYSTORE_ALIAS}"]) {
            dir('android') {
                sh """
                    export ANDROID_HOME="\$ANDROID_SDK_ROOT"
                    chmod +x gradlew || true
                    # Если проекта еще нет, пропускаем сборку чтобы не падать
                    if [ ! -f "gradlew" ]; then
                        echo "Android проект еще не инициализирован, пропускаем Gradle-сборку."
                        touch orienter.apk
                        exit 0
                    fi

                    nice -n 10 ./gradlew --no-daemon --console=plain --max-workers=${workers} ${jvmOverride} \
                      assembleRelease -PversionCode=${env.BUILD_NUMBER} || {
                        status=\$?
                        exit \$status
                      }
                    
                    find app/build/outputs/apk -name "*.apk" -exec cp {} orienter.apk \\; || touch orienter.apk
                """
            }
        }
    }
}

def cleanAndroidBuild() {
    sh "docker run --rm -v \"\$(pwd)/android\":/a alpine sh -c 'rm -rf /a/build /a/app/build /a/.gradle /a/.kotlin /a/orienter.apk /a/latest.json'"
}

def publishApk() {
    def versionName = "1.0.0" // Здесь можно вытягивать версию из build.gradle.kts
    sh """
        cd android
        SIZE=\$(stat -c %s orienter.apk 2>/dev/null || echo 0)
        SHA=\$(sha256sum orienter.apk 2>/dev/null | cut -c1-64 || echo "")
        printf '{"versionName":"%s","versionCode":%s,"size":%s,"sha256":"%s","builtAt":"%s","commit":"%s"}\n' \
          "${versionName}" "${BUILD_NUMBER}" "\$SIZE" "\$SHA" "\$(date -u +%Y-%m-%dT%H:%M:%SZ)" "\$(git rev-parse --short HEAD)" > latest.json
    """
    sshagent(credentials: [SSH_CREDS]) {
        sh """
            ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${DEPLOY_SERVER} 'sudo mkdir -p ${DEPLOY_DIR}/downloads && sudo chown ${SERVER_USER}: ${DEPLOY_DIR}/downloads'
            scp -o StrictHostKeyChecking=no android/orienter.apk ${SERVER_USER}@${DEPLOY_SERVER}:${DEPLOY_DIR}/downloads/orienter.apk.new
            scp -o StrictHostKeyChecking=no android/latest.json ${SERVER_USER}@${DEPLOY_SERVER}:${DEPLOY_DIR}/downloads/latest.json.new
            ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${DEPLOY_SERVER} 'cd ${DEPLOY_DIR}/downloads && mv -f orienter.apk.new orienter.apk && mv -f latest.json.new latest.json'
        """
    }
    echo "📲 APK выложен: http://${DEPLOY_SERVER}:${APP_PORT}/download/orienter.apk"
}
