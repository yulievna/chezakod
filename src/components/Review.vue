<template> <!-- TODO: загрузка отзывов из БД, фикс анимаций -->
  <section class="reviews-container">
    <div class="reviews-title">
      <h2>Отзывы наших клиентов на </h2>
      <img class="gis" src="@/assets/images/Light_ENG2x.png" alt="2GIS" loading="lazy"/>
    </div>

    <div class="carousel-container">
      <button class="arrow left" @click="prevReview" aria-label="Previous review">
        <span class="arrow-icon">❮</span>
      </button>

      <div class="reviews-wrapper" ref="carousel">
        <div
            class="review-card active"
            v-for="(review, index) in duplicatedReviews"
            :key="index"
        >
          <div class="review-header">
            <div class="review-avatar">
              {{ review.user.charAt(0) }}
            </div>
            <div class="review-info">
              <span class="review-name">{{ review.user }}</span>
              <span class="review-date">{{ review.date }}</span>
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
          <a class="review-link" href="{{ review.link }}" target="_blank">
            <span class="link-icon">📍</span>
            Отзыв на 2GIS
          </a>
        </div>
      </div>

      <button class="arrow right" @click="nextReview" aria-label="Next review">
        <span class="arrow-icon">❯</span>
      </button>
    </div>

    <div class="carousel-dots">
      <button
          v-for="(_, index) in reviews"
          :key="index"
          class="dot"
          :class="{ active: currentIndex === index }"
          @click="goToReview(index)"
          :aria-label="'Go to review ' + (index + 1)"
      ></button>
    </div>
  </section>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import axios, {HttpStatusCode} from "axios";

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
      duplicatedReviews.value = [...reviews.value, ...reviews.value];
    } else {
      throw new Error("Сервер вернул ошибку");
    }
  } catch (error) {
    console.error(`Ошибка при получении отзывов: ${error}`);
  }
}

const duplicatedReviews = ref([]);
const currentIndex = ref(0);
const carousel = ref(null);
let startX = 0;
let isDragging = false;
let currentTranslate = 0;
let autoplayInterval = null;

const updateTranslate = () => {
  const itemWidth = carousel.value.clientWidth / 2.2;
  currentTranslate = -currentIndex.value * itemWidth;
  carousel.value.style.transform = `translateX(${currentTranslate}px)`;
};

const nextReview = () => {
  currentIndex.value++;
  if (currentIndex.value >= reviews.value.length) {
    setTimeout(() => {
      currentIndex.value = 0;
      carousel.value.style.transition = "none";
      updateTranslate();
    }, 300);
  }
  carousel.value.style.transition = "transform 0.4s ease";
  updateTranslate();
};

const prevReview = () => {
  if (currentIndex.value === 0) {
    currentIndex.value = reviews.value.length;
    carousel.value.style.transition = "none";
    updateTranslate();
    setTimeout(() => {
      currentIndex.value--;
      carousel.value.style.transition = "transform 0.4s ease";
      updateTranslate();
    }, 50);
  } else {
    currentIndex.value--;
    carousel.value.style.transition = "transform 0.4s ease";
    updateTranslate();
  }
};

const goToReview = (index) => {
  currentIndex.value = index;
  carousel.value.style.transition = "transform 0.4s ease";
  updateTranslate();
};

const selectReview = (index) => {
  goToReview(index);
};

const handleMouseDown = (event) => {
  isDragging = true;
  startX = event.clientX;
  carousel.value.style.transition = "none";
};

const handleMouseMove = (event) => {
  if (!isDragging) return;
  const moveX = event.clientX - startX;
  carousel.value.style.transform = `translateX(${currentTranslate + moveX}px)`;
};

const handleMouseUp = (event) => {
  if (!isDragging) return;
  isDragging = false;
  const moveX = event.clientX - startX;

  if (moveX < -50) nextReview();
  if (moveX > 50) prevReview();
  updateTranslate();
};

const handleTouchStart = (event) => {
  startX = event.touches[0].clientX;
  isDragging = true;
  carousel.value.style.transition = "none";
};

const handleTouchMove = (event) => {
  if (!isDragging) return;
  const moveX = event.touches[0].clientX - startX;
  carousel.value.style.transform = `translateX(${currentTranslate + moveX}px)`;
};

