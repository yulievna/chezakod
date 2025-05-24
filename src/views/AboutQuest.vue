<template>
  <Header></Header>
  <div class="about-quest">
    <div v-if="loading" class="loading">
      Загрузка...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else-if="quest" class="quest-info">
      <div class="quest-header" :style="quest.main_image ? { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url(${quest.main_image})` } : {}">
        <div class="container">
          <span v-if="quest.age_min" class="age">{{ quest.age_min }}+</span>

          <div class="quest-about">
            <div class="quest-title-wrapper">
              <h1 class="name-quest">{{ quest.name }}</h1>
              <button class="to-book">Забронировать</button>
            </div>
            <div class="quest-chars">
              <div v-if="quest.players" class="char-item">
                <img :src="players" alt="Players" />
                <span>{{ quest.players.min }}-{{ quest.players.max }} игроков</span>
              </div>
              <div v-if="quest.duration" class="char-item">
                <img :src="time" alt="Time" />
                <span>{{ quest.duration }} минут</span>
              </div>
              <div class="char-item">
                <img :src="difficulty" alt="Difficulty" />
                <span>Средняя сложность</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="quest-content">
          <div v-if="quest.images" class="slider">
            <ImgSlider :images="quest.images" />
          </div>

          <div class="quest-details">
            <h1 class="details-name__quest">{{ quest.name }}</h1>
            <div v-if="quest.description" class="description" v-html="quest.description"></div>
          </div>
        </div>

        <div class="quest-more">
          <div v-if="quest.vips && quest.vips.length" class="vip-lounges">
            <h3>Доступные лаундж-зоны на этом квесте</h3>
            <div class="lounges-grid">
              <div
                v-for="lounge in quest.vips"
                :key="lounge.id"
                class="lounge-card"
                :style="lounge.photo && lounge.photo[0] ? { backgroundImage: `url(${lounge.photo[0]})` } : {}"
                @click="openGallery(lounge)"
              >
                <div class="lounge-overlay">
                  <button class="view-btn">Посмотреть</button>
                </div>
              </div>
            </div>
          </div>

          <div class="quest-addition">
            <div v-if="quest.additional_services && quest.additional_services.length" class="additional-services">
              <h3>Дополнительные услуги</h3>
              <div class="services-list">
                <div
                  v-for="service in quest.additional_services"
                  :key="service.id"
                  class="service-item"
                >
                  <span class="service-name">{{ service.name }}</span>
                  <span class="service-price">{{ service.price }} ₽</span>
                </div>
              </div>
            </div>

            <div v-if="quest.limits && quest.limits.length" class="limits">
              <h3>Ограничения</h3>
              <ul>
                <li v-for="(limit, index) in quest.limits" :key="index">{{ limit }}</li>
              </ul>
            </div>
          </div>

          <div v-if="quest.location" class="location-info">
            <h3>Локация</h3>
            <p>{{ quest.location.address.replace(/&quot;/g, '"') }}</p>
            <div class="map-links">
              <a
                v-if="quest.location.links && quest.location.links.ymaps"
                :href="quest.location.links.ymaps"
                target="_blank"
                class="map-link"
              >
                Яндекс Карты
              </a>
              <a
                v-if="quest.location.links && quest.location.links['2gis']"
                :href="quest.location.links['2gis']"
                target="_blank"
                class="map-link"
              >
                2GIS
              </a>
            </div>
          </div>
        </div>
      </div>

      <section v-if="quest.id" class="schedule">
        <div class="container">
          <h2 class="title">Расписание</h2>
          <TimetableEmbed :questIds="[quest.id]" />
        </div>
      </section>
    </div>

    <!-- Gallery Modal -->
    <div v-if="selectedLounge" class="gallery-modal" @click="closeGallery">
      <div class="gallery-modal__content" @click.stop>
        <button class="gallery-modal__close" @click="closeGallery">&times;</button>
        <div class="gallery-modal__main">
          <button
            class="gallery-modal__arrow gallery-modal__arrow--prev"
            @click="prevPhoto"
            :disabled="currentPhotoIndex === 0"
          >
            &#10094;
          </button>
          <img
            :src="currentPhoto"
            :alt="'Лаундж зона'"
            class="gallery-modal__image"
          >
          <button
            class="gallery-modal__arrow gallery-modal__arrow--next"
            @click="nextPhoto"
            :disabled="currentPhotoIndex === selectedLounge.photo.length - 1"
          >
            &#10095;
          </button>
        </div>
        <div class="gallery-modal__thumbnails">
          <img
            v-for="(photo, index) in selectedLounge.photo"
            :key="index"
            :src="photo"
            :alt="`Фото ${index + 1}`"
            :class="{ 'active': currentPhotoIndex === index }"
            @click="currentPhotoIndex = index"
          >
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import TimetableEmbed from '@/components/TimetableEmbed.vue';

