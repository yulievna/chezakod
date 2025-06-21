<template>
  <div ref="carouselRef" class="owl-carousel owl-theme">
    <div v-for="(image, index) in images" :key="index" class="item">
      <img
          :src="isPromoSlider ? image.src : image"
          :alt="isPromoSlider ? image.alt : 'Image ' + (index + 1)"
          @click="handleImageClick(index)"
          style="cursor: pointer;"
      >
    </div>
  </div>
</template>

<script setup>
import {nextTick, onMounted, ref} from 'vue';
import {useRouter} from '@/composables/useRouter.js';

const router = useRouter();

// Определяем пропсы
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

// Уникальный идентификатор для каждой карусели
const uniqueId = ref(`carousel-${Math.random().toString(36).substr(2, 9)}`);
const carouselRef = ref(null);

const handleImageClick = (index) => {
  if (props.isPromoSlider && props.images[index] && props.images[index].id) {
    const promotionId = props.images[index].id;
    router.push({path: '/promotions', hash: `#${promotionId}`});
  }
};

const setCarouselRef = (el) => {
  carouselRef.value = el;
};

onMounted(async () => {
  await nextTick();
  await import('owl.carousel/dist/assets/owl.carousel.css');
  await import('owl.carousel/dist/assets/owl.theme.default.css');
  await import('owl.carousel');
  if (carouselRef.value) {
    $(carouselRef.value).owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      items: 1,
    });

    // Добавляем обработчики для точек навигации только для текущей карусели
    $(carouselRef.value).find('.owl-dot').each(function (index) {
      $(this).hover(
          function () {
            const owl = $(this).closest('.owl-carousel').owlCarousel();
            owl.trigger('to.owl.carousel', [index, 300]); // Переключаем слайд
          }
      );
      $(this).click(
          function () {
            const promotionId = props.images[index].id;
            router.push({path: '/promotions', hash: `#${promotionId}`});
          }
      )
    });
  }
});
</script>

<style>
/* Обычные стили карусели */
.owl-carousel {
  width: 100%; /* Занимает всю ширину контейнера */
  height: 100%; /* Занимает всю высоту контейнера */
}

.owl-carousel .item {
  width: 100%; /* Занимает всю ширину слайдера */
  height: 100%; /* Занимает всю высоту слайдера */
  display: flex;
  align-items: center;
  justify-content: center;
}

.owl-carousel img {
  width: 100%; /* Картинка занимает всю ширину контейнера */
  height: 100%; /* Картинка занимает всю высоту контейнера */
  object-fit: cover; /* Картинка заполняет контейнер без искажений */
  border-radius: 10px;
}

.owl-carousel {
  height: fit-content;
  object-fit: cover;
}

.owl-carousel .item {
  text-align: center;
  width: 100%;
  height: fit-content;
}

.owl-carousel img {
  max-width: 100%;
  min-height: 176px;
  border-radius: 10px;
  z-index: 10;
}

.owl-theme .owl-dots {
  display: grid;
  position: absolute;
  top: -10px;
  left: 0;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-auto-rows: 1fr; /* Все строки одинаковой высоты */
  width: 100%;
  height: 100%;
  border-radius: 10px;
  opacity: 0;
  border-radius: 10px;

}

.owl-theme .owl-dots .owl-dot {
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-backface-visibility: visible;
  transition: opacity 200ms ease;
  padding-top: 70px;
  border-radius: 10px;
  height: fit-content;

}

.owl-theme .owl-dots .owl-dot span:hover {
  background: #cf1034;
}

.owl-theme .owl-dots .owl-dot.active {
  background: #cf1034;
}
</style>