<template> <!-- TODO: пофиксить мобильную версию -->
  <section class="lounge">
    <div class="container">
      <div class="lounge__list">
        <div
            v-for="lounge in lounges"
            :key="lounge.id"
            class="lounge__el"
            @click="openGallery(lounge)"
            :style="{ backgroundImage: `url(${lounge.photo[0] || lounge.image})` }"
        >
          <div class="lounge__overlay">
            <div class="lounge__info">
              <div class="lounge__address">
                {{ (lounge.location || location).address }}
              </div>
              <div class="lounge__links">
                <a
                    v-if="(lounge.location || location).links?.ymaps"
                    :href="(lounge.location || location).links.ymaps"
                    target="_blank"
                    class="lounge__map-link"
                >
                  Яндекс Карты
                </a>
                <a
                    v-if="(lounge.location || location).links?.['2gis']"
                    :href="(lounge.location || location).links['2gis']"
                    target="_blank"
                    class="lounge__map-link"
                >
                  2GIS
                </a>
              </div>
<!--              <button-->
<!--                  class="lounge__book-btn"-->
<!--              >-->
<!--                Посмотреть-->
<!--              </button>-->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Photo Gallery Modal -->
    <div v-if="selectedLounge" class="gallery-modal" @click="closeGallery">
      <div class="gallery-modal__content" @click.stop>
        <button class="gallery-modal__close" @click="closeGallery">&times;</button>
        <swiper-container class="x"
            :navigation="true"
            thumbs-swiper=".lounge-thumbs"
            :zoom="true"
        >
          <swiper-slide
              v-for="(photo, index) in selectedLounge.photo"
              :key="index"
          >
            <div class="swiper-zoom-container">
              <img :src="photo" :alt="`Фото ${index + 1}`">
            </div>
          </swiper-slide>
        </swiper-container>
        <swiper-container
            class="lounge-thumbs"
            :slidesPerView="3"
            :free-mode="true"
            :watchSlidesProgress="true"
            :spaceBetween="10"
            :breakpoints="{
              768: {
                slidesPerView: 6
              }
            }"
        >
          <swiper-slide
              v-for="(photo, index) in selectedLounge.photo"
              :key="index"
              class="thumbs-slide"
          >
            <img :src="photo" :alt="`Фото ${index + 1}`">
          </swiper-slide>
        </swiper-container>
        <!--        <div class="gallery-modal__main">-->
        <!--          <button-->
        <!--              class="gallery-modal__arrow gallery-modal__arrow&#45;&#45;prev"-->
        <!--              @click="prevPhoto"-->
        <!--              :disabled="currentPhotoIndex === 0"-->
        <!--          >-->
        <!--            &#10094;-->
        <!--          </button>-->
        <!--          <img-->
        <!--              :src="currentPhoto"-->
        <!--              :alt="selectedLounge.location?.name || 'Лаундж зона'"-->
        <!--              class="gallery-modal__image"-->
        <!--          >-->
        <!--          <button-->
        <!--              class="gallery-modal__arrow gallery-modal__arrow&#45;&#45;next"-->
        <!--              @click="nextPhoto"-->
        <!--              :disabled="currentPhotoIndex === selectedLounge.photo.length - 1"-->
        <!--          >-->
        <!--            &#10095;-->
        <!--          </button>-->
        <!--        </div>-->
        <!--        <div class="gallery-modal__thumbnails">-->
        <!--          <img-->
        <!--              v-for="(photo, index) in selectedLounge.photo"-->
        <!--              :key="index"-->
        <!--              :src="photo"-->
        <!--              :alt="`Фото ${index + 1}`"-->
        <!--              :class="{ 'active': currentPhotoIndex === index }"-->
        <!--              @click="currentPhotoIndex = index"-->
        <!--          >-->
        <!--        </div>-->
      </div>
    </div>
  </section>
</template>

<script setup>
import {ref} from 'vue';
import {register} from "swiper/element/bundle";

register();

const props = defineProps({
  lounges: {
    type: Array,
    required: true,
  },
  location: {
    type: Array,
    required: false
  }
});

const selectedLounge = ref(null);

const openGallery = (lounge) => {
  selectedLounge.value = lounge;
  document.body.style.overflow = 'hidden';
};

const closeGallery = () => {
  selectedLounge.value = null;
  document.body.style.overflow = '';
};


</script>

<style scoped>

.lounge-thumbs {
  margin-top: 10px;
}

swiper-container * {
  border-radius: 20px;
}
swiper-container.x {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: auto;
}
swiper-slide.thumbs-slide img {
  object-fit: cover;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s ease;
}

swiper-slide.thumbs-slide img:hover {
  opacity: 0.8;
}

swiper-slide.swiper-slide-thumb-active.thumbs-slide img {
  border: 2px solid #cf1034;
  opacity: 1;
}

.lounge__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  justify-content: center;
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
  width: 400px;
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
}

.gallery-modal__content {
  border-radius: 16px;
  position: relative;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.gallery-modal__close {
  position: absolute;
  top: -35px;
  right: -35px;
  background: none;
  border: none;
  font-size: 36px;
  cursor: pointer;
  color: white;
  z-index: 100;
}

.gallery-modal__close:hover {
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

  .gallery-modal__close {
    right: -10px;
    top: -40px;
  }
}

@media (max-width: 768px) {

  .gallery-modal__content {
    border-radius: 16px;
    position: relative;
    width: 90%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }

  .gallery-modal__close {
    font-size: 32px;
  }

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

</style>