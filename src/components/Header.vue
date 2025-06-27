<template>
  <header class="header">
    <div class="container header-container">
      <nav class="navigation">

        <!-- Логотип -->
        <router-link to="/" class="logo-wrapper">
          <img class="logo" src="@/assets/images/logo.svg" alt="Logo" />
        </router-link>

        <!-- Бургер-меню -->
        <div class="burger" @click="toggleMenu">
          <span class="burger-line top"></span>
          <span class="burger-line middle"></span>
          <span class="burger-line bottom"></span>
        </div>

        <!-- Основное меню (десктоп) -->
        <ul class="navigation-list desktop-only">
          <li class="navigation-item dropdown">
            <router-link to="#">Развлечения</router-link>
            <ul class="dropdown-menu">
              <li><router-link to="/quests">Квесты</router-link></li>
              <li><router-link to="/action-games">Экшн игры</router-link></li>
              <li><a href="https://kartingchego.ru/">Картинг</a></li>
              <li><a href="https://party-kod.ru/">Караоке</a></li>
              <li>
                <router-link to="/show-programs">Шоу-программы</router-link>
              </li>
            </ul>
          </li>
          <li class="navigation-item"><router-link to="/events">Мероприятия</router-link></li>
          <li class="navigation-item"><router-link to="/timetable">Расписание</router-link></li>
          <li class="navigation-item"><router-link to="/sert">Сертификаты</router-link></li>
          <li class="navigation-item"><router-link to="/action">Акции</router-link></li>
          <li class="navigation-item"><router-link to="/about">О нас</router-link></li>
        </ul>

        <!-- Кнопки десктоп -->
        <div class="header-buttons desktop-only">
          <button class="book-btn" @click="togglePopup">Забронировать</button>
          <div class="navigation-item dropdown">
            <button class="contacts-btn">Контакты</button>
            <ul class="dropdown-menu">
              <li><a href="tel:+79998887766">+7 (999) 888-77-66</a></li>
              <li><a href="#">WhatsApp</a></li>
              <li><a href="#">Telegram</a></li>
              <li><a href="https://vk.com/chezakod">ВКонтакте</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

    <!-- Мобильное меню -->
    <transition name="mobile-menu">
      <div class="mobile-menu" v-if="isMenuOpen">
        <ul class="mobile-menu-list">
          <li class="navigation-item mobile-only">
            <button class="book-btn mobile-btn" @click="togglePopup">
              Забронировать
            </button>
          </li>
          <li class="mobile-menu-item sub-nav">
            <div class="nav-section-title">Развлечения</div>
            <ul>
              <li><router-link to="/quests">Квесты</router-link></li>
              <li><router-link to="/action-games">Экшн игры</router-link></li>
              <li><a href="https://kartingchego.ru/">Картинг</a></li>
              <li><a href="https://party-kod.ru/">Караоке</a></li>
              <li><router-link to="/show-programs">Шоу программы</router-link></li>
            </ul>
          </li>
          <li class="mobile-menu-item"><router-link to="/events">Мероприятия</router-link></li>
          <li class="mobile-menu-item"><router-link to="/timetable">Расписание</router-link></li>
          <li class="mobile-menu-item"><router-link to="/sert">Сертификаты</router-link></li>
          <li class="mobile-menu-item"><router-link to="/action">Акции</router-link></li>
          <li class="mobile-menu-item"><router-link to="/about">О нас</router-link></li>

          <li class="mobile-menu-item sub-nav">
            <div class="nav-section-title">Контакты</div>
            <ul>
              <li><a href="tel:+79998887766">+7 (999) 888-77-66</a></li>
              <li><a href="#">WhatsApp</a></li>
              <li><a href="#">Telegram</a></li>
              <li><a href="https://vk.com/chezakod">ВКонтакте</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </transition>

    <!-- Попап -->
    <div v-if="isPopupOpen" class="popup-overlay" @click.self="togglePopup">
      <Form />
    </div>
  </header>
</template>

<script setup>
import {ref} from "vue";
import Form from "@/components/Form.vue";
import contacts from "@/contacts.js";

const isPopupOpen = ref(false);
const isMenuOpen = ref(false);

