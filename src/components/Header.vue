<template>
  <header class="header">
    <div class="container header-container">
      <nav class="navigation">
        <router-link to="/" class="logo-wrapper">
          <img class="logo" src="@/assets/images/logo.svg" alt="Logo"/>
        </router-link>
        <!-- Логотип -->
        <div class="header-main__mobile">
          <router-link to="/" class="logo-wrapper-mobile">
            <img class="logo" src="@/assets/images/logo.svg" alt="Logo"/>
          </router-link>
          <div class="navigation-item dropdown dropdown-mobile">
            <button class="contacts-btn">Контакты</button>
            <ul class="dropdown-menu">
              <template v-for="(contact, key, index) in contacts" :key="index">
                <template v-if="!contact.hide">
                  <li v-if="contact.type === 'phone'"><a
                      :href="`tel:${contact.value}`">{{ contact.text ? contact.text : contact.value }}</a></li>
                  <li v-else-if="contact.type === 'email'"><a
                      :href="`mailto:${contact.value}`">{{ contact.text ? contact.text : contact.value }}</a></li>
                  <li v-else><a :href="contact.value">{{
                      contact.text ? contact.text : contact.value
                    }}</a></li>
                </template>
              </template>
            </ul>
          </div>
        </div>
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
              <li>
                <router-link to="/quests">Квесты</router-link>
              </li>
              <li>
                <router-link to="/action-games">Экшн-игры</router-link>
              </li>
              <li><a href="https://kartingchego.ru/" target="_blank">Картинг</a></li>
              <li><a href="https://party-kod.ru/" target="_blank">Караоке</a></li>
              <li>
                <router-link to="/show-programs">Шоу-программы</router-link>
              </li>
            </ul>
          </li>
          <li class="navigation-item">
            <router-link to="/events">Мероприятия</router-link>
          </li>
          <li class="navigation-item">
            <router-link to="/timetable">Расписание</router-link>
          </li>
          <li class="navigation-item">
            <router-link to="/sert">Сертификаты</router-link>
          </li>
          <li class="navigation-item">
            <router-link to="/action">Акции</router-link>
          </li>
          <li class="navigation-item">
            <router-link to="/about">О нас</router-link>
          </li>
        </ul>

        <!-- Кнопки десктоп -->
        <div class="header-buttons desktop-only">
          <button class="book-btn" @click="togglePopup">Забронировать</button>
          <div class="navigation-item dropdown">
            <button class="contacts-btn">Контакты</button>
            <ul class="dropdown-menu">
              <template v-for="(contact, key, index) in contacts" :key="index">
                <template v-if="!contact.hide">
                  <li v-if="contact.type === 'phone'"><a
                      :href="`tel:${contact.value}`">{{ contact.text ? contact.text : contact.value }}</a></li>
                  <li v-else-if="contact.type === 'email'"><a
                      :href="`mailto:${contact.value}`">{{ contact.text ? contact.text : contact.value }}</a></li>
                  <li v-else><a :href="contact.value">{{
                      contact.text ? contact.text : contact.value
                    }}</a></li>
                </template>
              </template>
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
              <li>
                <router-link to="/quests">Квесты</router-link>
              </li>
              <li>
                <router-link to="/action-games">Экшн-игры</router-link>
              </li>
              <li><a href="https://kartingchego.ru/">Картинг</a></li>
              <li><a href="https://party-kod.ru/">Караоке</a></li>
              <li>
                <router-link to="/show-programs">Шоу-программы</router-link>
              </li>
            </ul>
          </li>
          <li class="mobile-menu-item">
            <router-link to="/events">Мероприятия</router-link>
          </li>
          <li class="mobile-menu-item">
            <router-link to="/timetable">Расписание</router-link>
          </li>
          <li class="mobile-menu-item">
            <router-link to="/sert">Сертификаты</router-link>
          </li>
          <li class="mobile-menu-item">
            <router-link to="/action">Акции</router-link>
          </li>
          <li class="mobile-menu-item">
            <router-link to="/about">О нас</router-link>
          </li>

          <li class="mobile-menu-item sub-nav">
            <div class="nav-section-title">Контакты</div>
            <ul>
              <template v-for="(contact, key, index) in contacts" :key="index">
                <template v-if="!contact.hide">
                  <li v-if="contact.type === 'phone'"><a
                      :href="`tel:${contact.value}`">{{ contact.text ? contact.text : contact.value }}</a></li>
                  <li v-else-if="contact.type === 'email'"><a
                      :href="`mailto:${contact.value}`">{{ contact.text ? contact.text : contact.value }}</a></li>
                  <li v-else><a :href="contact.value">{{
                      contact.text ? contact.text : contact.value
                    }}</a></li>
                </template>
              </template>
            </ul>
          </li>
        </ul>
      </div>
    </transition>

    <!-- Попап -->
    <div v-if="isPopupOpen" class="popup-overlay" @click.self="togglePopup">
      <Form @close="togglePopup" :isPopup="true"/>
    </div>
  </header>
