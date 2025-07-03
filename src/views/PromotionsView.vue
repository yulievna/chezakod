<template>
  <Header></Header>
  <nav class="promotions__nav">
    <ul class="promotions__nav-list">
      <li v-for="action in actions" :key="`action-nav-${action.id}`">
        <a :href="`#action-${action.id}`">{{ action.name }}</a>
      </li>
    </ul>
  </nav>
  <div class="promotions">
    <div class="promotions__container">
      <div class="promotion-card"
           :id="`action-${action.id}`"
           v-for="action in actions"
           :key="action.id"
      >
        <div class="promotion-card__image">
          <img :src="action.image" :alt="action.name" class="promotion-card__img" loading="lazy">
        </div>
        <div class="promotion-card__content">
          <div class="promotion-card__header">
            <h2 class="promotion-card__title">{{ action.name }}</h2>
            <div class="promotion-card__price" v-if="action.price">{{ action.price }}</div>
          </div>
          <p class="promotion-card__description" v-html="action.text">
          </p>
          <div class="promotion-card__details">
            <div class="promotion-card__promo" v-if="action.promocode">
              <span class="promo-label">Промокод</span>
              <span class="promo-code">"{{ action.promocode }}"</span>
            </div>
            <div class="promotion-card__conditions-wrapper" v-if="action.list.elements.length > 0">
              <h3 class="promotion-card__subtitle">{{ action.list.title ? action.list.title : 'Условия' }}:</h3>
              <ul class="promotion-card__conditions">
                <li v-for="(element, index) in action.list.elements" :key="index">{{ element }}</li>
              </ul>
            </div>
            <p class="promotion-card__note" v-if="action.limit">
              {{ action.limit }}
            </p>
            <div class="promotion-card__contact" v-if="action.button">
              <a :href="action.button.link.url" class="contact-button" v-if="action.button.link.is_out"
                 :style="{ background: action.button.color}">
                <span class="contact-button__text">{{ action.button.main || 'Забронировать' }}</span>
                <span class="contact-button__phone" v-if="action.button.second">{{ action.button.second }}</span>
              </a>
              <router-link :to="action.button.link.url || '/timetable'" v-else
                           :style="{ background: action.button.color}" class="contact-button">
                <span class="contact-button__text">{{ action.button.main || 'Забронировать' }}</span>
                <span class="contact-button__phone" v-if="action.button.second">{{ action.button.second }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="promotions__note">
      <p>Скидки и акции не суммируются. Все сертификаты/купоны/флаера/прочие рекламные и скидочные инструменты
        действуют
        только при бронировании на официальном сайте chezakod.ru или по телефону +7 (391) 269-92-23</p>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
import {defineAsyncComponent, onMounted, onServerPrefetch, ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import {useHead} from "@unhead/vue";
import axios, {HttpStatusCode} from "axios";

useHead({
  title: "Акции"
});

const Footer = defineAsyncComponent(() => import('@/components/Footer.vue'));
const Header = defineAsyncComponent(() => import('@/components/Header.vue'));

const route = useRoute();
let actions = ref([]);

const loadActions = async () => {
  try {
    const resp = await axios.get(import.meta.env.VITE_API_URL + "/action/");
    if (resp.status === HttpStatusCode.Ok && resp.data.status) {
      actions.value = resp.data.result;
    } else {
      throw new Error("Ошибка сервера");
    }
  } catch (err) {
    console.error(`Ошибка при получении акций: ${err}`);
  }
}

const scrollToPromotion = (hash) => {
  if (hash) {
    const element = document.getElementById(hash.slice(1));
    if (element) {
      const headerHeight = 200;
      const y = element.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }
};

onServerPrefetch(loadActions);

onMounted(async () => {
  await loadActions();
  scrollToPromotion(route.hash);

  document.querySelectorAll('.promotions__nav-list a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = 220;
        const y = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({top: y, behavior: 'smooth'});
      }
    });
  });

  // Отслеживание активной секции
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('.promotions__nav-list a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {threshold: 0.5});

  document.querySelectorAll('.promotion-card').forEach(card => {
    observer.observe(card);
  });
});

watch(() => route.hash, (newHash) => {
  scrollToPromotion(newHash);
});
</script>

<style>
.promotion-card__description h3 {
  color: #fff;
  font-size: 1.3rem;
  margin: 25px 0 15px;
  position: relative;
  padding-left: 15px;
}

.promotion-card__description h3::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 20px;
  background: #cf1034;
  border-radius: 3px;
}

.promotion-card__description ul {
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 20px;
}

.promotion-card__description ul li {
  margin-bottom: 12px;
  line-height: 1.5;
  padding-left: 25px;
  position: relative;
}

.promotion-card__description ul li::before {
  content: '•';
  color: #cf1034;
  position: absolute;
  left: 0;
  font-size: 1.5rem;
  line-height: 1;
}

</style>

