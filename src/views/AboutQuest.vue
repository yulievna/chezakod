<template>
  <Header />
  <div class="quest-page">
    <!-- Заголовок квеста -->
    <div class="quest-header" :style="{ backgroundImage: `url(${headerImage})` }">
      <div class="container">
        <div class="quest-info">
          <h1 class="name-quest">{{ quest.name }}</h1>
          <button class="to-book">Забронировать</button>
        </div>
        <div class="quest-chars">
          <div class="char-item"><img :src="players" alt="Players" />{{ quest.players }}</div>
          <div class="char-item"><img :src="time" alt="Time" />{{ quest.time }}</div>
          <div class="char-item"><img :src="difficulty" alt="Difficulty" />{{ quest.difficulty }}</div>
          <div class="char-item age">{{ quest.age }}</div>
        </div>
      </div>
    </div>

    <!-- Основной контент -->
    <div class="container">
      <div class="quest-content">
        <!-- Слайдер -->
        <div class="slider">
          <div class="slider__image-container">
            <img :src="currentImage" alt="Quest Image" class="slider__image" />
          </div>
          <div class="slider__controls">
            <button @click="prevImage" class="slider__button">❮</button>
            <button @click="nextImage" class="slider__button">❯</button>
          </div>
        </div>

        <!-- Описание -->
        <div class="quest-description">
          <h2 class="name-quest">{{ quest.name }}</h2>
          <p class="description">{{ quest.description }}</p>
          <button class="to-book">Забронировать</button>
        </div>
      </div>

      <!-- Дополнительные услуги -->
      <div class="options">
        <h2 class="options-title">Дополнительные услуги</h2>
        <div class="options-list">
          <div v-for="(option, index) in options" :key="index" class="option-item">
            <div class="option-item__header">
              <img :src="option.icon" alt="Icon" class="option-item__image" />
              <span class="option-item__name">{{ option.name }}</span>
            </div>
            <p class="option-item__desc">{{ option.description }}</p>
          </div>
        </div>
      </div>

      <div class="likes">
        <div class="container">
          <h2 class="likes-title">Вам понравится</h2>
          <Quests :quests="likes" />
        </div>
      </div>
      <!-- Контакты -->
      <div class="contacts">
        <h2 class="contacts-title">Контакты</h2>
        <div class="contacts-info">
          <p class="phone">{{ quest.contact }}</p>
          <p class="way">Подобрать маршрут</p>
        </div>
      </div>
    </div>
  </div>
  <Map></Map>
  <Footer />
</template>
<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Quests from "@/components/Quests.vue";

// Импортируем изображения
import quest6Image from '@/assets/quest__8.jpg'
import quest6Image2 from '@/assets/quest__8(2).jpg'
import quest6Image3 from '@/assets/quest__8(3).jpg'
import quest1Image from '@/assets/quest__1.jpg';
import quest1Image2 from '@/assets/quest__1(2).jpg';
import quest2Image from '@/assets/quest__2.jpg';
import quest2Image2 from '@/assets/quest__2(2).jpg';
import quest2Image3 from '@/assets/quest__2(3).jpg';
import quest3Image from '@/assets/quest__3.jpg';
import quest3Image2 from '@/assets/quest__3(2).jpg';
import quest3Image3 from '@/assets/quest__3(3).jpg';
import icon1 from '@/assets/icon__quest-1.png'
import icon2 from '@/assets/icon__quest-2.png'
import players from '@/assets/players.png'
import time from '@/assets/time.png'
import difficulty from '@/assets/difficulty.png'
const route = useRoute();
const currentIndex = ref(0);
const likes = [
  {
    id: 8,
    name: 'Семейка Аддамс',
    age: '12+',
    images: [quest6Image, quest6Image2, quest6Image3],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Средний',
    contact: '+7 (391) 269-92-23',
    address: 'ул. Белинского, 8 ТРЦ "Комсомолл" 3 этаж',
  },
  {
    id: 2,
    name: 'Корабль-Призрак',
    age: '12+',
    images: [quest2Image, quest2Image2, quest2Image3],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Средний',
    contact: '+7 (391) 269-92-23',
    address: 'ул. Белинского, 8 ТРЦ "Комсомолл" 3 этаж',
  },
  {
    id: 3,
    name: 'Станция "Логос"',
    age: '14+',
    images: [quest3Image, quest3Image2, quest3Image3],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Сложный',
    contact: '+7 (391) 269-92-23',
    address: 'ул. Алексеева, 113',
  },
];
// Пример данных
const quests = [
  {
    id: 1,
    name: 'Башня Франкенштейна',
    age: '7+',
    images: [quest1Image, quest2Image],
    players: '2-4 игрока',
    time: '60 минут',
    difficulty: 'Средний',
    contact: '+7 (391) 986-85-16',
    description:
        'Несколько десятков лет прошло с тех пор, как история чудовища, созданного ученым Виктором Франкенштейном, потрясла всю округу. Замок ученого пустовал. Люди стали забывать холодящие спину от ужаса истории.\n' +
        '\n' +
        '       Но в последнее время ночами в одной из башен замка кто-то стал зажигать огонь. Свет горит в лаборатории Франкенштейна.\n' +
        '\n' +
        '       Ходят слухи, что последователь Виктора вернулся ради какой-то зловещей цели. Местные жители не выходят из дома в темное время суток, опасаясь стать жертвой во имя новой жизни нового чудовища. Очень жаль, что вы с друзьями не восприняли эти слухи всерьез…',
  },
];

