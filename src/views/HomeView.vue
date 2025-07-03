<script setup>

import discount1 from '@/assets/images/discount1.jpg?w=1000&format=webp';
import discount2 from '@/assets/images/discount2.jpg?w=1000&format=webp';
import discount3 from '@/assets/images/discount3.jpg?w=1000&format=webp';
import discount4 from '@/assets/images/discount4.jpg?w=1000&format=webp';
import discount5 from '@/assets/images/discount5.jpg?w=1000&format=webp';
import discount6 from '@/assets/images/discount6.jpg?w=1000&format=webp';
import discount7 from '@/assets/images/discount7.jpg?w=1000&format=webp';
import sl2 from '@/assets/images/sl2.jpg?w=800&format=webp';
import korporativ from '@/assets/images/korporativ.jpg?w=800&format=webp';
import sl3 from '@/assets/images/sl3.jpg?w=800&format=webp';
import pointer from "@/assets/images/pointer-min.png";

import quests from '@/assets/images/quest__2.jpg?w=300&format=webp';
import action from '@/assets/images/action.jpg?w=300&format=webp';
import karting from '@/assets/images/chego.jpg?w=300&format=webp';
import karaoke from '@/assets/images/party.jpg?w=300&format=webp';
import korporativ_card from '@/assets/images/korporativ.jpg?w=300&format=webp';
import children from '@/assets/images/children.jpg?w=300&format=webp';
import {useHead} from "@unhead/vue";
import {defineAsyncComponent, onMounted, onServerPrefetch, ref} from "vue";
import axios, {HttpStatusCode} from "axios";

useHead({
  title: "Чеширский КОД · корпорация развлечений",
  titleTemplate: null
})

const Accordion = defineAsyncComponent(() => import('../components/Accordion.vue'));
const Header = defineAsyncComponent(() => import('@/components/Header.vue'));
const Footer = defineAsyncComponent(() => import('@/components/Footer.vue'));
const Map = defineAsyncComponent(() => import('@/components/Map.vue'));
const ImgSlider = defineAsyncComponent(() => import('@/components/ImgSlider.vue'));
const Review = defineAsyncComponent(() => import('@/components/Review.vue'));
const VideoSlider = defineAsyncComponent(() => import("@/components/VideoSlider.vue"));
const Form = defineAsyncComponent(() => import("@/components/Form.vue"));

const imageUrls = [
  sl2,
  korporativ,
  sl3,
];


const imagePrograms = [
  {
    src: discount1,
    alt: 'Легкий четверг',
    id: 'easy-thursday'
  },
  {
    src: discount2,
    alt: 'Программа лояльности',
    id: 'loyalty-program'
  },
  {
    src: discount3,
    alt: 'Билет',
    id: 'ticket'
  },
  {
    src: discount4,
    alt: 'Скидка в день рождения',
    id: 'birthday'
  },
  {
    src: discount5,
    alt: 'Акции Party KOD',
    id: 'party-kod'
  },
  {
    src: discount6,
    alt: 'Жмурки',
    id: 'zhmurki'
  },
  {
    src: discount7,
    alt: 'Классным руководителям',
    id: 'teachers'
  }
];

const videos = [
  {
    src: import.meta.env.VITE_HOST + "/upload/video/5.mp4"
  },
  {
    src: import.meta.env.VITE_HOST + "/kiosk/video/actionkod/Action_Kod_Zhmurki_1min.mp4"
  },
];

let stat = ref({});
let vk_sub = ref(null);

const loadStat = async () => {
  try {
    const resp = await axios.get(import.meta.env.VITE_API_URL + "/stat/");
    if (resp.status === HttpStatusCode.Ok && resp.data.status) {
      stat.value = resp.data.result;
    } else {
      throw new Error("Сервер вернул ошибку");
    }
  } catch (err) {
    console.error(`Ошибка при получении статистики: ${err}`);
  }
}

const loadVkSub = async () => {
  try {
    const resp = await axios.get(import.meta.env.VITE_API_URL + "/vk/public_sub_count/");
    if (resp.status === HttpStatusCode.Ok && resp.data.status) {
      vk_sub.value = resp.data.result.sub_count;
    } else {
      throw new Error("Сервер вернул ошибку");
    }
  } catch (err) {
    console.error(`Ошибка при получении количества подписчиков: ${err}`);
  }
}

