<template> <!-- TODO: пофиксить пролистывание картинок -->
  <div :ref="setCarouselRef" :class="`owl-carousel owl-theme carousel-${uniqueId}`">
    <div v-for="(image, index) in images" :key="index" class="quest-item">
      <img :src="image" :alt="'Image ' + (index + 1)">
    </div>
  </div>
</template>

<script setup>
import {nextTick, onMounted, ref} from 'vue';

// Определяем пропсы
const props = defineProps({
  images: {
    type: Array,
    required: true,
    validator: (value) => value.every((item) => typeof item === 'string'),
  },
});

// Уникальный идентификатор для каждой карусели
const uniqueId = ref(`carousel-${Math.random().toString(36).substr(2, 9)}`);
const carouselRef = ref(null);

// Функция для установки ref
const setCarouselRef = (el) => {
  carouselRef.value = el;
};

onMounted(async () => {
  await nextTick();
  await import('owl.carousel/dist/assets/owl.carousel.css');
  await import('owl.carousel/dist/assets/owl.theme.default.css');
  await import('owl.carousel');
  if (carouselRef.value) {
    const owl = $(carouselRef.value).owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      dots: true,
      autoplay: false,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      items: 1,
    });

    // Добавляем обработчики для точек навигации только для текущей карусели
    $(carouselRef.value).find('.owl-dot').each(function (index) {
      $(this).hover(
          function () {
            owl.trigger('to.owl.carousel', [index, 300]); // Переключаем слайд
          }
      );
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

.owl-carousel .quest-item {
  width: 100%; /* Занимает всю ширину слайдера */
  height: 100%; /* Занимает всю высоту слайдера */
  display: flex;
  align-items: center;
  justify-content: center;
}

.quest-item img {
  width: 100%; /* Картинка занимает всю ширину контейнера */
  height: 500px; /* Картинка занимает всю высоту контейнера */
  object-fit: cover; /* Картинка заполняет контейнер без искажений */
  border-radius: 0px;
}

.owl-theme .owl-dots {
  display: grid;
  position: absolute;
  top: -10px;
  left: 0;
  grid-template-columns: repeat(auto-fit, minmax(10px, 1fr));
  grid-auto-rows: 1fr; /* Все строки одинаковой высоты */
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 10;
}

.owl-theme .owl-dots .owl-dot {
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-backface-visibility: visible;
  transition: opacity 200ms ease;
  padding-top: 70px;
}

.owl-theme .owl-dots .owl-dot span:hover {
  background: #cf1034;
}

.owl-theme .owl-dots .owl-dot.active {
  background: #cf1034;
}
</style>