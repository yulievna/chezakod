<template> <!-- TODO: привести к единому виду, добавить точечки или стрелки везде -->
  <swiper-container
      :pagination="props.pagination ? {
        clickable: props.paginationClickable
      } : false"
      class="swiper-slider"
      :zoom="true"
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
      <div class="swiper-zoom-container">
        <img
            :src="isPromoSlider ? image.src : image"
            :alt="isPromoSlider ? image.alt : 'Image' + (index + 1)"
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