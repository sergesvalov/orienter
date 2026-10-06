# 📱 Android Client

Нативное Android-приложение для платформы Cyprus Orienteering Cup.
Разработано с акцентом на **Offline-First** взаимодействие и максимальную производительность в полевых условиях (в лесу или горах).

## Стек технологий
- **Язык**: Kotlin
- **UI Фреймворк**: Jetpack Compose (MVVM Архитектура)
- **Сетевой слой**: Retrofit2 + OkHttp (Взаимодействие с нашим API Gateway)
- **База данных**: Room (Локальное кэширование)
- **Уведомления**: Firebase Cloud Messaging (FCM)

## Структура проекта
- `api/` — Интерфейсы Retrofit для получения списка соревнований (`/events`) и регистрации.
- `data/` — Сущности Room (БД) и Data Access Objects (DAO).
- `ui/` — Слой интерфейса:
  - `components/` — Переиспользуемые элементы (например, карточка `EventCard`).
  - `screens/` — Основные экраны (например, `EventListScreen`).
  - `theme/` — Фирменные цвета (CyprusCupTheme) и шрифты.
- `services/` — Обработчики пуш-уведомлений.

## Запуск для разработчиков
1. Откройте папку `android/` в **Android Studio**.
2. Вложите ваш файл `google-services.json` (от Firebase) в папку `app/`.
3. Убедитесь, что ваш эмулятор или устройство находится в одной сети с локальным сервером бэкенда (или поменяйте IP в `api/ApiService.kt`).
4. Нажмите `Run` (Shift + F10) или воспользуйтесь Gradle Wrapper.
