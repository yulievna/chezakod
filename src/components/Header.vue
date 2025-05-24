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
          <img class="logo" src="../assets/images/logo.svg" alt="Logo" />
        </router-link>

        <!-- Меню -->
        <ul class="navigation-list" :class="{ active: isMenuOpen }">
          <li class="navigation-item dropdown">
            <router-link to="#">Развлечения</router-link>
            <ul class="dropdown-menu">
              <li><router-link to="/quests">Квесты</router-link></li>
              <li><router-link to="/action-games">Экшн игры</router-link></li>
              <li><a href="https://kartingchego.ru/">Картинг</a></li>
              <li><a href="https://party-kod.ru/">Караоке</a></li>
              <li><router-link to="/show-programs">Шоу программы</router-link></li>
            </ul>
          </li>
          <li class="navigation-item dropdown">
            <router-link to="/events">Мероприятия</router-link>
          </li>
          <li class="navigation-item"><router-link to="/timetable">Расписание</router-link></li>
          <li class="navigation-item"><router-link to="/sert">Сертификаты</router-link></li>
          <li class="navigation-item"><router-link to="/action">Акции</router-link></li>
          <li class="navigation-item"><router-link to="/about">О нас</router-link></li>

          <!-- Контакты (в мобильной версии) -->
          <li class="navigation-item mobile-only"><a href="tel:+79998887766">+7 (999) 888-77-66</a></li>
          <li class="navigation-item mobile-only"><router-link to="#">WhatsApp</router-link></li>
          <li class="navigation-item mobile-only"><router-link to="#">Telegram</router-link></li>
          <li class="navigation-item mobile-only"><router-link to="https://vk.com/chezakod">ВКонтакте</router-link></li>
        </ul>

        <!-- Кнопки -->
        <div class="header-buttons">
          <button class="book-btn" @click="togglePopup">
            <span class="btn-content">Забронировать</span>
            <span class="btn-hover-effect"></span>
          </button>
          <div class="contacts-btn-wrapper">
            <button class="contacts-btn">
              <span class="btn-content">Контакты</span>
              <span class="btn-hover-effect"></span>
            </button>
            <ul class="contacts-dropdown">
              <li><a href="tel:+79998887766" class="contact-link">+7 (999) 888-77-66</a></li>
              <li><router-link to="#" class="contact-link">WhatsApp</router-link></li>
              <li><router-link to="#" class="contact-link">Telegram</router-link></li>
              <li><router-link to="https://vk.com/chezakod" class="contact-link">ВКонтакте</router-link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <!-- Попап -->
  <div v-if="isPopupOpen" class="popup-overlay" @click.self="togglePopup">
    <Form></Form>
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
  top: -1px;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  transition: all 0.3s ease;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  flex: 0 0 200px;
}

.logo {
  width: 200px;
  height: auto;
  object-fit: contain;
}

.navigation-list {
  display: flex;
  justify-content: center;
  gap: 20px;
  list-style-type: none;
  margin: 0;
  padding: 0;
  flex: 1;
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
  position: relative;
  transition: color 0.3s ease;
}

.graduate a {
  color: #cf1034;
}

.header-buttons {
  display: flex;
  gap: 10px;
  border-radius: 5px;
  padding: 3px;
  flex: 0 0 auto;
}

.book-btn,
.contacts-btn {
  font-size: 16px;
  color: #fff;
  border: none;
  padding: 7px 20px;
  background-color: #000;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.book-btn::before,
.contacts-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
  );
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.book-btn:hover::before,
.contacts-btn:hover::before {
  left: 100%;
}

.book-btn:hover,
.contacts-btn:hover {
  /* transform: translateY(-2px); */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.contacts-btn {
  background-color: #cf1034;
}

.contacts-btn::before {
  background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.6),
      transparent
  );
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
  animation: fadeIn 0.3s ease;
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
  animation: slideIn 0.3s ease;
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
  transition: all 0.3s ease;
}

.burger span {
  width: 25px;
  height: 3px;
  background-color: #000;
  transition: all 0.3s ease;
}

.burger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.burger.active span:nth-child(2) {
  opacity: 0;
}

.burger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}


.mobile-only {
  display: none;
}

@media (max-width: 768px) {
  .mobile-only {
    display: block;
  }

  .navigation {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .logo-wrapper {
    width: 200px;
    flex: 0 0 auto;
  }

  .book-btn {
    width: 100%;
    width: 250px;
    font-size: 16px;
    padding: 10px 20px;
  }
  .contacts-btn{
    display: none;
  }

  .burger {
    display: flex;
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 100;
  }

  .navigation-list {
    display: none;
    flex-direction: column;
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    height: calc(100vh - 70px);
    padding: 20px;
    z-index: 1;
    overflow-y: auto;
    background: #fff;
    transform: translateX(-50%);
    transition: transform 0.3s ease;

  }

  .navigation-list.active {
    display: flex;
    transform: translateX(0);
  }

  .dropdown-menu,
  .contacts-dropdown {
    position: static;
    box-shadow: none;
    margin-top: 10px;
    opacity: 1;
    visibility: visible;
    transform: none;
    
  }
  .dropdown-menu a{
    background: #cf1034;
  color: white;
  border-radius: 5px;
  }

  .contacts-btn-wrapper:hover .contacts-dropdown {
    display: none;
  }
}
</style>