import axios from 'axios';
import players from '@/assets/images/players.png';
import time from '@/assets/images/time.png';
import difficulty from '@/assets/images/difficulty.png';
import ImgSlider from '@/components/ImgSlider.vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const route = useRoute();
const quest = ref(null);
const loading = ref(true);
const error = ref(null);
const currentImage = ref('');
const selectedLounge = ref(null);
const currentPhotoIndex = ref(0);
const isChildQuest = ref(false);

const currentPhoto = computed(() => {
  if (!selectedLounge.value?.photo?.length) return '';
  return selectedLounge.value.photo[currentPhotoIndex.value];
});

const loadQuestData = async () => {
  try {
    loading.value = true;
    error.value = null;
    
    // Check if we're in a child quest route
    isChildQuest.value = route.path.includes('/child-quests/');
    
    // First get all quests to find the one with matching slug
    const allQuestsUrl = isChildQuest.value
      ? 'https://chezakod.ru/api/v2/quests/?category=child'
      : 'https://chezakod.ru/api/v2/quests/';

    const allQuestsResponse = await axios.get(allQuestsUrl);
    if (!allQuestsResponse.data.status || !allQuestsResponse.data.result) {
      throw new Error('Не удалось загрузить список квестов');
    }

    // Find the quest with matching slug
    const matchingQuest = allQuestsResponse.data.result.find(q => q.slug === props.id);
    if (!matchingQuest) {
      throw new Error('Квест не найден');
    }

    // Now get the full quest data using its ID
    const questUrl = isChildQuest.value
      ? `https://chezakod.ru/api/v2/quests/?id=${matchingQuest.id}&category=child`
      : `https://chezakod.ru/api/v2/quests/?id=${matchingQuest.id}`;

    const response = await axios.get(questUrl);
    if (response.data.status && response.data.result) {
      quest.value = response.data.result;
      if (response.data.result.photo) {
        quest.value.images = response.data.result.photo;
      }
      if (response.data.result.main_image) {
        currentImage.value = response.data.result.main_image;
      }
    } else {
      throw new Error('Неверный формат данных от сервера');
    }
  } catch (err) {
    console.error('Ошибка при загрузке квеста:', err);
    error.value = 'Не удалось загрузить информацию о квесте. Пожалуйста, попробуйте позже.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadQuestData();
});

const openGallery = (lounge) => {
  if (lounge) {
    selectedLounge.value = lounge;
    currentPhotoIndex.value = 0;
    document.body.style.overflow = 'hidden';
  }
};

const closeGallery = () => {
  selectedLounge.value = null;
  currentPhotoIndex.value = 0;
  document.body.style.overflow = '';
};

const nextPhoto = () => {
  if (selectedLounge.value && currentPhotoIndex.value < selectedLounge.value.photo.length - 1) {
    currentPhotoIndex.value++;
  }
};

const prevPhoto = () => {
  if (selectedLounge.value && currentPhotoIndex.value > 0) {
    currentPhotoIndex.value--;
  }
};
</script>

