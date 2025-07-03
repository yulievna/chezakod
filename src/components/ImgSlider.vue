<template> <!-- TODO: привести к единому виду, добавить точечки или стрелки везде -->
  <swiper-container
      :pagination="props.pagination ? {
        clickable: props.paginationClickable
      } : false"
      class="swiper-slider"
      :zoom="!props.isPromoSlider"
      :loop="props.loop"
      :autoplay="props.autoplay ? {
        delay: props.autoplayDelay,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      } : false"
      :navigation="props.navigation"
      @swiperinit="swiperInit"
      @mousemove="props.slideByHover ? handleMouseMove($event) : null"
      :speed="1000"
  >
    <swiper-slide
        v-for="(image, index) in images"
        :key="index"
        class="item"
    >
      <router-link v-if="props.isPromoSlider" :to="`/action#action-${image.id}`">
        <img
            :src="image.src"
            :alt="image.alt"
            style="cursor: pointer"
            class="swiper-image"
            loading="lazy"
        >
      </router-link>
      <template v-else-if="props.isBanner">
        <a :href="image.link.url" v-if="image.link.url && image.link.is_out" target="_blank">
          <img
              :src="image.src"
              :alt="image.alt"
              style="cursor: pointer"
              class="swiper-image"
              loading="lazy"
          >
        </a>
        <router-link v-else-if="image.link.url" :to="image.link.url">
          <img
              :src="image.src"
              :alt="image.alt"
              style="cursor: pointer"
              class="swiper-image"
              loading="lazy"
          >
        </router-link>
        <div v-else>
          <img
              :src="image.src"
              :alt="image.alt"
              style="cursor: pointer"
              class="swiper-image"
              loading="lazy"
          >
        </div>
      </template>
      <div class="swiper-zoom-container" v-else>
        <img
            :src="image"
            :alt="'Image' + (index + 1)"
            style="cursor: pointer"
            class="swiper-image"
            loading="lazy"
        >
      </div>
    </swiper-slide>
  </swiper-container>
</template>

<script setup>
import {register} from "swiper/element/bundle";
import {ref} from "vue";

register();

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  isPromoSlider: {
    type: Boolean,
    default: false
  },
  loop: {
    type: Boolean,
    default: true
  },
  navigation: {
    type: Boolean,
    default: false
  },
  pagination: {
    type: Boolean,
    default: true
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  autoplayDelay: {
    type: Number,
    default: 3000
  },
  paginationClickable: {
    type: Boolean,
    default: true
  },
  slideByHover: {
    type: Boolean,
    default: false
  },
  isBanner: {
    type: Boolean,
    default: false
  }
});

let idx = ref(0);

let swiperEl;

const swiperInit = (event) => {
  swiperEl = event.detail[0];
}

const handleMouseMove = (event) => {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left; // Положение мыши внутри карточки
  const width = rect.width;

  const zone = Math.floor((x / width) * props.images.length);
  if (idx.value !== zone) {
    idx.value = zone;
    swiperEl.slideTo(zone);
  }
}

</script>

<style>

.swiper-image {
  width: 100%;
  height: 100%;
  object-fit: cover;

}

swiper-container {
  width: 100%;
  height: 100%;
  --swiper-theme-color: #fff !important;
}

</style>