import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to Cyprus Orienteering Cup",
      "register": "Register Now",
      "login": "Login",
      "home": "Home",
      "dashboard": "Dashboard",
      "subtitle": "Join the most exciting orienteering events in the heart of the Mediterranean.",
      "email": "Email",
      "password": "Password",
      "sign_in": "Sign In",
      "sign_in_google": "Sign In with Google",
      "admin_panel": "Admin Panel",
      "events": "Events"
    }
  },
  ru: {
    translation: {
      "welcome": "Добро пожаловать на Кубок Кипра по ориентированию",
      "register": "Зарегистрироваться",
      "login": "Войти",
      "home": "Главная",
      "dashboard": "Панель управления",
      "subtitle": "Присоединяйтесь к самым захватывающим соревнованиям по спортивному ориентированию в сердце Средиземноморья.",
      "email": "Email",
      "password": "Пароль",
      "sign_in": "Войти",
      "sign_in_google": "Войти через Google",
      "admin_panel": "Панель администратора",
      "events": "Соревнования"
    }
  },
  el: {
    translation: {
      "welcome": "Καλώς ήρθατε στο Κύπελλο Προσανατολισμού Κύπρου",
      "register": "Εγγραφείτε τώρα",
      "login": "Σύνδεση",
      "home": "Αρχική",
      "dashboard": "Ταμπλό",
      "subtitle": "Λάβετε μέρος στις πιο συναρπαστικές εκδηλώσεις προσανατολισμού στην καρδιά της Μεσογείου.",
      "email": "Email",
      "password": "Κωδικός",
      "sign_in": "Σύνδεση",
      "sign_in_google": "Σύνδεση με Google",
      "admin_panel": "Πίνακας διαχειριστή",
      "events": "Εκδηλώσεις"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ru", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
