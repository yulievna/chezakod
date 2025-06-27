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
        >
      </div>
    </swiper-slide>
  </swiper-container>
</template>

<script setup>
import {useRouter} from '@/composables/useRouter.js';
import {register} from "swiper/element/bundle";

register();

const router = useRouter();

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
  }
});

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