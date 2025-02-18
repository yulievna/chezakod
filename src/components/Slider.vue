<template>
  <div class="slider">
    <div class="slider__wrapper">
      <swiper-container ref="mainSlider" class="slider__main" init="false" @swiperslidechange="onSlideChange">
        <swiper-slide v-for="id in imageIds" :key="id">
          <img class="slider__img" :src="getImageUrl(id)" alt="" />
        </swiper-slide>
      </swiper-container>
      <div class="slider__arrows">
        <button class="slider__arrow" type="button" @click="mainSlider.swiper.slidePrev()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20" height="20" viewBox="0 0 20 20">
            <path stroke="currentColor" d="m13.5 17-7-7 7-7"/>
          </svg>
        </button>
        <button class="slider__arrow" type="button" @click="mainSlider.swiper.slideNext()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20" height="20" viewBox="0 0 20 20">
            <path stroke="currentColor" d="m6.5 3 7 7-7 7"/>
          </svg>
        </button>
      </div>
      <div class="slider__pagination">
        <div class="slider__bullet" :class="{ 'slider__bullet--active': idx === activeSlide }" :style="`left: ${-18 * activeSlide + 36}px`" v-for="(_, idx) in imageIds.length" :key="idx" />
      </div>
    </div>
    <swiper-container ref="thumbsSlider" class="slider__thumbs" init="false">
      <!-- <swiper-slide class="slider__thumb" v-for="id in imageIds" :key="id">
        <img class="slider__img" :src="getImageUrl(id)" alt="" />
      </swiper-slide> -->
    </swiper-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { register } from "../../node_modules/swiper/element.js";
import { Thumbs, FreeMode } from "swiper";
register()

const mainSlider = ref()
const thumbsSlider = ref()
const activeSlide = ref(0)

const mainSliderParams = {
  modules: [Thumbs],
  rewind: true,
  spaceBetween: 4,
  speed: 500,
  thumbs: { swiper: '.slider__thumbs' }
}

const thumbsSliderParams = {
  modules: [FreeMode],
  slidesPerView: 4,
  spaceBetween: 4,
  freeMode: true,
  loop: true,
  watchSlidesProgress: true,
}

onMounted(() => {
  Object.assign(mainSlider.value, mainSliderParams)
  mainSlider.value.initialize()

  Object.assign(thumbsSlider.value, thumbsSliderParams)
  thumbsSlider.value.initialize()
})

const imageIds = [1, 2, 3, 4, 5]

const getImageUrl = (id) => `src/assets/sl${id}.jpg`
const onSlideChange = () => (activeSlide.value = mainSlider.value.swiper.activeIndex)
</script>

<style lang="scss" scoped>
  body {
    padding: clamp(16px, 3vw, 32px); 
  }
  
  .slider {  
    &__wrapper {
      position: relative;
    }
  
    &__main {
      margin-bottom: 4px;
    }
  
    &__arrows {
      position: absolute;
      inset: 24px;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  
    &__arrow {
      display: grid;
      place-content: center;
      width: 40px;
      aspect-ratio: 1;
      background: #CF1034;
      cursor: pointer;
      border-radius: 4px;
      border: none;
    }
  
    &__pagination {
      position: absolute;
      inset: auto 0 24px;
      z-index: 1;
      display: grid;
      grid-auto-flow: column;
      place-self: center;
      gap: 8px;
      width: 82px;
      overflow: hidden;
    }
  
    &__bullet {
      flex-shrink: 0;
      position: relative;
      width: 10px;
      aspect-ratio: 1;
      background: #c57d7d;
      border-radius: 50%;
      transition: 0.25s;
      transition-property: transform, background, left;
      transform: scale(0.33);
  
      &:has(+ .slider__bullet--active) {
        transform: scale(0.66);
      }
  
      &--active {
        transform: scale(1);
        background: #CF1034;
  
        & + * {
          transform: scale(0.66);
        }
      }
    }
  
    &__thumb {
      opacity: 0.3;
      transition: opacity 0.25s;
  
      &:hover {
        opacity: 0.6;
      }
  
      &.swiper-slide-thumb-active {
        opacity: 1;
      }
    }
  
    &__img {
      display: block;
      width: 100%;
      aspect-ratio: 16/9;
      object-fit: cover;
    }
  }
</style>