<style scoped>
/* Базовые стили */
.about-quest {
  color: #000;
  min-height: 100vh;
  background: #fff;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  box-sizing: border-box;
}

/* Шапка квеста */
.quest-header {
  position: relative;
  background-size: cover;
  background-position: center;
  padding: 300px 0 30px;
  margin-bottom: 40px;
  color: #fff5f5;
}

.quest-header::before {
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

.quest-about {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  z-index: 1;
}

.name-quest {
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
  font-size: 16px;
  font-weight: 500;
}

.to-book:hover {
  background: #a00d29;
  transform: translateY(-2px);
}

.quest-chars {
  display: flex;
  gap: 30px;
}
.details-name__quest{
  font-size: 28px;
}
.char-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
}

.char-item img {
  width: 24px;
  height: 24px;
}

/* Основной контент */
.quest-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.slider {
  border-radius: 10px;
  overflow: hidden;
}

.quest-details {
  line-height: 1.6;
}

/* VIP лаунжи */
.vip-lounges {
  margin-top: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.vip-lounges h3 {
  font-size: clamp(1.5rem, 5vw, 2rem);
  text-align: center;
  color: var(--primary-color);
  font-weight: 600;
  margin: 0 auto;
  line-height: 1.3;
}

.lounges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.lounge-card {
  position: relative;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.lounge-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.lounge-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
}

.lounge-card:hover .lounge-overlay {
  opacity: 1;
}

.view-btn {
  background: #CF1034;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-btn:hover {
  background: #a00d29;
}

/* Дополнительные услуги и ограничения */
.quest-addition {
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
}

.additional-services {
  width: 450px;
}
.limits {
  width: 700px;
}
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


/* Расписание */
.schedule {
  margin-top: 60px;
  padding: 40px 0;
}

.schedule .title {
  font-size: 32px;
  margin-bottom: 30px;
  text-align: center;
  color: #CF1034;
  font-weight: 600;
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
  font-size: 14px;
  transition: all 0.25s ease;
  border: 3px solid #cf1034;
}

.map-link:active {
  transform: translateY(0);
}


/* Адаптация для мобильных */
@media (max-width: 768px) {
  .location-info {
    padding: 18px;
  }
.limits{
  width: 100%;
}

  .map-link {
    width: 100%;
    padding: 12px;
  }
}



/* Модальное окно галереи */
.gallery-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.gallery-modal__content {
  position: relative;
  width: 90%;
  max-width: 800px;
  background: #1a1a1a;
  border-radius: 10px;
  padding: 20px;
}

.gallery-modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 30px;
  color: #fff;
  cursor: pointer;
}

.gallery-modal__image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 5px;
}

.gallery-modal__thumbnails {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0;
  justify-content: center;
}

.gallery-modal__thumbnails img {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.gallery-modal__thumbnails img:hover {
  opacity: 0.8;
}

.gallery-modal__thumbnails img.active {
  opacity: 1;
  border: 2px solid #cf1034;
}

/* Адаптация для мобильных */
@media (max-width: 992px) {
  .quest-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .quest-addition {
    flex-direction: column;
  }

  .additional-services {
    width: 100%;
  }

  .limits {
    margin-left: 0;
    margin-top: 20px;
  }
  .lounge-overlay{
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
  .quest-header {
    padding: 200px 0 20px;
  }

  .name-quest {
    font-size: 32px;
  }

  .quest-about {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .quest-chars {
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
  .quest-header{
    padding: 440px 40px 70px;
  }
  .quest-details {
    line-height: 1.6;
    font-size: 20px;
  }
  .name-quest {
    font-size: 24px;
  }

  .to-book {
    width: 100%;
    padding: 10px;
  }

  .lounges-grid {
    grid-template-columns: 1fr;
  }

  .gallery-modal__content {
    width: 95%;
    padding: 10px;
  }

  .gallery-modal__thumbnails img {
    width: 60px;
    height: 45px;
  }
  .quest-title-wrapper{
    order: 2;
  }
}
</style>