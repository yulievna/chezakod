<template> <!-- TODO: сделать чтобы не листался за границу -->
  <h1 class="title">Смотри наши видео</h1>
  <swiper-container
      :loop="true"
      :navigation="true"
      :pagination="true"
      :slidesPerView="'auto'"
      :centeredSlides="true"
      :centeredSlidesBounds="true"
      @swiperinit="onSwiperInit"
      @swiperslidechange="handleSlideChange"
  >
    <swiper-slide
        class="video-item"
        v-for="(video, index) in videos"
        :key="index"
    >
      <video
          :ref="el => videoRefs[index] = el"
          :src="video.src"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
      ></video>
    </swiper-slide>
  </swiper-container>
</template>

<script setup>
import {register} from 'swiper/element/bundle';
import {ref} from "vue";

register();

const videos = ref([
  {src: import.meta.env.VITE_HOST + "/upload/video/5.mp4"},
  {src: import.meta.env.VITE_HOST + "/kiosk/video/actionkod/Action_Kod_Zhmurki_1min.mp4"},
  {src: import.meta.env.VITE_HOST + "/kiosk/video/actionkod/2party.mp4"},
  {src: import.meta.env.VITE_HOST + "/kiosk/video/actionkod/лето.MP4"},
  {src: import.meta.env.VITE_HOST + "/kiosk/video/actionkod/7 years.mp4"},
]);

const videoRefs = [];

function onSwiperInit(event) {
  playActiveOnly(event.detail[0]);
}

function handleSlideChange(event) {
  playActiveOnly(event.detail[0]);
}

function playActiveOnly(swiperInstance) {
  const activeIndex = swiperInstance.realIndex;
  videos.value.forEach((_, index) => {
    const videoEl = videoRefs[index];
    if (!videoEl) return;
    if (index === activeIndex) {
      videoEl.play().catch(() => {
      });
    } else {
      videoEl.pause();
      videoEl.currentTime = 0;
    }
  });
}

</script>

<style scoped>

.video-item {
  width: 90%;
  max-width: 1500px;
  border-radius: 20px;
  aspect-ratio: 16 / 9;
  transition: transform 0.4s ease, filter 0.4s ease;
  position: relative;
}

.video-item video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  background: color-mix(in srgb, var(--primary-color), transparent 90%);
}

swiper-container {
  --swiper-theme-color: var(--primary-color) !important;
}

swiper-slide:not(.swiper-slide-active) {
  transform: scale(0.65);
  filter: brightness(0.3);
}

/* .title {
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
} */
</style>