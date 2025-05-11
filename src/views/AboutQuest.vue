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
      <div class="quest-header" :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${quest.main_image})` }">
        <div class="container">
          <span class="age">{{ quest.age_min }}+</span>

          <div class="quest-about">
            <div class="quest-title-wrapper">
              <h1 class="name-quest">{{ quest.name }}</h1>
              <button class="to-book">Забронировать</button>
            </div>
            <div class="quest-chars">
              <div class="char-item">
                <img :src="players" alt="Players" />
                <span>{{ quest.players.min }}-{{ quest.players.max }} игроков</span>
              </div>
              <div class="char-item">
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
          <div class="slider">
            <ImgSlider :images="quest.images" />
          </div>

          <div class="quest-details">
            <div class="description" v-html="quest.description"></div>
          </div>
        </div>

        <div class="quest-more">


            <div class="vip-lounges" v-if="quest.vips && quest.vips.length">
              <h3>Доступные лаундж-зоны</h3>
              <div class="lounges-grid">
                <div 
                  v-for="lounge in quest.vips" 
                  :key="lounge.id"
                  class="lounge-card"
                  :style="{ backgroundImage: `url(${lounge.photo[0]})` }"
                  @click="openGallery(lounge)"
                >
                  <div class="lounge-overlay">
                    <button class="view-btn">Посмотреть</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="quest-addition">
              <div class="additional-services" v-if="quest.additional_services && quest.additional_services.length">
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

            <div class="limits" v-if="quest.limits && quest.limits.length">
              <h3>Ограничения</h3>
              <ul>
                <li v-for="(limit, index) in quest.limits" :key="index">{{ limit }}</li>
              </ul>
            </div>
            </div>

            <div class="location-info">
              <h3>Локация</h3>
              <p>{{ quest.location.address.replace(/&quot;/g, '"') }}</p>
              <div class="map-links">
                <a 
                  v-if="quest.location.links.ymaps" 
                  :href="quest.location.links.ymaps" 
                  target="_blank"
                  class="map-link"
                >
                  Яндекс Карты
                </a>
                <a 
                  v-if="quest.location.links['2gis']" 
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

import axios from 'axios';
import players from '@/assets/images/players.png';
import time from '@/assets/images/time.png';
import difficulty from '@/assets/images/difficulty.png';
import ImgSlider from '@/components/ImgSlider.vue';

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
});

const quest = ref(null);
const loading = ref(true);
const error = ref(null);
const currentImage = ref('');
const selectedLounge = ref(null);
const currentPhotoIndex = ref(0);

const currentPhoto = computed(() => {
  if (!selectedLounge.value?.photo?.length) return '';
  return selectedLounge.value.photo[currentPhotoIndex.value];
});

onMounted(async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await axios.get(`https://chezakod.ru/api/v2/quests/?id=${props.id}/`);
    if (response.data.status && response.data.result) {
      quest.value = response.data.result;
      quest.value.images = response.data.result.photo;
      currentImage.value = quest.value.main_image;
      console.log('Quest data:', quest.value);
      console.log('VIP lounges:', quest.value.vips);
    } else {
      throw new Error('Неверный формат данных от сервера');
    }
  } catch (err) {
    console.error('Ошибка при загрузке квеста:', err);
    error.value = 'Не удалось загрузить информацию о квесте. Пожалуйста, попробуйте позже.';
  } finally {
    loading.value = false;
  }
});

const openGallery = (lounge) => {
  selectedLounge.value = lounge;
  currentPhotoIndex.value = 0;
  document.body.style.overflow = 'hidden';
};

const closeGallery = () => {
  selectedLounge.value = null;
  currentPhotoIndex.value = 0;
  document.body.style.overflow = '';
};

const nextPhoto = () => {
  if (currentPhotoIndex.value < selectedLounge.value.photo.length - 1) {
    currentPhotoIndex.value++;
  }
};