const togglePopup = () => {
  isPopupOpen.value = !isPopupOpen.value;
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  const burger = document.querySelector('.burger')
      if (burger) burger.classList.toggle('active');
      if (isMenuOpen.value) document.body.classList.add('menu-open');
      else document.body.classList.remove('menu-open');
};
</script>


<style scoped>
/* Общие стили */
.header {
  background-color: #fff;
  padding: 26px 0;
  position: sticky;
  top: -1px;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-wrapper .logo {
  width: 240px;
  height: auto;
}

.navigation-list {
  display: flex;
  gap: 14px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navigation-item {
  position: relative;
}

.navigation-item a {
  text-decoration: none;
  color: #000;
  font-size: 16px;
}


.navigation-item .dropdown-menu li {
  padding: 6px 20px;
}

.navigation-item .dropdown-menu li a {
  display: block;
  width: 100%;
  color: #000;
  font-size: 15px;
  text-decoration: none;
  transition: background 0.2s;
  border-radius: 8px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  list-style: none;
  margin: 0;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 10;
  opacity: 1;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  display: none;
  padding: 12px 0;
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
.navigation-item.dropdown:hover .dropdown-menu {
  display: block;
}


.dropdown-menu li a {
  padding: 5px 10px;
  display: block;
  color: #000;
}

.dropdown-menu li a:hover {
  background-color: #cf1034;
  color: #fff;
  border-radius: 8px;
}

.header-buttons {
  display: flex;
  gap: 10px;
}

.book-btn,
.contacts-btn {
  padding: 7px 16px;
  background: #000;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.contacts-btn {
  background: #cf1034;
}

.contacts-btn-wrapper {
  position: relative;
}

.contacts-btn-wrapper:hover .contacts-dropdown {
  display: block;
}

/* Мобильное */
.mobile-btn {
  display: block;
  margin: 0 auto 20px;
  width: 90%;
  font-size: 16px;
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.mobile-btn:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.burger {
  display: none;
  width: 24px;
  height: 24px;
  position: relative;
  cursor: pointer;
  z-index: 1001;
  transition: all 0.3s ease;
}
.burger-line {
  display: block;
  width: 100%;
  height: 3px;
  background: #000;
  position: relative;
  transition: all 0.3s ease;
  transform-origin: center;
}

.burger.active .top {
  transform: translateY(8px) rotate(45deg);
}

.burger.active .bottom {
  transform: translateY(-8px) rotate(-45deg);
}

.burger.active .middle {
  opacity: 0;
  transform: scale(0) translateY(-50%);
}

.mobile-menu {
  position: fixed;
  top: 80px;
  left: 0;
  height: calc(100vh - 80px);
  width: 100%;
  background: #fff;
  z-index: 99;
  padding: 0 20px;
  box-shadow: 0 8px 10px rgba(0,0,0,0.1);
  overflow-y: auto;
}

.mobile-menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  transform: translateX(500px);
  opacity: 1;
}

.mobile-menu-item {
  opacity: 1;
  transform: translateX(10px);
  transition: all 0.3s ease;
}

.mobile-menu-enter-active .mobile-menu-item,
.mobile-menu-leave-active .mobile-menu-item {
  opacity: 0;
  transform: translateX(100px);
}

.mobile-menu-item a {
  font-size: 16px;
  color: #000;
  text-decoration: none;
  display: block;
  padding: 8px 0;
}
.sub-nav ul{
  margin: 0 30px;
}

.nav-section-title {
  font-size: 13px;
  font-weight: bold;
  color: #999;
  margin: 10px 0;
  text-transform: uppercase;
}

/* Попап */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 1072px) {
  .header-buttons{
    flex-direction: column;
    align-items: center;
  }
  .navigation-item a{
    font-size: 13px;
  }
  .logo-wrapper{
    width: 150px;
  }
}
@media (max-width: 768px) {
  .header-container{
    padding: 0 15px;
  }
  .desktop-only {
    display: none;
  }

  .burger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
  }

  .logo-wrapper .logo {
    width: 200px;
  }
}
@media (min-width: 768px) {
  .mobile-menu{
    display: none;
  }
}
</style>