</template>

<script setup>
import {defineAsyncComponent, ref} from "vue";
import contacts from "@/contacts.js";

const scrollPosition = ref(0);
const isPopupOpen = ref(false);
const isMenuOpen = ref(false);

const Form = defineAsyncComponent(() => import("@/components/Form.vue"));

const togglePopup = () => {
  isPopupOpen.value = !isPopupOpen.value;
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  const burger = document.querySelector('.burger')
  if (burger) burger.classList.toggle('active');
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
    console.log(isMenuOpen.value);
  } else {
    document.body.style.overflow = '';
    console.log(isMenuOpen.value);

  }
};
</script>


<style scoped>
.header {
  background-color: #fff;
  padding: 15px 0;
  position: sticky;
  top: 0;
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
  gap: 20px;
}

.header-main__mobile {
  display: none;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.logo-wrapper {
  display: block;
  height: 62px;
}

.logo-wrapper .logo {
  width: 240px;
  height: auto;
}

.logo-wrapper-mobile {
  display: none;
  width: 300px;
}

@media (max-width: 350px) {
  .logo-wrapper-mobile {
    width: 55%;
  }
}

@media (max-width: 500px) {
  .logo-wrapper-mobile {
    width: 60%;
  }
}

@media (min-width: 500px) {
  .logo-wrapper-mobile {
    height: 75px;
  }
}

.logo-wrapper-mobile .logo {
  width: 100%;
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
  font-size: 18px;
}

.navigation-item .dropdown-menu li {
  padding: 6px 20px;
}

.navigation-item .dropdown-menu li a {
  display: block;
  min-width: 175px;
  color: #000;
  font-size: 16px;
  text-decoration: none;
  transition: background 0.2s;
  border-radius: 8px;
  padding: 5px 8px;
  align-self: center;
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
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  padding: 12px 0;
  display: block;
  pointer-events: none;
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  pointer-events: auto;
}

.dropdown-menu li a:hover {
  background-color: #cf1034;
  color: #fff;
}

.dropdown-mobile {
  display: none;
}

.dropdown-mobile button {
  color: white;
  background: black;
  font-size: 16px;
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.dropdown-mobile .dropdown-menu {
  left: -100px;
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
  font-size: 18px;
  transition: background 0.3s ease;
}

.book-btn:hover {
  background: #333;
}

.contacts-btn {
  background: #cf1034;
}

.contacts-btn:hover {
  background: #a80e2b;
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
  transition: box-shadow 0.3s ease;
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
  z-index: 100;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  transition: all 0.3s ease;
}

.burger-line {
  display: block;
  width: 100%;
  height: 3px;
  background: #000;
  border-radius: 2px;
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
  height: 100vh;
  width: 100%;
  background: #fff;
  z-index: 99;
  padding: 20px;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  box-sizing: border-box;
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
  transform: translateX(800px);
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

.sub-nav ul {
  margin: 0 30px;
}

.nav-section-title {
  font-size: 13px;
  font-weight: bold;
  color: #999;
  margin: 10px 0;
  text-transform: uppercase;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 1240px) {
  .container {
    padding: 0 30px;
  }

  .navigation-item a {
    font-size: 1.1rem;
  }

  .header-buttons {
    display: flex;
    flex-direction: column;
    align-items: end;
    height: 95px;
  }

}

@media (max-width: 1084px) {
  .header-container {
    padding: 0 15px;
  }

  .header-buttons {
    flex-direction: column;
    align-items: center;
  }

  .logo-wrapper {
    display: none;
  }

  .logo-wrapper-mobile {
    display: block;
  }
  .dropdown-menu{
    right: 0;
  }
  .dropdown-mobile {
    display: block;
  }

  .desktop-only {
    display: none;
  }

  .header-main__mobile {
    display: flex;
    justify-content: space-between;
  }

  .burger {
    display: flex;
  }
}

@media (min-width: 1084px) {
  .mobile-menu {
    display: none;
  }

  .contacts-btn, .book-btn {
    text-align: center;
  }

}

@media (max-width: 1240px) and (min-width: 1084px) {
  .contacts-btn, .book-btn {
    width: 170px;
  }

}
</style>