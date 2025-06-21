<template>
  <div class="show-programs">
    <Header></Header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1 class="hero__title">Шоу-программы</h1>
        <p class="hero__subtitle">Незабываемые развлечения для вашего праздника</p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="main-content">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Загрузка шоу-программ...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <p>{{ error }}</p>
          <button @click="loadShows" class="retry-button">Повторить</button>
        </div>

        <!-- Основные шоу-программы -->
        <div v-else>
          <div class="shows-grid">
            <div class="shows-grid">
              <div v-for="show in showPrograms" :key="show.id" class="show-card" @click="openGallery(show)">
                <div class="show-image">
                  <img :src="show.previewImage" :alt="show.name" loading="lazy">
                </div>
                <div class="show-content">
                  <h3>{{ show.name }}</h3>
                  <p class="show-description">{{ show.previewText }}</p>
                  <div class="show-details">
                    <div class="detail-row">
                      <span class="detail-label">Длительность: {{ show.duration }}</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">Актеры: {{ show.actor }}</span>
                    </div>
                    <div class="show-price">{{ show.price }} ₽ <span class="price-note">на команду 10 человек</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Галерея шоу-программы -->
          <div v-if="selectedShow" class="gallery-modal" @click="closeGallery">
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
                    :alt="selectedShow.name"
                    class="gallery-modal__image"
                >
                <button
                    class="gallery-modal__arrow gallery-modal__arrow--next"
                    @click="nextPhoto"
                    :disabled="currentPhotoIndex === selectedShow.gallery.length - 1"
                >
                  &#10095;
                </button>
              </div>
              <div class="gallery-modal__thumbnails">
                <img
                    v-for="(photo, index) in selectedShow.gallery"
                    :key="index"
                    :src="photo"
                    :alt="`Фото ${index + 1}`"
                    :class="{ 'active': currentPhotoIndex === index }"
                    @click="currentPhotoIndex = index"
                >
              </div>
            </div>
          </div>


          <h2 class="section-title">Мини шоу-программы</h2>
          <div class="mini-shows-grid">
            <div v-for="mini in miniShows" :key="mini.id" class="mini-show-card" @click="selectedMiniShow = mini">
              <img :src="mini.image" :alt="mini.name" loading="lazy">
              <h4>{{ mini.name }}</h4>
              <p class="mini-price">{{ mini.price }} ₽</p>
            </div>
          </div>

          <!-- Modal -->
          <div v-if="selectedMiniShow" class="modal-backdrop" @click.self="selectedMiniShow = null">
            <div class="modal-content">
              <button class="modal-close" @click="selectedMiniShow = null">×</button>
              <img :src="selectedMiniShow.image" :alt="selectedMiniShow.name"/>
              <h3>{{ selectedMiniShow.name }}</h3>
              <p>{{ selectedMiniShow.description }}</p>
              <p class="mini-price">{{ selectedMiniShow.price }} ₽</p>
            </div>
          </div>


        </div>
      </div>
    </section>

    <Footer></Footer>
  </div>
</template>


<script setup>
import {computed, onMounted, onServerPrefetch, ref} from 'vue'
import axios from 'axios'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import {useHead} from "@unhead/vue";

const showPrograms = ref([]);
const miniShows = ref([]);
const selectedMiniShow = ref(null);
const loading = ref(true);
const error = ref(null);
const selectedShow = ref(null)
const selectedLounge = ref(null);
const currentPhotoIndex = ref(0);

const currentPhoto = computed(() => {
  if (!selectedShow.value?.gallery?.length) return '';
  return selectedShow.value.gallery[currentPhotoIndex.value];
});

const openGallery = (show) => {
  selectedShow.value = show;
  currentPhotoIndex.value = 0;
  document.body.style.overflow = 'hidden';
};

const closeGallery = () => {
  selectedShow.value = null;
  currentPhotoIndex.value = 0;
  document.body.style.overflow = '';
};

const nextPhoto = () => {
  if (currentPhotoIndex.value < selectedShow.value.gallery.length - 1) {
    currentPhotoIndex.value++;
  }
};

const prevPhoto = () => {
  if (currentPhotoIndex.value > 0) {
    currentPhotoIndex.value--;
  }
};

const loadShows = async () => {
  loading.value = true;
  error.value = null;

  try {
    const [main, mini] = await Promise.all([
      axios.get(import.meta.env.VITE_API_URL + '/show/'),
      axios.get(import.meta.env.VITE_API_URL + '/service/')
    ]);

    // Основные шоу
    showPrograms.value = main.data.result.map(show => ({
      id: show.id,
      name: show.name,
      previewImage: show.preview_image,
      previewText: show.preview_text?.replace(/<[^>]*>/g, '') || '',
      duration: show.duration,
      actor: show.actor,
      price: show.price,
      gallery: show.photo || [] // Переименовываем photo в gallery
    }));

    // Мини-шоу
    miniShows.value = mini.data.result.map(service => ({
      id: service.id,
      name: service.name,
      description: service.description.replace(/<[^>]*>/g, ''),
      price: service.price,
      image: service.image
    }));
  } catch (err) {
    console.error(err);
    error.value = 'Ошибка загрузки шоу-программ.';
  } finally {
    loading.value = false;
  }
};

useHead({
  title: "Шоу-программы"
});

onServerPrefetch(loadShows);
onMounted(loadShows);

</script>

<style scoped>
.mini-shows {
  margin-top: 60px;
}

.mini-shows-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.mini-show-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  text-align: center;
  padding: 10px;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mini-show-card:hover {
  transform: translateY(-4px);
}

/* Мини-шоу стили */
.mini-shows {
  margin-top: 60px;
}

