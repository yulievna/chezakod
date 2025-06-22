<template> <!-- TODO: сделать чтобы не листался за границу -->
  <h1 class="title">Смотри наши видео</h1>
  <div class="video-carousel">
    <button class="arrow left" @click="prevVideo">❮</button>
    <div class="carousel-container" ref="carousel">
      <div
          class="video-item"
          v-for="(video, index) in videos"
          :key="index"
      >
        <video
            :src="video.src"
            autoplay
            muted
            loop
            playsinline
        ></video>
      </div>
    </div>
    <button class="arrow right" @click="nextVideo">❯</button>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";

const videos = [
  {src: import.meta.env.VITE_HOST + "/upload/video/5.mp4"},
  {src: import.meta.env.VITE_HOST + "/kiosk/video/actionkod/Action_Kod_Zhmurki_1min.mp4"},
  {src: import.meta.env.VITE_HOST + "/upload/video/5.mp4"},
  {src: import.meta.env.VITE_HOST + "/kiosk/video/actionkod/Action_Kod_Zhmurki_1min.mp4"},
  {src: import.meta.env.VITE_HOST + "/upload/video/5.mp4"},
];

const carousel = ref(null);
const currentIndex = ref(0);
const videoWidth = 1200;
const gap = 20;

const updateCarousel = () => {
  if (!carousel.value) return;

  const offset = -currentIndex.value * (videoWidth + gap);
  carousel.value.style.transition = "transform 0.5s ease-in-out";
  carousel.value.style.transform = `translateX(${offset}px)`;
};

const nextVideo = () => {
  currentIndex.value = (currentIndex.value + 1) % videos.length;
  updateCarousel();
};

const prevVideo = () => {
  currentIndex.value = (currentIndex.value - 1 + videos.length) % videos.length;
  updateCarousel();
};

onMounted(() => {
  updateCarousel();
});
</script>

<style scoped>
.title {
  color: #CF1034;
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
}

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
  gap: 20px;
}

.video-item {
  width: 1200px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.video-item video {
  width: 100%;
  height: 660px;
  object-fit: cover;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 1;
}

.arrow:hover {
  background: rgba(0, 0, 0, 0.7);
  transform: translateY(-50%) scale(1.1);
}

.arrow.left {
  left: 10px;
}

.arrow.right {
  right: 10px;
}
</style>