onMounted(async () => {
  await loadStat();
  await loadVkSub();
  ((r, u) => {
      const l = document.getElementById(r);
      l.contentWindow.document.open(), l.contentWindow.document.write(decodeURIComponent(escape(atob(u)))), l.contentWindow.document.close()
    })("big_light_70000001079958008", "PGhlYWQ+PHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiPgogICAgd2luZG93Ll9fc2l6ZV9fPSdiaWcnOwogICAgd2luZG93Ll9fdGhlbWVfXz0nbGlnaHQnOwogICAgd2luZG93Ll9fYnJhbmNoSWRfXz0nNzAwMDAwMDEwNzk5NTgwMDgnCiAgICB3aW5kb3cuX19vcmdJZF9fPSc3MDAwMDAwMTA3OTk1ODAwNycKICAgPC9zY3JpcHQ+PHNjcmlwdCBjcm9zc29yaWdpbj0iYW5vbnltb3VzIiB0eXBlPSJtb2R1bGUiIHNyYz0iaHR0cHM6Ly9kaXNrLjJnaXMuY29tL3dpZGdldC1jb25zdHJ1Y3Rvci9hc3NldHMvaWZyYW1lLmpzIj48L3NjcmlwdD48bGluayByZWw9Im1vZHVsZXByZWxvYWQiIGNyb3Nzb3JpZ2luPSJhbm9ueW1vdXMiIGhyZWY9Imh0dHBzOi8vZGlzay4yZ2lzLmNvbS93aWRnZXQtY29uc3RydWN0b3IvYXNzZXRzL2RlZmF1bHRzLmpzIj48bGluayByZWw9InN0eWxlc2hlZXQiIGNyb3Nzb3JpZ2luPSJhbm9ueW1vdXMiIGhyZWY9Imh0dHBzOi8vZGlzay4yZ2lzLmNvbS93aWRnZXQtY29uc3RydWN0b3IvYXNzZXRzL2RlZmF1bHRzLmNzcyI+PC9oZWFkPjxib2R5PjxkaXYgaWQ9ImlmcmFtZSI+PC9kaXY+PC9ib2R5Pg==")
})

onServerPrefetch(async () => {
  await loadStat();
  await loadVkSub();
})

</script>

<template>
  <Header></Header>
  <img loading="lazy" :src="pointer" style="display: none">
  <section class="main">
    <div class="container">
      <ul class="servises__list">
        <li class="main-slider">
          <ImgSlider :images="imageUrls"></ImgSlider>
        </li>
        <router-link
            class="serviсes__el quests"
            to="/quests"
            :style="{ backgroundImage: `url(${quests})` }"
        >
          <span class="overlay">Квесты</span>
        </router-link>

        <a href="https://party-kod.ru/"
           class="serviсes__el karaoke"
           :style="{ backgroundImage: `url(${karaoke})` }"
        >
          <span class="overlay">Караоке</span>
        </a>

        <router-link
            class="serviсes__el action-games"
            to="/action-games"
            :style="{ backgroundImage: `url(${action})` }"
        >
          <span class="overlay">Экшн-игры</span>
        </router-link>

        <a href="https://kartingchego.ru/"
           class="serviсes__el karting"
           :style="{ backgroundImage: `url(${karting})` }"
        >
          <span class="overlay">Картинг</span>
        </a>
        <li class="programs">
          <ImgSlider :images="imagePrograms" :is-promo-slider="true"></ImgSlider>
        </li>
        <li class="serviсes__el kids-party" :style="{ backgroundImage: `url(${children})` }">
          <router-link class="overlay" to="/show-programs">Детские праздники</router-link>
        </li>
        <li class="serviсes__el adult-party" :style="{ backgroundImage: `url(${korporativ_card})` }">
          <router-link class="overlay" to="/events">Корпоративы</router-link>
        </li>
      </ul>
    </div>
  </section>

  <section class="container">
    <div class="about-stats">
      <div class="stat-card">
        <h3 class="stat-number">C 2015</h3>
        <p class="stat-text">Года работаем</p>
      </div>
      <div class="stat-card">
        <h3 class="stat-number">{{ (stat.quests ? stat.quests : 42).toLocaleString("ru-RU") }}</h3>
        <p class="stat-text">Квестов и мероприятий</p>
      </div>
      <div class="stat-card">
        <h3 class="stat-number">{{ (stat.bookings ? stat.bookings : 37955).toLocaleString("ru-RU") }}</h3>
        <p class="stat-text">Проведено квестов и мероприятий</p>
      </div>
      <div class="stat-card">
        <h3 class="stat-number">100%</h3>
        <p class="stat-text">Гарантия веселья</p>
      </div>
      <a href="https://vk.com/chezakod" class="stat-card">
        <h3 class="stat-number">{{ (vk_sub ? vk_sub : 17337).toLocaleString("ru-RU") }}</h3>
        <p class="stat-text">Подписчиков в ВК</p>
      </a>
    </div>
  </section>

  <VideoSlider :videos="videos"></VideoSlider>

  <section class="form">
    <div class="container">
      <h2 class="title">Заполни форму и мы с тобой свяжемся</h2>
      <Form></Form>
    </div>
  </section>

  <!-- FQA SECTION -->
  <section class="faq">
    <div class="container">
      <h2 class="title">Ответы на часто задаваемые вопросы</h2>
      <Accordion></Accordion>
    </div>
  </section>

  <!-- REVIEW SECTION -->
  <section class="review">
    <div class="container">
      <Review></Review>
    </div>
  </section>

  <!-- MAP SECTION -->
  <section class="map">
    <Map></Map>
  </section>

  <!-- FOOTER SECTION -->
  <Footer></Footer>