.section-title {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #CF1034;
}

.mini-shows-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-top: 20px;
}

.mini-show-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 16px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.mini-show-card:hover {
  transform: translateY(-5px);
}

.mini-show-image {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 12px;
}

.mini-show-info {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.mini-show-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.mini-show-description {
  font-size: 0.95rem;
  color: #555;
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.mini-show-price {
  font-size: 1.1rem;
  color: #CF1034;
  font-weight: 600;
  margin-top: auto;
}

.section-title {
  font-size: 28px;
  margin: 40px 0 20px;
  text-align: center;
  color: #333;
}

.mini-shows-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.mini-show-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  transition: transform 0.3s ease;
  padding: 15px;
}

.mini-show-card:hover {
  transform: scale(1.03);
}

.mini-show-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.mini-show-card h4 {
  font-size: 18px;
  margin: 12px 0 6px;
  color: #CF1034;
}

.mini-price {
  font-weight: bold;
  color: #333;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  position: relative;
  animation: fadeIn 0.3s ease;
}

.modal-content img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
}

.modal-content h3 {
  color: #CF1034;
  margin-bottom: 10px;
}

.modal-content p {
  margin-bottom: 10px;
  line-height: 1.5;
  color: #555;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #666;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Шоу-программы стили (улучшения) */
.show-card {
  background: linear-gradient(to bottom right, #fff, #fdf4f6);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.show-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
}

.show-title {
  font-size: 1.6rem;
  color: #CF1034;
  font-weight: 700;
  margin-bottom: 10px;
}

.show-description {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  max-height: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.show-link {
  background: linear-gradient(135deg, #CF1034, #e82c4c);
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
}


.show-programs {
  background-color: #f8f9fa;
}

.hero {
  background-size: cover;
  background-position: center;
  color: #000;
  padding: 40px 0;
  text-align: center;
}

.hero__title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
}

.hero__subtitle {
  font-size: 24px;
  opacity: 0.9;
}

.container {
  width: 1200px;
  margin: 0 auto;
}

.main-content {
  /* padding: 60px 0; */
}

.shows-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  margin: 30px 0;
}

.show-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.show-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.show-image {
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.show-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.show-card:hover .show-image img {
  transform: scale(1.03);
}

.show-content {
  display: flex;
  flex-direction: column;
  padding: 24px;
  flex-grow: 1;
}

.show-content h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #CF1034;
  line-height: 1.3;
}

.show-description {
  font-size: 15px;
  line-height: 1.5;
  color: #000;
  margin-bottom: 20px;
  flex-grow: 1;
}

.show-details {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.show-details p {
  color: #666;
}

.detail-row {
  display: flex;
  margin-bottom: 8px;
  font-size: 14px;
  gap: 10px;
}

.detail-label {
  font-weight: 500;
  color: #333;
  min-width: 90px;
}

.detail-value {
  color: #666;
}

.show-price {
  font-size: 20px;
  font-weight: 700;
  color: #CF1034;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed #eee;
}

.price-note {
  font-size: 13px;
  font-weight: 400;
  color: #888;
  display: block;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .shows-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .show-image {
    height: 180px;
  }

  .show-content {
    padding: 18px;
  }
}


.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-top: 60px;
  color: #000;
}

@media (max-width: 1200px) {
  .container {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .hero__title {
    font-size: 36px;
  }

  .hero__subtitle {
    font-size: 20px;
  }

  .shows-grid {
    grid-template-columns: 1fr;
  }

  .gallery-modal__content {
    background: #fff;
    padding: 20px;
    border-radius: 16px;
    position: relative;
    width: 90%;
    height: 50%;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 40px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #CF1034;
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Error State */
.error-state {
  text-align: center;
  padding: 40px;
  color: #CF1034;
}

.retry-button {
  margin-top: 20px;
  padding: 10px 20px;
  background: #CF1034;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.retry-button:hover {
  background: #a00d29;
}

.gallery-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.gallery-modal__content {
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  position: relative;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.gallery-modal__close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 28px;
  color: #333;
  cursor: pointer;
  z-index: 2;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.gallery-modal__close:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.gallery-modal__main {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  min-height: 0;
}

.gallery-modal__image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
}

.gallery-modal__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 2;
}

.gallery-modal__arrow:hover {
  background: #fff;
}

.gallery-modal__arrow--prev {
  left: 20px;
}

.gallery-modal__arrow--next {
  right: 20px;
}

.gallery-modal__arrow[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.gallery-modal__thumbnails {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0;
  scrollbar-width: thin;
  scrollbar-color: #CF1034 #f0f0f0;
}

.gallery-modal__thumbnails::-webkit-scrollbar {
  height: 6px;
}

.gallery-modal__thumbnails::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 3px;
}

.gallery-modal__thumbnails::-webkit-scrollbar-thumb {
  background: #CF1034;
  border-radius: 3px;
}

.gallery-modal__thumbnails img {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.gallery-modal__thumbnails img:hover {
  opacity: 0.8;
  transform: scale(1.05);
}

.gallery-modal__thumbnails img.active {
  opacity: 1;
  border: 2px solid #CF1034;
}

@media (max-width: 768px) {
  .gallery-modal__content {
    width: 95%;
    padding: 15px;
  }

  .gallery-modal__arrow {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }

  .gallery-modal__thumbnails img {
    width: 60px;
    height: 45px;
  }

  .gallery-modal__image {
    max-height: 60vh;
  }
}

@media (max-width: 480px) {
  .gallery-modal__arrow {
    width: 30px;
    height: 30px;
    font-size: 14px;
  }

  .gallery-modal__thumbnails img {
    width: 50px;
    height: 40px;
  }
}

</style>
