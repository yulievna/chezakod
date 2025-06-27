<template> <!-- TODO: загрузка отзывов из БД, фикс анимаций -->
  <section class="reviews-container">
    <div class="reviews-title">
      <h2>Отзывы наших клиентов на </h2>
      <img class="gis" src="@/assets/images/Light_ENG2x.png" alt="2GIS" loading="lazy"/>
    </div>

    <swiper-container
        :init="false"
        :loop="true"
        :pagination="{
          clickable: true
        }"
        :navigation="true"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }"
        :slidesPerView="3"
        :centeredSlides="true"
        class="swiper-reviews"
        :spaceBetween="30"
        :breakpoints="{
        320: {
            slidesPerView: 1,
            spaceBetween: 10
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }"
    >
      <swiper-slide
          class="review-card"
          v-for="(review, index) in reviews"
          :key="review.id"
          @click="goToReview(index)"
      >
        <!--        <div style="width: 200px; height: 200px; background: green">{{ review.id }}</div>-->
        <div class="review-header">
          <div class="review-info">
            <div class="review-avatar">
              {{ review.user.charAt(0) }}
            </div>
            <div class="review-data">
              <span class="review-name">{{ review.user }}</span>
              <span class="review-date">{{ review.date }}</span>
            </div>
          </div>
          <span class="review-rating">
                      <span
                          v-for="star in 5"
                          :key="star"
                          class="star"
                          :class="{ filled: star <= review.rating }"
                      >★</span
                      >
                    </span>
        </div>
        <p class="review-text">{{ review.text }}</p>
        <a class="review-link" :href="review.link" target="_blank">
          <span class="link-icon">📍</span>
          Отзыв на 2GIS
        </a>
      </swiper-slide>

    </swiper-container>
  </section>
</template>

<script setup>
import {register} from "swiper/element/bundle";
import {onMounted, ref} from "vue";
import axios, {HttpStatusCode} from "axios";

register();

const props = defineProps({
  quest: Number,
  location: Number,
  count: Number,
  rating: Array
});

let reviews = ref([]);

const loadReviews = async () => {
  try {
    const resp = await axios.get(import.meta.env.VITE_API_URL + "/review/get/", props);
    if (resp.status === HttpStatusCode.Ok && resp.data.status) {
      reviews.value = resp.data.result;
    } else {
      throw new Error("Сервер вернул ошибку");
    }
  } catch (error) {
    console.error(`Ошибка при получении отзывов: ${error}`);
  }
}

let swiperEl;

onMounted(async () => {
  await loadReviews();
  swiperEl = document.querySelector(".swiper-reviews");
  swiperEl.initialize();
})

const goToReview = (idx) => {
  swiperEl.swiper.slideToLoop(idx);
}

</script>

<style scoped>

swiper-container {
  --swiper-theme-color: var(--primary-color) !important;
}

swiper-container::part(pagination) {
  position: static !important;
}

swiper-slide.swiper-slide-active {
  transform: scale(1);
  opacity: 1;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.reviews-container {
  text-align: center;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  margin: 30px auto;
  padding: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.reviews-title {
  font-size: 20px;
  margin-bottom: 15px;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.reviews-title img {
  width: 120px;
}

.review-card {
  display: flex;
  flex-direction: column;
  padding: 15px;
  height: 400px;
  background: #2a2a2a;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease-in-out;
  cursor: pointer;
  opacity: 0.8;
  margin: 20px 0;
  transform: scale(0.85);
  justify-content: space-between;
}

.review-header {
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
}

.review-info {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.review-data {
  display: flex;
  flex-direction: column;
}

.review-avatar {
  width: 40px;
  height: 40px;
  background: #cf1034;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}

.review-name {
  color: white;
}

.review-date {
  font-size: 12px;
  color: #999;
}

.review-rating .star {
  color: #ccc;
  font-size: 18px;
}

.review-rating .star.filled {
  color: #cf1034;
}

.review-text {
  margin-top: 8px;
  font-size: 14px;
  color: #fff;
  margin-bottom: 20px;
  overflow: auto;
}

.review-link {
  color: #869791;
}
@media (max-width: 768px) {
  .reviews-title{
    flex-direction: column;
  }
}
/*




.reviews-container {
  text-align: center;
  padding: 30px 15px;
  background-color: #f9f9f9;
  border-radius: 10px;
  margin: 30px auto;
  width: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.reviews-title {
  font-size: 20px;
  margin-bottom: 15px;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.reviews-title img {
  width: 120px;
}

.review-link {
  align-self: start;
  color: #869791;
  margin-top: auto;
}

.review-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 15px;
  height: 400px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease-in-out;
  cursor: pointer;
  opacity: 0.8;
  margin: 20px 0;
  transform: scale(0.85);
}

.review-header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  position: relative;
}

.review-name {
  color: white;
}

.review-rating .star {
  color: #ccc;
  font-size: 18px;
}

.review-rating .star.filled {
  color: #cf1034;
}

.review-text {
  margin-top: 8px;
  font-size: 14px;
  color: #333;
  margin-bottom: 20px;
  max-height: 400px;
  overflow: auto;
}

@media (max-width: 768px) {
  .reviews-container {
    padding: 20px 10px;
    margin: 20px auto;
  }

  .reviews-title {
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }

  .reviews-title h2 {
    font-size: 18px;
  }

  .reviews-title img {
    width: 100px;
  }

  .review-card {
    padding: 15px;
  }

  .review-header {
    font-size: 14px;
  }

  .review-rating .star {
    font-size: 16px;
  }

  .review-text {
    font-size: 14px;
    margin-bottom: 15px;
  }

  .review-link {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .reviews-container {
    padding: 15px 5px;
    margin: 15px auto;
  }

  .reviews-title h2 {
    font-size: 16px;
  }

  .reviews-title img {
    width: 80px;
  }

  .review-card {
    padding: 12px;
  }

  .review-header {
    font-size: 13px;
  }

  .review-rating .star {
    font-size: 14px;
  }

  .review-text {
    font-size: 13px;
    margin-bottom: 12px;
  }

  .review-link {
    font-size: 11px;
  }
}

@media (max-height: 600px) and (orientation: landscape) {
  .reviews-container {
    padding: 15px 5px;
  }

  .review-card {
    padding: 10px;
  }

  .review-avatar {
    width: 30px;
    height: 30px;
    font-size: 14px;
  }

  .review-name {
    font-size: 13px;
  }

  .review-text {
    font-size: 12px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {

  .reviews-title h2 {
    font-size: 22px;
  }

  .reviews-title img {
    width: 100px;
  }
}

.review-avatar {
  width: 40px;
  height: 40px;
  background: #cf1034;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}

.review-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.review-date {
  font-size: 12px;
  color: #666;
}

.link-icon {
  margin-right: 5px;
}

@media (max-width: 768px) {
  .review-avatar {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }

  .review-name {
    font-size: 14px;
  }

  .review-date {
    font-size: 11px;
  }

  .review-text {
    font-size: 13px;
  }
}

@media (prefers-color-scheme: dark) {
  .review-card {
    background: #2a2a2a;
  }

  .review-date {
    color: #999;
  }

  .review-text {
    color: #fff;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
} */
</style>