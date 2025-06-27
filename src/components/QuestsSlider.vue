<template> <!-- TODO: пофиксить пролистывание картинок -->
  <!--  <div :ref="setCarouselRef" :class="`owl-carousel owl-theme carousel-${uniqueId}`">-->
  <!--    <div v-for="(image, index) in images" :key="index" class="quest-item">-->
  <!--      <img :src="image" :alt="'Image ' + (index + 1)">-->
  <!--    </div>-->
  <!--  </div>-->

  <swiper-container
      class="swiper-quest"
      :allowTouchMove="true"
      :breakpoints="{
        768: {
          allowTouchMove: false,
          speed: 1000
        }
      }"
      :pagination="true"
      @mousemove="handleMouseMove"
      @mouseleave="resetImage"
      @swiperinit="swiperInit"
  >
    <swiper-slide
        v-for="(image, index) in images" :key="index" class="quest-item"
    >
      <img :src="image" :alt="'Image ' + (index + 1)">
    </swiper-slide>
  </swiper-container>

</template>

<script setup>
import {register} from "swiper/element/bundle";
import {onMounted, ref} from "vue";

register();

// Определяем пропсы
const props = defineProps({
  images: {
    type: Array,
    required: true,
    validator: (value) => value.every((item) => typeof item === 'string'),
  },
});

let idx = ref(0);

// let images = ref(props.images.map((i) => ({
//   src: i
//
// })));

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

const resetImage = (event) => {
  idx.value = 0;
}

//
// // Уникальный идентификатор для каждой карусели
// const uniqueId = ref(`carousel-${Math.random().toString(36).substr(2, 9)}`);
// const carouselRef = ref(null);
//
// // Функция для установки ref
// const setCarouselRef = (el) => {
//   carouselRef.value = el;
// };
//
// onMounted(async () => {
//   await nextTick();
//   await import('owl.carousel/dist/assets/owl.carousel.css');
//   await import('owl.carousel/dist/assets/owl.theme.default.css');
//   await import('owl.carousel');
//   if (carouselRef.value) {
//     const owl = $(carouselRef.value).owlCarousel({
//       loop: true,
//       margin: 0,
//       nav: false,
//       dots: true,
//       autoplay: false,
//       autoplayTimeout: 4000,
//       autoplayHoverPause: true,
//       items: 1,
//     });
//
//     // Добавляем обработчики для точек навигации только для текущей карусели
//     $(carouselRef.value).find('.owl-dot').each(function (index) {
//       $(this).hover(
//           function () {
//             owl.trigger('to.owl.carousel', [index, 300]); // Переключаем слайд
//           }
//       );
//     });
//   }
// });
</script>

<style scoped>

swiper-container {
  --swiper-theme-color: white !important;
  --swiper-pagination-bullet-inactive-color: white;
  --swiper-pagination-top: 10px;
}

.quest-item img {
  width: 100%; /* Картинка занимает всю ширину контейнера */
  height: 500px; /* Картинка занимает всю высоту контейнера */
  object-fit: cover; /* Картинка заполняет контейнер без искажений */
  border-radius: 0;
}
</style>