// Текущий квест
const quest = computed(() => {
  const foundQuest = quests.find((q) => q.id === parseInt(route.params.id));
  if (!foundQuest) {
    console.error(`Quest with ID ${route.params.id} not found.`);
    return null;
  }
  return foundQuest;
});

// Изображения
const headerImage = computed(() => quest.value?.images[0]);
const currentImage = computed(() =>
    quest.value?.images[currentIndex.value]
);

// Переключение изображений
const nextImage = () =>
    (currentIndex.value =
        (currentIndex.value + 1) % quest.value.images.length);
const prevImage = () =>
    (currentIndex.value =
        (currentIndex.value - 1 + quest.value.images.length) %
        quest.value.images.length);

// Дополнительные услуги
const options = [
  {
    name: 'Инструктор',
    icon: icon1,
    description:
        'Максимум драйва и безопасности! Инструктор погрузит вас в сюжет.',
  },
  {
    name: 'Фотограф',
    icon: icon2,
    description: 'Профессиональный фотограф запечатлеет моменты.',
  },
];
</script>
<style scoped>
.quest-header .container{
  display: flex;
  justify-content: space-between;
  align-items: end;
}
.likes .container{
  width: 1280px;
  margin: 0 auto;
}
.quest-page {
  color: #fff;
  padding: 20px;
}

.quest-header {
  height: 400px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin-bottom: 20px;
}

.quest-info {
  margin-bottom: 20px;
}

.name-quest {
  font-size: 2rem;
  margin: 0;
}

.to-book {
  background-color: #cf1034;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 7.5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 33px;
}

.to-book:hover {
  background-color: #a50d2a;
}

.quest-chars {
  display: flex;
  gap: 15px;
  font-size: 1rem;
}

.char-item img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.age {
  background-color: #cf1034;
  color: white;
  padding: 7px;
  border-radius: 5px;
  font-size: 0.9rem;
}

.quest-content {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.slider {
  flex: 1;
}

.slider__image-container {
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 10px;
}

.slider__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slider__controls {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.slider__button {
  background-color: #cf1034;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.slider__button:hover {
  background-color: #a50d2a;
}

.quest-description {
  flex: 1;
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

.options {
  margin-bottom: 20px;
}

.options-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.options-list {
  display: flex;
  gap: 20px;
}

.option-item {
  flex: 1;
  background-color: #3a3a3a;
  padding: 15px;
  border-radius: 8px;
}

.option-item__header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.option-item__image {
  width: 24px;
  height: 24px;
}

.option-item__name {
  font-size: 1rem;
  font-weight: bold;
}

.option-item__desc {
  font-size: 0.9rem;
  line-height: 1.4;
}

.contacts {
  background-color: #2a2a2a;
  padding: 20px;
  border-radius: 10px;
}

.contacts-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.phone,
.way {
  font-size: 1rem;
}
</style>