const handleTouchEnd = (event) => {
  if (!isDragging) return;
  isDragging = false;
  const moveX = event.changedTouches[0].clientX - startX;

  if (moveX < -50) nextReview();
  if (moveX > 50) prevReview();
  updateTranslate();
};

const startAutoplay = () => {
  autoplayInterval = setInterval(nextReview, 5000);
};

const stopAutoplay = () => {
  clearInterval(autoplayInterval);
};

onMounted(async () => {
  await loadReviews();
  updateTranslate();
  carousel.value.addEventListener("mousedown", handleMouseDown);
  carousel.value.addEventListener("mousemove", handleMouseMove);
  carousel.value.addEventListener("mouseup", handleMouseUp);
  carousel.value.addEventListener("mouseleave", handleMouseUp);
  carousel.value.addEventListener("touchstart", handleTouchStart);
  carousel.value.addEventListener("touchmove", handleTouchMove);
  carousel.value.addEventListener("touchend", handleTouchEnd);
  // startAutoplay();
});

// onUnmounted(() => {
//   carousel.value.removeEventListener("mousedown", handleMouseDown);
//   carousel.value.removeEventListener("mousemove", handleMouseMove);
//   carousel.value.removeEventListener("mouseup", handleMouseUp);
//   carousel.value.removeEventListener("mouseleave", handleMouseUp);
//   carousel.value.removeEventListener("touchstart", handleTouchStart);
//   carousel.value.removeEventListener("touchmove", handleTouchMove);
//   carousel.value.removeEventListener("touchend", handleTouchEnd);
//   stopAutoplay();
// });
</script>

<style scoped>
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

.carousel-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.review-link {
  align-self: start;
  color: #869791;
  margin-top: auto;
}

.reviews-wrapper {
  display: flex;
  gap: 15px;
  transition: transform 0.4s ease;
  cursor: grab;
  padding: 10px 0;
  width: 70%;
}

.review-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  width: 33.33%;
  flex: 0 0 33.33%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease-in-out;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
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
}

/* Стрелки */
.arrow {
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  transition: 0.3s ease;
  color: #cf1034;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  opacity: 0.7;
}

.arrow:hover {
  opacity: 1;
  color: #d41a40;
}

.arrow.left {
  left: 10px;
}

.arrow.right {
  right: 10px;
}

/* Адаптив для мобильных устройств */
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

  .carousel-container {
    padding: 0 10px;
  }

  .reviews-wrapper {
    width: 100%;
    padding: 10px 0;
  }

  .review-card {
    width: 100%;
    flex: 0 0 100%;
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

  .arrow {
    font-size: 20px;
    opacity: 0.8;
  }

  .arrow.left {
    left: 0;
  }

  .arrow.right {
    right: 0;
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

  .arrow {
    font-size: 18px;
  }
}

/* Добавляем поддержку ландшафтной ориентации */
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

/* Улучшаем отображение на планшетах */
@media (min-width: 769px) and (max-width: 1024px) {
  .review-card {
    width: 50%;
    flex: 0 0 50%;
  }

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

.review-card {
  cursor: pointer;
  transition: all 0.3s ease;
  transform: scale(0.95);
  opacity: 0.8;
}

.review-card:hover {
  transform: scale(1);
  opacity: 1;
}

.review-card.active {
  transform: scale(1);
  opacity: 1;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.arrow-icon {
  font-size: 24px;
  transition: transform 0.3s ease;
}

.arrow:hover .arrow-icon {
  transform: scale(1.2);
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ddd;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.dot:hover {
  background: #cf1034;
  transform: scale(1.2);
}

.dot.active {
  background: #cf1034;
  transform: scale(1.2);
}

.link-icon {
  margin-right: 5px;
}

/* Улучшенная адаптивность */
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

  .arrow-icon {
    font-size: 20px;
  }

  .dot {
    width: 8px;
    height: 8px;
  }
}

/* Добавляем поддержку тёмной темы */
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

  .dot {
    background: #444;
  }

  .dot:hover,
  .dot.active {
    background: #cf1034;
  }
}

/* Улучшаем доступность */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>