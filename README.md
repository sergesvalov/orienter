# Cyprus Orienteering Cup 🧭

Современная кроссплатформенная система для организации, проведения и участия в соревнованиях по спортивному ориентированию.

## 🏗 Архитектура Проекта

Проект состоит из четырех основных модулей:

1. **Web Frontend (`/web`)**
   - **Стек**: React, TypeScript, Vite, Tailwind-подобная архитектура на CSS-переменных (Стиль: Glassmorphism).
   - **Особенности**: Адаптивный веб-дизайн (отлично работает в браузере), интерактивные карты (Leaflet), кэширование данных (React Query), PWA (как запасной вариант для пользователей iOS).
   
2. **Android Client (`/android`)**
   - **Стек**: Kotlin, Jetpack Compose, Retrofit.
   - **Особенности**: **Offline-First** архитектура. База данных Room сохраняет стартовые протоколы для работы в лесу без интернета. Поддержка Firebase Cloud Messaging (FCM) для экстренных Push-уведомлений.

3. **API Gateway (`/backend`)**
   - **Стек**: Node.js, Express, TypeScript.
   - **Особенности**: Проксирует запросы между клиентами и базой данных. Встроена защита от DDoS (Rate Limiting), HTTP-заголовки безопасности (Helmet) и подробное логирование (Morgan).

4. **База данных (Supabase / PostgreSQL)**
   - Находится в облаке. Схема базы данных (`schema.sql`) использует Row Level Security (RLS) для защиты данных пользователей.

---

## 🚀 Быстрый старт (Локальная разработка)

### 1. Настройка Базы Данных (Supabase)
Вам понадобятся ключи от вашего проекта Supabase.
1. Выполните скрипт `schema.sql` в SQL Editor вашей панели Supabase.
2. Создайте файл `web/.env` и добавьте ключи:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Создайте файл `backend/.env` и добавьте те же ключи:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   PORT=3000
   ```

### 2. Запуск API Gateway (Бэкенд)
```bash
cd backend
npm install
npm run dev
```
Сервер запустится на `http://localhost:3000`. Проверьте статус: `http://localhost:3000/health`.

### 3. Запуск Web Frontend (Веб-версия)
```bash
cd web
npm install
npm run dev
```
Приложение будет доступно по адресу `http://localhost:5173`.

### 4. Запуск Android
1. Откройте папку `android` в Android Studio.
2. Скачайте файл `google-services.json` из вашей консоли Firebase и положите его в `android/app/`.
3. Нажмите **Run** (Shift+F10) для запуска на эмуляторе или реальном устройстве.

---

## 🛠 CI/CD (Jenkins)

Проект настроен на автоматический деплой с помощью **Jenkins** (файл `Jenkinsfile`). 

Пайплайн делает следующее:
1. Клонирует репозиторий.
2. Параллельно собирает Docker-образы для `Web` и `API Gateway`.
3. Отправляет образы в локальный Docker-реестр (`192.168.0.222:5050`).
4. Автоматически разворачивает стек на сервере `.230` через `docker compose`.
5. Тестирует `/health` роут бэкенда.
6. Опционально (при изменении Android-кода) собирает релизный `.apk` файл, подписывает его ключами из кэша и выкладывает готовую ссылку на скачивание.

## 📄 Лицензия
Private / Proprietary. Разработано для Cyprus Orienteering Cup.
