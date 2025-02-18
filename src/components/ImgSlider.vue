<template>
    <div class="owl-carousel">
      <div class="item"><img src="../assets/korporativ.jpg" alt="Image 1"></div>
      <div class="item"><img src="../assets/sl2.jpg" alt="Image 2"></div>
      <div class="item"><img src="../assets/sl3.jpg" alt="Image 3"></div>
      <!-- Добавьте дополнительные элементы с изображениями или контентом -->
    </div>
  </template>
  
  <script>
  import { onMounted } from 'vue';
  import 'owl.carousel/dist/assets/owl.carousel.css';
  import 'owl.carousel';
  export default {
    name: 'OwlCarouselComponent',
    setup() {
      onMounted(() => {
        // Инициализация Owl Carousel
        $(document).ready(function () {
          $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            items: 1,
            mouseDrag: false, // Отключаем стандартный drag
            autoplay: true, // Автопрокрутка
            autoplayTimeout: 3000, // Время задержки между прокрутками
            autoplayHoverPause: true, // Приостанавливать автопрокрутку при наведении
          });
          $(carouselRef.value).on('mouseover', function() {
            $(this).trigger('next.owl.carousel');
            });
        $(carouselRef.value).on('mouseleave', function() {
            $(this).trigger('stop.owl.autoplay');
        });
        });
      });
    }
  };
  </script>
  
  <style scoped>
  /* Если нужно, добавьте свои стили для карусели */
  .owl-carousel .item {
    width: fit-content;
    height: fit-content;
  }
  </style>