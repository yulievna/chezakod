<template>
  <section class="reviews-container">
    <div class="reviews-title">
      <h2>Отзывы наших клиентов на </h2>
      <img class="gis" src="/src/assets/Light_ENG2x.png" alt="">
    </div>

    <div class="carousel-container">
      <button class="arrow left" @click="prevReview">❮</button>

      <div class="reviews-wrapper" ref="carousel">
        <div
          class="review-card"
          v-for="(review, index) in duplicatedReviews"
          :key="index"
        >
          <div class="review-header">
            <span class="review-name">{{ review.name }}</span>
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
        </div>
      </div>

      <button class="arrow right" @click="nextReview">❯</button>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  name: "ReviewsCarousel",
  setup() {
    const reviews = ref([
      {
        name: "Никита",
        rating: 5,
        text: "Пятого дня, по совету проверенных камрадов, прошли квест 'Логос'. Ощущения - атас. Прошли за чуть больше часа: задания на подумать, проявить своё внимание и смекалку. Чудесный администратор, всегда поможет, если где-нибудь застряли. Советуем всей компанией.",
      },
      {
        name: "Виктория",
        rating: 5,
        text: "Была на квесте «Петля времени» очень понравился! Очень хороший антураж, сама локация, загадки! Написано 14+ но и взрослого человека затянет! Сама локация уютненькая, приятная девушка администратор приветливо встретила, все объяснила, и впустила в квест) туалет с музыкой вообще шикарен!",
      },
      {
        name: "Данил",
        rating: 5,
        text: "Квесты супер. Все понравилось. Было великолепно. Очень надеюсь, что смогу найти время прийти на квест снова.",
      },
      {
        name: "Степан",
        rating: 4,
        text: "Ну ниче так",
      },
      {
        name: "Юрий",
        rating: 5,
        text: "Очень понравилось! Были приглашены на детский день рождения, оказалось участвовать интересно и взрослым. Однозначно рекомендую! Единственное пожелание: заменить баскетбольные мячи на резиновые, а то такими не только ребенка можно покалечить, но и взрослого.",
      },
      {
        name: "Максим",
        rating: 5,
        text: "В очередной раз приехали семьёй на квест. Все очень понравилось. Приедем вновь)",
      },
      {
        name: "Яна",
        rating: 4,
        text: "Интересный квест, было страшно и смешно. Придем еще! От всей души посмеялись, хотелось бы новых квестов.",
      },
      {
        name: "Виктор",
        rating: 5,
        text: "Вчера был с классом на 'жмурках'. Сказать что мне понравилось - ничего не сказать. Какая атмосфера! Красота! Особенно 200 квадратных метров в темноте... В общем, КЛАССНО!",
      },
    ]);

    // Дублируем отзывы для бесконечной карусели
    const duplicatedReviews = ref([...reviews.value, ...reviews.value]);

    const currentIndex = ref(0);
    const carousel = ref(null);
    let startX = 0;
    let isDragging = false;
    let currentTranslate = 0;

    const updateTranslate = () => {
      const itemWidth = carousel.value.clientWidth / 2.2; // 40% боковых
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

    const handleMouseDown = (event) => {
      isDragging = true;
      startX = event.clientX;
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

    onMounted(() => {
      updateTranslate();
      carousel.value.addEventListener("mousedown", handleMouseDown);
      carousel.value.addEventListener("mousemove", handleMouseMove);
      carousel.value.addEventListener("mouseup", handleMouseUp);
      carousel.value.addEventListener("mouseleave", handleMouseUp);
    });

    onUnmounted(() => {
      carousel.value.removeEventListener("mousedown", handleMouseDown);
      carousel.value.removeEventListener("mousemove", handleMouseMove);
      carousel.value.removeEventListener("mouseup", handleMouseUp);
      carousel.value.removeEventListener("mouseleave", handleMouseUp);
    });

    return {
      reviews,
      duplicatedReviews,
      currentIndex,
      carousel,
      nextReview,
      prevReview,
    };
  },
};
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
.reviews-title img{
  width: 120px;
}
.carousel-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
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
  color: #000;
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
  .review-card {
    width: 50%;
    flex: 0 0 50%;
  }

  .arrow {
    font-size: 24px;
  }

  .arrow.left {
    left: 5px;
  }

  .arrow.right {
    right: 5px;
  }
}
</style>