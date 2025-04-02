<template>
    <div class="carousel-container">
      <div ref="videoCarouselRef" class="owl-carousel video-carousel">
        <div class="item" v-for="(video, index) in videos" :key="index">
          <div class="video-container">
            <video
              :src="video.src"
              controls
              muted
              preload="metadata"
              @mouseenter="handleMouseEnter"
            ></video>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, ref, nextTick } from 'vue';
  import $ from 'jquery';
  import 'owl.carousel/dist/assets/owl.carousel.css';
  import 'owl.carousel';
  
  export default {
    name: 'VideoCarousel',
    setup() {
      const videoCarouselRef = ref(null);
      const videos = ref([
        { src: "https://chezakod.ru/upload/video/5.mp4" },
        { src: "https://chezakod.ru/kiosk/video/actionkod/Action_Kod_Zhmurki_1min.mp4" },
        { src: "https://chezakod.ru/kiosk/video/partykod/00Башня_Джу_Экшн.mp4" },
        { src: "https://chezakod.ru/kiosk/video/actionkod/Action_Kod_Zhmurki_1min.mp4" },
        { src: "https://chezakod.ru/kiosk/video/partykod/00Башня_Джу_Экшн.mp4" },
      ]);
  
      onMounted(async () => {
        await nextTick(); // Ждем обновления DOM
        if (videoCarouselRef.value) {
          $(videoCarouselRef.value).owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            center: true,
            items: 3,
            autoWidth: false,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            autoplay: false,
            video: true,
            lazyLoad: true,
            responsive: {
              0: { items: 1 },
              600: { items: 2 },
              1000: { items: 3 }
            }
          });
  
          $(videoCarouselRef.value).on('translated.owl.carousel', function () {
            $(".owl-item").removeClass("center");
            $(".owl-item.active").eq(1).addClass("center");
  
            $("video").each((_, video) => video.pause());
            const activeVideo = $(".owl-item.center video")[0];
            if (activeVideo) {
              activeVideo.play();
            }
          });
        }
      });
  
      const handleMouseEnter = (event) => {
        event.target.play();
      };
      
      return { videoCarouselRef, videos, handleMouseEnter };
    }
  };
  </script>
  
  <style scoped>
  /* Контейнер карусели */
  .carousel-container {
    width: 1280px;
    margin: 0 auto;
  }
  /* Карусель */
.owl-carousel {
  position: relative; /* Устанавливаем позицию контейнера карусели */
  width: 100%;
  height: 60vh; /* Высота карусели */
}
  /* Контейнер для видео */
  .video-container {
    width: 100%; /* Все видео одной ширины */
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 7.5px;
  }
  
  .video-container {
  width: 100%; /* Видео занимает всю ширину контейнера */
  height: 100%; /* Фиксируем высоту */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Обрезаем выходящие части */
}

/* Видео */
.video-container video {
  width: 100%;
  height: auto; /* Поддерживаем пропорции */
  aspect-ratio: 16/9; /* Принудительное соотношение сторон */
  object-fit: cover; /* Обрезаем лишнее, чтобы видео заполнило контейнер */
}
  </style>
  