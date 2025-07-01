<template>
  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-content">
        <!-- Логотип -->
        <router-link to="/" class="logo-wrapper">
          <img class="logo" src="../assets/images/logo-white.svg" alt="Logo"/>
        </router-link>

        <!-- Меню -->
        <ul class="footer-menu">
          <li class="footer-item">
            <router-link to="/quests">Квесты</router-link>
          </li>
          <li class="footer-item">
            <router-link to="/action-games">Экшн-игры</router-link>
          </li>
          <li><a class="footer-item" href="https://kartingchego.ru/">Картинг</a></li>
          <li><a class="footer-item" href="https://party-kod.ru/">Караоке</a></li>
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
          <div class="contacts-info">
            <template v-for="(contact, key, index) in contacts" :key="index">
              <template v-if="!contact.hide">
                <a :href="`tel:${contact.value}`" v-if="contact.type === 'phone'"
                   class="contact-phone">{{ contact.text ? contact.text : contact.value }}</a>
                <a :href="`mailto:${contact.value}`"
                   v-else-if="contact.type === 'email'"
                   class="social-link">{{ contact.text ? contact.text : contact.value }}</a>
                <a :href="contact.value" v-else class="social-link">{{
                    contact.text ? contact.text : contact.value
                  }}</a>
              </template>
            </template>
          </div>
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
  padding: 40px 0;
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
  flex-direction: column;
  gap: 20px;
}

.contacts-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 150px;
  text-align: right;
}

.contact-phone {
  font-size: 16px;
  color: #fff;
  text-decoration: none;
}

.contact-phone:hover {
  color: #cf1034;
}

.social-links {
  display: flex;
  gap: 10px;
}

.social-link {
  font-size: 14px;
  color: #fff;
  text-decoration: none;
}

.social-link:hover {
  color: #cf1034;
}

.book-btn {
  font-size: 16px;
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
  font-size: 14px;
  color: #ccc;
}


/* Адаптивность */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .footer-menu {
    justify-content: center;
  }

  .contacts-info {
    align-items: center;
  }
}
</style>