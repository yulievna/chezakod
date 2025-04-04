<template>
  <div ref="carouselRef" class="owl-carousel owl-theme">
    <div v-for="(image, index) in images" :key="index" class="item">
      <img :src="image" :alt="'Image ' + (index + 1)">
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel';

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

onMounted(() => {
  nextTick(() => {
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

.owl-carousel{
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

}

.owl-theme .owl-dots .owl-dot span:hover {
  background: #cf1034;
}

.owl-theme .owl-dots .owl-dot.active {
  background: #cf1034;
}
</style>