</template>

<style>
/* Base styles */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

/* Services grid */
.servises__list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 176px);
  gap: 20px;
  margin: 40px auto;
  grid-template-areas:
    "slider slider slider quests games"
    "slider slider slider karting karaoke"
    "programs programs programs adult kids";
}

.serviсes__el {
  position: relative;
  display: block;
  border-radius: 12px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.serviсes__el::before {
  content: "";
  position: absolute;
  inset: 0;
  backdrop-filter: blur(0px);
  background-color: rgba(0, 0, 0, 0.2);
  transition: backdrop-filter 0.4s ease, background-color 0.4s ease;
  z-index: 1;
}

.serviсes__el:hover::before {
  backdrop-filter: blur(2px);
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  padding: 12px 20px;
  border-radius: 8px;
  opacity: 1;
  transition: opacity 0.4s ease;
}

.serviсes__el:hover {
  transform: scale(1.05);
}

.programs:hover,
.main-slider:hover {
  transform: scale(1.05);
}

.main-slider {
  grid-area: slider;
  transition: transform 0.5s ease;
  border-radius: 10px;
}

.main-slider * {
  border-radius: 10px;
}

.action-games {
  grid-area: games;
}

.quests {
  grid-area: quests;
}

.karting {
  grid-area: karting;
}

.karaoke {
  grid-area: karaoke;
}

.programs {
  grid-area: programs;
  overflow: hidden;
  transition: transform 0.5s ease;
  border-radius: 10px;
}

.adult-party {
  grid-area: adult;
}

.kids-party {
  grid-area: kids;
}

/* Stats */
.about-stats {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 60px;

}

.stat-card {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  text-align: center;
}

.stat-card:hover {
  transform: scale(1.05);
}

.stat-number {
  font-size: 28px;
  font-weight: bold;
  color: #cf1034;
  margin-bottom: 8px;
}

.stat-text {
  font-size: 16px;
  color: #333;
}

/* Titles */
.title {
  color: #CF1034;
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
}

/* Form */
.form {
  margin: 30px 0 60px;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .servises__list {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 150px);
    grid-template-areas:
      "slider slider slider"
      "programs programs programs"
      "quests games karting"
      "karaoke adult kids";
    gap: 15px;
    width: 90vw;
  }
    .container{
      padding: 0 1rem;
    }
  .main-slider{
    width: 90vw;
    margin: 0 auto;
  }

  .title {
    font-size: 30px;
  }

}

@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }

  .servises__list {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "slider"
      "programs"
      "quests"
      "games"
      "karting"
      "karaoke"
      "adult"
      "kids";
    gap: 10px;
    margin: 30px auto;
  }

  .serviсes__el {
    height: 150px;
  }

  .overlay {
    font-size: 32px;
    padding: 8px 12px;
  }

  .about-stats {
    width: 90vw;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 30px;
  }

  .stat-card:last-child {
    grid-column: 1 / -1;
    justify-self: center;
  }

  .title {
    font-size: 24px;
    margin-bottom: 20px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }

}
</style>

