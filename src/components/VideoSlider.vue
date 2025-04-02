<template>
  <div class="video-carousel">
    <button class="arrow left" @click="prevVideo">❮</button>
    <div class="carousel-container" ref="carousel">
      <div
          class="video-item"
          v-for="(video, index) in videos"
          :key="index"
          :class="{ active: index === currentIndex }"
      >
        <video
            :src="video.src"
            autoplay
            muted
            loop
            playsinline
            width="100%"
            height="640px"
        ></video>
      </div>
    </div>
    <button class="arrow right" @click="nextVideo">❯</button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

// Данные для видео
const videos = ref([
  { src: "https://chezakod.ru/upload/video/5.mp4" },
  { src: "https://chezakod.ru/kiosk/video/actionkod/Action_Kod_Zhmurki_1min.mp4" },
  { src: "https://chezakod.ru/kiosk/video/partykod/00Башня_Джу_Экшн.mp4" },
  { src: "https://chezakod.ru/kiosk/video/actionkod/Action_Kod_Zhmurki_1min.mp4" },
  { src: "https://chezakod.ru/kiosk/video/partykod/00Башня_Джу_Экшн.mp4" },
]);

// Текущий индекс видео
const currentIndex = ref(0);
const carousel = ref(null);

// Переключение на предыдущее видео
const prevVideo = () => {
  currentIndex.value = (currentIndex.value - 1 + videos.value.length) % videos.value.length;
};

// Переключение на следующее видео
const nextVideo = () => {
  currentIndex.value = (currentIndex.value + 1) % videos.value.length;
};

// Обновление позиции карусели
const updateCarousel = () => {
  if (!carousel.value) return;

  const itemWidth = carousel.value.clientWidth / 2; // Ширина одного видео
  const offset = -currentIndex.value * itemWidth;
  carousel.value.style.transform = `translateX(${offset}px)`;
};

// Следим за изменением currentIndex
watch(currentIndex, updateCarousel);

// Инициализация карусели
onMounted(() => {
  updateCarousel();
  window.addEventListener("resize", updateCarousel); // Обновляем при изменении размера окна
});
</script>

<style scoped>
.video-carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}

.carousel-container {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
  gap: 20px;

}

.video-item {
  flex: 0 0 60%; /* Ширина одного видео */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease-in-out;
  opacity: 0.5;
}

.video-item.active {
  opacity: 1; /* Центральное видео полностью видимо */
}

.video-item video {
  width: 100%;
  max-width: 1280px;
  height: 660px;
  border: none;
  border-radius: 10px;
  object-fit: cover; /* Чтобы видео заполняло контейнер */
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 24px;
  z-index: 10;
}

.arrow.left {
  left: 10px;
}

.arrow.right {
  right: 10px;
}

/* Адаптив для мобильных устройств */
@media (max-width: 768px) {
  .video-item {
    flex: 0 0 100%; /* На мобильных устройствах показываем одно видео */
  }

  .video-item:not(.active) {
    display: none; /* Скрываем неактивные видео */
  }

  .arrow {
    font-size: 18px;
    padding: 8px;
  }
}
</style>