<style scoped>
.promotions__nav {
  width: 95vw;
  max-width: 1500px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 15px;
  top: 92px;
  position: sticky;
  margin-top: 0;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  z-index: 2;
  border-radius: 0 0 10px 10px;
}

@media (max-width: 1240px) {
  .promotions__nav {
    top: 125px;
  }
}

@media (max-width: 1084px) {
  .promotions__nav {
    top: 105px;
  }
}

.promotions__container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.promotions {
  max-width: 1200px;
  margin: 10px auto 0;
}

.promotions__nav-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.promotions__nav-list li a {
  display: inline-block;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.promotions__nav-list li a:hover,
.promotions__nav-list li a.active {
  background: #cf1034;
  color: #fff;
}

.promotions__hero {
  text-align: center;
  margin-bottom: 40px;
}

.promotions__title {
  font-size: 2.5rem;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.promotion-card {
  background: rgba(0, 0, 0, 0.9);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  scroll-margin-top: 100px; /* Отступ для фиксированного хедера */
}

.promotion-card:hover {
  transform: translateY(-5px);
}

.promotion-card__image {
  width: 100%;
  overflow: hidden;
}

.promotion-card__img {

  object-fit: contain;
  transition: transform 0.3s ease;
}

.promotion-card:hover .promotion-card__img {
  transform: scale(1.05);
}

.promotion-card__content {
  padding: 30px;
}

.promotion-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.promotion-card__title {
  color: #fff;
  margin: 0;
  font-size: 1.8rem;
  flex: 1;
}

.promotion-card__price {
  background: #cf1034;
  color: #fff;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: bold;
}

.promotion-card__description {
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 25px;
  line-height: 1.6;
}

.promotion-card__details {
  color: #fff;
}

.promotion-card__promo {
  background: rgba(207, 16, 52, 0.2);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.promo-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.promo-code {
  font-size: 1.2rem;
  font-weight: bold;
  color: #cf1034;
}

.promotion-card__subtitle {
  color: #fff;
  font-size: 1.3rem;
  margin: 25px 0 15px;
  position: relative;
  padding-left: 15px;
}

.promotion-card__subtitle::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 20px;
  background: #cf1034;
  border-radius: 3px;
}

.promotion-card__conditions,
.promotion-card__features,
.promotion-card__bonus-list,
.promotion-card__restrictions-list {
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 20px;
}

.promotion-card__conditions li,
.promotion-card__features li,
.promotion-card__bonus-list li,
.promotion-card__restrictions-list li {
  margin-bottom: 12px;
  line-height: 1.5;
  padding-left: 25px;
  position: relative;
}

.promotion-card__conditions li::before,
.promotion-card__features li::before,
.promotion-card__bonus-list li::before,
.promotion-card__restrictions-list li::before {
  content: '•';
  color: #cf1034;
  position: absolute;
  left: 0;
  font-size: 1.5rem;
  line-height: 1;
}

.promotion-card__note {
  color: #fff;
  margin: 25px 0;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  line-height: 1.5;
}

.contact-button,
.telegram-button {
  display: block;
  text-decoration: none;
  text-align: center;
  padding: 15px;
  border-radius: 10px;
  margin-top: 25px;
  transition: all 0.3s ease;
}

.contact-button {
  background: #cf1034;
  color: #fff;
}

.telegram-button {
  background: #0088cc;
  color: #fff;
}

.contact-button:hover,
.telegram-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.contact-button__text,
.telegram-button__text {
  display: block;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.contact-button__phone,
.telegram-button__bonus {
  display: block;
  font-size: 0.9rem;
  opacity: 0.9;
}

.promotions__note {
  margin: 40px 0;
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  text-align: center;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 1200px) {
  .promotions__container {
    padding: 0 1rem;
  }
}

@media (max-width: 768px) {
  .promotions {
    padding: 0;
  }

  .promotions__nav {
    display: none;
  }

  .promotions__container {
    padding: 10px;
  }

  .promotion-card {
    flex-direction: column;
    margin-bottom: 20px;
  }

  .promotion-card__image {
    width: 100%;
  }

  .promotion-card__img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }

  .promotion-card__content {
    padding: 10px;
  }

  .promotion-card__title {
    font-size: 18px;
  }

  .promotion-card__price {
    font-size: 16px;
  }

  .promotion-card__description,
  .promotion-card__subtitle,
  .promotion-card__note {
  }

  .promotion-card__conditions,
  .promotion-card__features,
  .promotion-card__bonus-list,
  .promotion-card__restrictions-list {
    padding-left: 20px;
  }

  .contact-button {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 5px;
  }

  .contact-button__text,
  .contact-button__phone {
    font-size: 16px;
  }

  .telegram-button {
    flex-direction: column;
    text-align: center;
    padding: 10px;
    font-size: 16px;
  }

  .promotions__note {
    padding: 15px;
    margin: 0 10px;
    font-size: 12px;
    text-align: center;
  }
}

</style> 