<template>
  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-content">
        <!-- Логотип -->
        <router-link to="/" class="logo-wrapper">
          <img class="logo" src="../assets/images/logo-white.svg" alt="Logo" loading="lazy"/>
        </router-link>

        <!-- Меню -->
        <ul class="footer-menu">
          <li class="footer-item">
            <router-link to="/quests">Квесты</router-link>
          </li>
          <li class="footer-item">
            <router-link to="/action-games">Экшн-игры</router-link>
          </li>
          <li><a class="footer-item" href="https://kartingchego.ru/" target="_blank">Картинг</a></li>
          <li><a class="footer-item" href="https://party-kod.ru/" target="_blank">Караоке</a></li>
          <li class="footer-item">
            <router-link to="/show-programs">Шоу-программы</router-link>
          </li>
        <li class="footer-item">
          <router-link to="/events">Мероприятия</router-link>
        </li>
        <li class="footer-item">
          <router-link to="/timetable">Расписание</router-link>
        </li>
        <li class="footer-item">
          <router-link to="/sert">Сертификаты</router-link>
        </li>
        <li class="footer-item">
          <router-link to="/action">Акции</router-link>
        </li>
        <li class="footer-item">
          <router-link to="/about">О нас</router-link>
        </li>
        </ul>

        <!-- Контакты -->
        <div class="footer-contacts">
            <template v-for="(contact, key, index) in contacts" :key="index">
              <template v-if="!contact.hide">
                <a :href="`tel:${contact.value}`" v-if="contact.type === 'phone'"
                   class="contact-phone">{{ contact.text ? contact.text : contact.value }}</a>
                <a :href="`mailto:${contact.value}`"
                   v-else-if="contact.type === 'email'"
                   class="social-link">{{ contact.text ? contact.text : contact.value }}</a>
                <a :href="contact.value" v-else class="social-link">
                  <img :src="contact.path" :alt="contact.text" />
                </a>
              </template>
            </template>
        </div>
      </div>

      <!-- Копирайт -->
      <div class="footer-copyright">
        <p>&copy; 2017-{{ new Date().getFullYear() }} Чеширский код. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {ref} from "vue";
import contacts from "@/contacts.js";

const isPopupOpen = ref(false);

const togglePopup = () => {
  isPopupOpen.value = !isPopupOpen.value;
};
</script>

<style scoped>
.footer {
  background-color: #000;
  color: #fff;
  padding: 40px 10px;
}

.footer-container {
  max-width: fit-content;
  margin: 0 auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-start;
  gap: 40px;
}


.logo {
  width: 200px;
}

.footer-menu {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  list-style-type: none;
  margin: 0;
  padding: 0;
  justify-content: center;
}

.footer-item{
  text-decoration: none;
  color: #fff;
  font-size: 18px;
}

.footer-item a:hover {
  color: #cf1034;
}

.footer-contacts {
  display: flex;
  justify-content: end;
  flex-wrap: wrap;
  gap: 10px;
  min-width: 160px;
  width: 160px;
}

.contact-phone {
  flex: 1 0 100%;
  margin-bottom: 10px;
  order: 1;
}

.social-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  order: 2;
}

.social-link img {
  background-color: white;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  padding: 5px;
}

.social-link:hover {
  color: #cf1034;
}

.book-btn {
  font-size: 18px;
  color: #fff;
  background-color: #cf1034;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.book-btn:hover {
  background-color: #a00d2a;
}

.footer-copyright {
  text-align: center;
  margin-top: 40px;
  color: #ccc;
}


/* Адаптивность */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .footer-contacts{
    width: 220px;
  }
  .social-link img {
    width: 60px;
    height: 60px;
    padding: 10px;
  }
  .footer-menu {
    justify-content: center;
  }
  .contact-phone{
    font-size: 24px;
  }
  .contacts-info {
    align-items: center;
  }
}
</style>