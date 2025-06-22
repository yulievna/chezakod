<template> <!-- TODO: пофиксить мобильную версию -->
  <section class="lounge">
    <div class="container">
      <div class="lounge__list">
        <div
            v-for="lounge in lounges"
            :key="lounge.id"
            class="lounge__el"
            :style="{ backgroundImage: `url(${lounge.photo[0] || lounge.image})` }"
        >
          <div class="lounge__overlay">
            <div class="lounge__info">
              <div class="lounge__address">
                {{ lounge.location?.address || lounge.address }}
              </div>
              <div class="lounge__links">
                <a
                    v-if="lounge.location?.links?.ymaps"
                    :href="lounge.location.links.ymaps"
                    target="_blank"
                    class="lounge__map-link"
                >
                  Яндекс Карты
                </a>
                <a
                    v-if="lounge.location?.links?.['2gis']"
                    :href="lounge.location.links['2gis']"
                    target="_blank"
                    class="lounge__map-link"
                >
                  2GIS
                </a>
              </div>
              <button
                  class="lounge__book-btn"
                  @click="openGallery(lounge)"
              >
                Посмотреть
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Photo Gallery Modal -->
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
              :alt="selectedLounge.location?.name || 'Лаундж зона'"
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
  </section>
</template>

<script setup>
import {computed, ref} from 'vue';

const props = defineProps({
  lounges: {
    type: Array,
    required: true,
  },
});

const selectedLounge = ref(null);
const currentPhotoIndex = ref(0);

const currentPhoto = computed(() => {
  if (!selectedLounge.value?.photo?.length) return '';
  return selectedLounge.value.photo[currentPhotoIndex.value];
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
.lounge__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.lounge__el {
  position: relative;
  min-height: 400px;
  border-radius: 20px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  transition: all 0.4s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.lounge__el:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.lounge__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2));
  opacity: 0;
  transition: opacity 0.4s ease;
  display: flex;
  align-items: flex-end;
  padding: 30px;
}

.lounge__el:hover .lounge__overlay {
  opacity: 1;
}

.lounge__info {
  color: #fff;
  width: 100%;
  transform: translateY(20px);
  transition: transform 0.4s ease;
}

.lounge__el:hover .lounge__info {
  transform: translateY(0);
}

.lounge__address {
  font-size: 16px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.lounge__links {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.lounge__map-link {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.lounge__map-link:hover {
  opacity: 1;
  text-decoration: underline;
}

.lounge__book-btn {
  background-color: #cf1034;
  color: #fff;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 75%;
  margin-top: 15px;
  position: relative;
  overflow: hidden;
}

.lounge__book-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.6),
      transparent
  );
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.lounge__book-btn:hover::before {
  left: 100%;
}

/* Медиа-запросы для адаптивности */
@media (max-width: 1200px) {
  .lounge__list {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }
}

@media (max-width: 992px) {
  .lounge__list {
    gap: 20px;
  }

  .lounge__el {
    min-height: 350px;
  }

  .lounge__overlay {
    padding: 25px;
  }

  .lounge__address {
    font-size: 15px;
  }
}

@media (max-width: 768px) {
  .lounge__list {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .lounge__el {
    min-height: 300px;
  }

  .lounge__overlay {
    padding: 20px;
    opacity: 1;
  }

  .lounge__info {
    transform: translateY(0);
  }

  .lounge__address {
    font-size: 14px;
  }

  .lounge__book-btn {
    padding: 10px 20px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .lounge__el {
    min-height: 250px;
  }

  .lounge__overlay {
    padding: 15px;
  }

  .lounge__address {
    font-size: 13px;
  }

  .lounge__map-link {
    font-size: 12px;
  }

  .lounge__book-btn {
    padding: 8px 15px;
    font-size: 13px;
  }
}

/* Стили для модального окна галереи */
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
  padding: 20px;
}

.gallery-modal__content {
  position: relative;
  width: 90%;
  max-width: 1200px;
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
  z-index: 2;
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
  border-radius: 5px;
}

.gallery-modal__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  font-size: 24px;
  padding: 15px;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.gallery-modal__arrow:hover {
  background: rgba(255, 255, 255, 0.2);
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
  scrollbar-width: thin;
  scrollbar-color: #cf1034 #1a1a1a;
}

.gallery-modal__thumbnails::-webkit-scrollbar {
  height: 6px;
}

.gallery-modal__thumbnails::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 3px;
}

.gallery-modal__thumbnails::-webkit-scrollbar-thumb {
  background: #cf1034;
  border-radius: 3px;
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

@media (max-width: 768px) {
  .gallery-modal__content {
    width: 95%;
    padding: 15px;
  }

  .gallery-modal__arrow {
    padding: 10px;
    font-size: 20px;
  }

  .gallery-modal__thumbnails img {
    width: 60px;
    height: 45px;
  }
}

@media (max-width: 480px) {
  .gallery-modal {
    padding: 10px;
  }

  .gallery-modal__content {
    padding: 10px;
  }

  .gallery-modal__close {
    font-size: 24px;
  }

  .gallery-modal__arrow {
    padding: 8px;
    font-size: 18px;
  }

  .gallery-modal__thumbnails img {
    width: 50px;
    height: 38px;
  }
}
</style>