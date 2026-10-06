# Cyprus Orienteering Cup - Android App

## Описание
Нативное Android-приложение, написанное на Kotlin. Использует Supabase для бекенда и авторизации.

## Стек технологий
- **Язык**: Kotlin
- **Архитектура**: MVVM (Model-View-ViewModel)
- **Интерфейс**: Jetpack Compose (рекомендуется для современных UI)
- **Бекенд/База данных**: Supabase Kotlin SDK
- **Пуш-уведомления**: Firebase Cloud Messaging (FCM)

## Шаги для инициализации проекта
Так как правильная настройка Gradle и структуры Android проекта лучше всего выполняется специализированной средой, пожалуйста, выполните следующие шаги:

1. Откройте **Android Studio** (скачайте, если еще не установлена).
2. Выберите **New Project** -> **Empty Compose Activity** (для современного декларативного UI).
3. Назовите проект `CyprusCup`.
4. Укажите Package name (например, `com.cypruscup.app`).
5. Укажите путь к этой папке (`c:\wndr\repo\orienter\android`).
6. Нажмите **Finish**.

## Интеграция Supabase
После создания проекта, добавьте следующие зависимости в ваш `app/build.gradle.kts`:

```kotlin
dependencies {
    // Supabase
    implementation("io.github.jan-tennert.supabase:postgrest-kt:2.1.3")
    implementation("io.github.jan-tennert.supabase:gotrue-kt:2.1.3")
    
    // Ktor клиент для Supabase
    implementation("io.ktor:ktor-client-android:2.3.7")
}
```

Инициализация клиента (можно добавить в класс Application или DI контейнер):
```kotlin
import io.github.jan.supabase.createSupabaseClient
import io.github.jan.supabase.gotrue.GoTrue
import io.github.jan.supabase.postgrest.Postgrest

val supabase = createSupabaseClient(
    supabaseUrl = "https://YOUR_PROJECT_ID.supabase.co",
    supabaseKey = "YOUR_ANON_KEY"
) {
    install(Postgrest)
    install(GoTrue)
}
```

## Пуш-уведомления (Push Notifications)
Для добавления пуш-уведомлений вам потребуется создать проект в Firebase Console:
1. Создайте проект Firebase и привяжите ваше Android-приложение (используя Package Name, который вы указали).
2. Скачайте файл `google-services.json` и поместите его в папку `app/`.
3. Добавьте FCM SDK в `build.gradle.kts`.
4. Настройте службу `FirebaseMessagingService` для обработки входящих пуш-уведомлений.
