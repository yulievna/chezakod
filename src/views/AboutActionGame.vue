<template>
  <Header></Header>
  <div class="about-action-game">
    <div v-if="loading" class="loading">
      <Loading/>
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else-if="game" class="game-info">
      <div class="game-header"
           :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url(${headerImage})` }">
        <div class="container">
          <span class="age">{{ game.age_min }}+</span>

          <div class="game-about">
            <div class="game-title-wrapper">
              <h1 class="name-game">{{ game.name }}</h1>
              <button class="to-book" @click="">Забронировать</button>
            </div>
            <div class="game-chars">
              <div class="char-item">
                <img :src="players" alt="Players" loading="lazy"/>
                <span>{{ game.players.min }}-{{ game.players.max }} игроков</span>
              </div>
              <div class="char-item">
                <img :src="time" alt="Time" loading="lazy"/>
                <span>{{ game.duration }} мин</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="game-content">
          <div class="slider">
            <ImgSlider :images="game.photo"/>
          </div>

          <div class="game-details">
            <h1 class="details-name__game">{{ game.name }}</h1>
            <div class="description" v-html="game.description"></div>
          </div>
        </div>

        <div class="game-more">
          <div class="game-addition">
            <div class="additional-services" v-if="game.additional_services && game.additional_services.length">
              <h3>Дополнительные услуги</h3>
              <div class="services-list">
                <div
                    v-for="service in game.additional_services"
                    :key="service.id"
                    class="service-item"
                >
                  <span class="service-name">{{ service.name }}</span>
                  <span class="service-price">{{ service.price }} ₽</span>
                </div>
              </div>
            </div>

            <div class="limits" v-if="game.limits && game.limits.length">
              <h3>Ограничения</h3>
              <ul>
                <li v-for="(limit, index) in game.limits" :key="index">{{ limit }}</li>
              </ul>
            </div>
          </div>

          <div v-if="game.location" class="location-info">
            <h3>Локация</h3>
            <p>{{ game.location.address.replace(/&quot;/g, '"') }}</p>
            <div class="map-links">
              <a
                  v-if="game.location.links && game.location.links.ymaps"
                  :href="game.location.links.ymaps"
                  target="_blank"
                  class="map-link"
              >
                Яндекс Карты
              </a>
              <a
                  v-if="game.location.links && game.location.links['2gis']"
                  :href="game.location.links['2gis']"
                  target="_blank"
                  class="map-link"
              >
                2GIS
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Add timetable section -->
      <section class="schedule">
          <h2 class="title">Расписание</h2>
          <TimetableEmbed :questIds="[game.id]"/>
      </section>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
import {computed, defineAsyncComponent, onMounted, onServerPrefetch, ref} from 'vue';
import {useRoute} from 'vue-router';

// Импортируем изображения
import players from '@/assets/images/players.png';
import time from '@/assets/images/time.png';
import {useHead} from "@unhead/vue";
import Loading from "@/components/Loading.vue";

const Header = defineAsyncComponent(() => import('@/components/Header.vue'));
const Footer = defineAsyncComponent(() => import('@/components/Footer.vue'));
const TimetableEmbed = defineAsyncComponent(() => import('@/components/TimetableEmbed.vue'));
const ImgSlider = defineAsyncComponent(() => import('@/components/ImgSlider.vue'));

const route = useRoute();
const game = ref(null);
const loading = ref(true);
const error = ref(null);
const head = ref({
  title: "Загрузка...",
  description: "",
  titleTemplate: null
});

// Текущая игра
const gameId = computed(() => route.params.id);
const headerImage = computed(() => game.value?.main_image);

const init = async () => {
  try {
    loading.value = true;
    error.value = null;

    const response = await fetch(`${import.meta.env.VITE_API_URL}/quests/?slug=${gameId.value}`);
    const data = await response.json();

    if (!data.status) {
      throw new Error(data.error || 'Ошибка при загрузке данных');
    }

    game.value = data.result;
    head.value = {
      title: game.value.name,
      description: game.value.description,
      titleTemplate: "%s %sep экшн-игра %sep %siteName"
    };

    if (!game.value) {
      throw new Error('Игра не найдена');
    }
  } catch (err) {
    console.error('Ошибка при загрузке игры:', err);
    error.value = 'Не удалось загрузить информацию об игре. Пожалуйста, попробуйте позже.';
  } finally {
    loading.value = false;
  }
}

useHead({
  title: computed(() => head.value.title),
  titleTemplate: computed(() => head.value.titleTemplate),
})

onMounted(init);

onServerPrefetch(init);

</script>

<style scoped>
/* Базовые стили */
.about-action-game {
  color: #000;
  min-height: 100vh;
  background: #fff;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

/* Шапка игры */
.game-header {
  position: relative;
  background-size: cover;
  background-position: center;
  padding: 300px 0 30px;
  margin-bottom: 40px;
  color: #fff5f5;
}

.game-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.age {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #CF1034;
  font-weight: bold;
  font-size: 18px;
}

.game-about {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  z-index: 1;
}

.name-game {
  font-size: 42px;
  margin: 0 0 15px 0;
  line-height: 1.2;
}

.to-book {
  background: #CF1034;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.to-book:hover {
  background: #a00d29;
  transform: translateY(-2px);
}

.game-chars {
  display: flex;
  gap: 30px;
}

.char-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.char-item img {
  width: 24px;
  height: 24px;
}

/* Основной контент */
.game-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.slider {
  border-radius: 10px;
  overflow: hidden;
}

.game-details {
  line-height: 1.6;
}

.details-name__game {
  font-size: 28px;
  margin-bottom: 20px;
  color: #CF1034;
}

/* Дополнительные услуги и ограничения */
.game-addition {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.additional-services, .limits {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
}

.additional-services h3, .limits h3 {
  color: #CF1034;
  margin-bottom: 15px;
  font-size: 20px;
}

.services-list {
  display: grid;
  gap: 10px;
}

.service-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #fff;
  border-radius: 5px;
}
.service-name{
  display: inline;
  width: fit-content;
}
.limits ul {
  list-style: none;
  padding: 0;
}

.limits li {
  padding: 10px;
  background: #fff;
  margin-bottom: 10px;
  border-radius: 5px;
}

/* Локация */
.location-info {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 40px;
}

.location-info h3 {
  color: #CF1034;
  margin-bottom: 15px;
  font-size: 20px;
}

.contact-info {
  margin-top: 15px;
}

/* Расписание */
.schedule {
  background: #1a1a1a;
  padding: 40px 0;
}

.schedule .title {
  color: #fff;
  text-align: center;
  margin-bottom: 30px;
}
.location-info {
  border-color: rgba(207, 16, 52, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
}


.location-info h3 {
  font-size: 32px;
  color: #CF1034;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

.location-info h3::before {
  content: '';
  display: block;
  width: 24px;
  height: 24px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23CF1034"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>') no-repeat center;
}

.location-info p {
  font-size: 20px;
  line-height: 1.6;
  color: #000000;
  margin-bottom: 20px;
  padding-left: 34px;
  position: relative;
}


.map-links {
  display: flex;
  gap: 12px;
  padding-left: 34px;
}

.map-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #000000;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.25s ease;
  border: 3px solid #cf1034;
}

.map-link:active {
  transform: translateY(0);
}
/* Адаптация для мобильных */
@media (max-width: 1200px) {
  .container{
    padding: 0 20px;
  }
}

@media (max-width: 992px) {
  .game-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .game-addition {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }

  .game-header {
    padding: 200px 0 20px;
  }

  .name-game {
    font-size: 32px;
  }

  .game-about {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .game-chars {
    flex-wrap: wrap;
    flex-direction: column;
    gap: 15px;
  }

  .schedule .title {
    font-size: 28px;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 0 20px;
  }

  .game-header {
    padding: 440px 40px 70px;
  }

  .game-details {
    line-height: 1.6;
    font-size: 20px;
  }

  .name-game {
    font-size: 24px;
  }

  .to-book {
    width: 100%;
    padding: 10px;
  }

  .game-title-wrapper {
    order: 2;
  }
}

.service-price {
  color: #CF1034;
  font-weight: 500;
  width: 100%;
}

.location-link {
  display: inline-block;
  margin-right: 15px;
  color: #CF1034;
  text-decoration: none;
  transition: color 0.3s ease;
}

.location-link:hover {
  color: #a00d29;
  text-decoration: underline;
}
</style> 