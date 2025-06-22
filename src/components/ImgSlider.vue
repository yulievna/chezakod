<template> <!-- TODO: привести к единому виду, добавить точечки или стрелки везде -->
  <swiper-container
      :pagination="{
        clickable: true
      }"
      class="swiper-slider"
      loop="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }"
  >
    <swiper-slide
        v-for="(image, index) in images"
        :key="index"
        class="item"
    >
      <img
          :src="isPromoSlider ? image.src : image"
          :alt="isPromoSlider ? image.alt : 'Image' + (index + 1)"
          style="cursor: pointer"
          class="swiper-image"
      >
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