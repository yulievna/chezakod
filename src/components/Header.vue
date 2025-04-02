<template>
  <header class="header">
    <div class="container header-container">
      <nav class="navigation">
        <!-- Бургер-меню -->
        <div class="burger" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <!-- Логотип -->
        <router-link to="/" class="logo-wrapper">
          <img class="logo" src="../assets/logo.png" alt="Logo" />
        </router-link>



        <!-- Меню -->
        <ul class="navigation-list" :class="{ active: isMenuOpen }">
          <li class="navigation-item dropdown">
            <router-link to="#">Развлечения</router-link>
            <ul class="dropdown-menu">
              <li><router-link to="/quests">Квесты</router-link></li>
              <li><router-link to="/#">Экшн игры</router-link></li>
              <li><router-link to="/#">Картинг</router-link></li>
              <li><router-link to="/#">Караоке</router-link></li>
              <li><router-link to="/#">Шоу программы</router-link></li>
            </ul>
          </li>
          <li class="navigation-item dropdown">
            <router-link to="#">Мероприятия</router-link>
            <ul class="dropdown-menu">
              <li><router-link to="/#">Дни рождения</router-link></li>
              <li><router-link to="/#">Корпоративы</router-link></li>
              <li class="graduate"><router-link to="/#">Выпускной 2025</router-link></li>
            </ul>
          </li>
          <li class="navigation-item graduate"><router-link to="#">Выпускной 2025</router-link></li>
          <li class="navigation-item"><router-link to="#">Расписание</router-link></li>
          <li class="navigation-item"><router-link to="#">Сертификаты</router-link></li>
          <li class="navigation-item"><router-link to="#">Акции</router-link></li>
          <li class="navigation-item"><router-link to="#">О нас</router-link></li>
        </ul>
        <!-- Кнопки -->
        <div class="header-buttons">
          <button class="book-btn" @click="togglePopup">Забронировать</button>
          <div class="contacts-btn-wrapper">
            <button class="contacts-btn">Контакты</button>
            <ul class="contacts-dropdown">
              <li><a href="tel:+79998887766">+7 (999) 888-77-66</a></li>
              <li><router-link to="#">WhatsApp</router-link></li>
              <li><router-link to="#">Telegram</router-link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <!-- Попап -->
  <div v-if="isPopupOpen" class="popup-overlay" @click.self="togglePopup">
    <div class="popup">
      <button class="popup-close" @click="togglePopup">&times;</button>
      <Form></Form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Form from "@/components/Form.vue";

const isPopupOpen = ref(false);
const isMenuOpen = ref(false);

const togglePopup = () => {
  isPopupOpen.value = !isPopupOpen.value;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>
<style scoped>
.header {
  background-color: #ffffff;
  padding: 26px 0;
  position: sticky;
  top: 0px;
  z-index: 10;
}
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 60px;
}

.logo-wrapper {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
}

.navigation-list {
  display: flex;
  gap: 20px;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.navigation-item {
  position: relative;
}

.navigation-item a {
  text-decoration: none;
  font-size: 16px;
  color: #000;
  padding: 0 0.1em;
  white-space: nowrap;
}

.graduate a {
  color: #cf1034;
}

.header-buttons {
  display: flex;
  gap: 10px;
  background-color: #000;
  border-radius: 5px;
  padding: 3px;
}

.book-btn,
.contacts-btn {
  font-size: 16px;
  color: #fff;
  border: none;
  padding: 7px 25px;
  background-color: #000;
  border-radius: 5px;
  cursor: pointer;
}

.contacts-btn {
  background-color: #cf1034;
}

.contacts-btn-wrapper {
  position: relative;
}

.contacts-dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  list-style-type: none;
  padding: 10px;
  margin: 0;
  width: 180px;
  border-radius: 5px;
}

.contacts-btn-wrapper:hover .contacts-dropdown {
  display: block;
}

.contacts-dropdown li {
  padding: 8px 0;
}

.contacts-dropdown li a {
  text-decoration: none;
  color: #000;
  display: block;
  padding: 5px 10px;
}

.contacts-dropdown li a:hover {
  background-color: #cf1034;
  color: white;
  border-radius: 5px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  list-style: none;
  padding: 10px;
  margin: 0;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-menu li {
  margin: 5px 0;
}

.dropdown-menu a {
  color: #333;
  padding: 5px 10px;
  display: block;
  white-space: nowrap;
}

.dropdown-menu a:hover {
  background: #cf1034;
  color: white;
  border-radius: 5px;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  height: 60%;
  position: relative;
}

.popup-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #cf1034;
}

/* Бургер-меню */
.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

.burger span {
  width: 25px;
  height: 3px;
  background-color: #000;
}

/* Адаптивность */
@media (max-width: 450px) {
  .header {
    padding: 16px 0;
  }
  .navigation {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .logo-wrapper {
    width: 100%;
    margin: 0 25%;
  }

  .header-buttons {
    align-self: center;
    width: 100%;
    gap: 50px;
    padding-left: 48px;
  }

  .burger {
    display: flex;
    position: absolute;
    top: 35px;
  }

  .navigation-list {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    padding: 20px;
    z-index: 10;
  }

  .navigation-list.active {
    display: flex;
  }
}
</style>