const prevPhoto = () => {
  if (currentPhotoIndex.value > 0) {
    currentPhotoIndex.value--;
  }
};
</script>

<style scoped>
.about-quest {
  color: #fff;
  min-height: 100vh;
  background: #1a1a1a;
}
.quest-addition{
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
}
.quest-header {
  position: relative;
  background-size: cover;
  background-position: center;
  padding: 300px 0 30px;
  margin-bottom: 40px;
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

.quest-about {
  display: flex;
  justify-content: space-between;
  align-items: end;
  position: relative;
  z-index: 1;
}

.quest-title-wrapper {
  align-items: center;
}

.age{
  position: absolute;
  top: -250px;
  right: 0;
  padding: 10px;
  border-radius: 8px;
  background-color: #CF1034;
}

.name-quest {
  font-size: 2.5rem;
  margin: 0;
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
  transform: scale(1.05);
}

.quest-chars {
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

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.quest-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.quest-gallery {
  position: relative;
}

.main-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
}

.thumbnail-list {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.thumbnail-list img {
  width: 100px;
  height: 70px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.thumbnail-list img:hover {
  opacity: 0.8;
}

.thumbnail-list img.active {
  opacity: 1;
  border: 2px solid #cf1034;
}

.quest-details {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.description {
  line-height: 1.6;
}

.location-info {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
}

.map-links {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.map-link {
  background: #cf1034;
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  text-decoration: none;
  transition: background 0.3s ease;
}

.map-link:hover {
  background: #a00d29;
}

.vip-lounges {
  margin-top: 40px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.vip-lounges h3 {
  color: #fff;
  margin-bottom: 20px;
  font-size: 24px;
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
  transition: transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  transition: opacity 0.3s ease;
}

.lounge-card:hover .lounge-overlay {
  opacity: 1;
}

.view-btn {
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

.view-btn:hover {
  background: #a00d29;
  transform: scale(1.05);
}

.additional-services {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  width: 550px;
  border-radius: 10px;
}

.services-list {
  display: grid;
  gap: 15px;
  margin-top: 15px;
}

.service-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
}

.limits {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
}

.limits ul {
  list-style: none;
  padding: 0;
  margin: 15px 0 0;
}

.limits li {
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.limits li:last-child {
  border-bottom: none;
}
.slider {
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
}

/* Gallery Modal Styles */
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
  background: #fff;
  border-radius: 10px;
  padding: 20px;
}

.gallery-modal__close {
  position: absolute;
  top: 30px;
  right: 30px;
  background: none;
  border: none;
  font-size: 30px;
  color: #fff;
  cursor: pointer;
  z-index: 1;
}

.gallery-modal__main {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  
}

.gallery-modal__image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 10px;

}

.gallery-modal__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.3);
  border: none;
  color: #fff;
  font-size: 24px;
  border-radius: 10px;

  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gallery-modal__arrow:hover {
  background: rgba(255, 255, 255, 0.5);
}

.gallery-modal__arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.gallery-modal__arrow--prev {
  left: 10px;
}

.gallery-modal__arrow--next {
  right: 10px;
}

.gallery-modal__thumbnails {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0;
  justify-content: center;
}

.gallery-modal__thumbnails img {
  width: 100px;
  height: 70px;
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

@media (max-width: 768px) {
  .quest-content {
    grid-template-columns: 1fr;
  }

  .lounges-grid {
    grid-template-columns: 1fr;
  }

  .gallery-modal__content {
    width: 95%;
    padding: 10px;
  }

  .gallery-modal__arrow {
    padding: 10px;
    font-size: 20px;
  }

  .gallery-modal__thumbnails img {
    width: 80px;
    height: 60px;
  }

  .quest-title-wrapper {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .quest-chars {
    flex-direction: column;
    align-items: center;
  }
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #fff;
}

.error {
  text-align: center;
  padding: 40px;
  color: #cf1034;
  background: rgba(207, 16, 52, 0.1);
  border-radius: 10px;
  margin: 20px 0;
}
</style> 