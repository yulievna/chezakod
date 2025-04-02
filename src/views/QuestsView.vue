<template>
  <Header />
  <h1 class="title">Квесты</h1>
  <Quests :quests="quests" />
  <section class="schedule">
    <div class="container">
      <h1 class="title">Расписание</h1>
      <iframe src="https://chezakod.ru/quest/11519850/timetable/" width="100%" height="1820" style="border: none;" ref="iframeRef" scrolling="no" @load="onIframeLoad" ></iframe>
    </div>
  </section>
  <Lounge :lounges="lounges" />
  <Map />
  <Footer />
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Map from '@/components/Map.vue';
import Quests from '@/components/Quests.vue';
import Lounge from '@/components/Lounge.vue';

const quests = [
  {
    id: 1,
    name: 'Башня Франкенштейна',
    age: '12+',
    images: ['src/assets/quest__1.jpg', 'src/assets/quest__1(2).jpg'],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Средний',
    contact: '+7 (391) 269-92-23',
    address: 'ул. Робеспьера, 1',
  },
  {
    id: 2,
    name: 'Корабль-Призрак',
    age: '12+',
    images: ['src/assets/quest__2.jpg', 'src/assets/quest__2(2).jpg', 'src/assets/quest__2(3).jpg'],
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
    images: ['src/assets/quest__3.jpg', 'src/assets/quest__3(2).jpg', 'src/assets/quest__3(3).jpg'],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Сложный',
    contact: '+7 (391) 269-92-23',
    address: 'ул. Алексеева, 113',
  },
  {
    id: 4,
    name: 'Афера века',
    age: '12+',
    images: ['src/assets/quest__4.gif', 'src/assets/quest__4(2).gif', 'src/assets/quest__4(3).gif'],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Средний',
    contact: '+7 (391) 269-92-23',
    address: 'ул. Робеспьера, 1 ',
  },
  {
    id: 5,
    name: 'Петля времени',
    age: '14+',
    images: ['src/assets/quest__5.jpg', 'src/assets/quest__5(2).jpg'],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Средний',
    contact: '+7 (391) 269-92-23',
    address: 'ул. Алексеева, 113',
  },
  {
    id: 6,
    name: 'Логово Великана',
    age: '12+',
    images: ['src/assets/quest__6.jpg', 'src/assets/quest__6(2).jpg', 'src/assets/quest__6(3).jpg'],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Средний',
    contact: '+7 (391) 269-92-23',
    address: 'ул. Белинского, 8 ТРЦ "Комсомолл" 3 этаж',
  },
  {
    id: 7,
    name: 'Мумия. В поисках артефакта',
    age: '12+',
    images: ['src/assets/quest__7.jpg', 'src/assets/quest__7(2).jpg'],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Средний',
    contact: '+7 (391) 269-92-23',
    address: 'ул. Белинского, 8 ТРЦ "Комсомолл" 3 этаж',
  },
  {
    id: 8,
    name: 'Семейка Аддамс',
    age: '12+',
    images: ['src/assets/quest__8.jpg', 'src/assets/quest__8(2).jpg', 'src/assets/quest__8(3).jpg'],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Средний',
    contact: '+7 (391) 269-92-23',
    address: 'ул. Белинского, 8 ТРЦ "Комсомолл" 3 этаж',
  },
  {
    id: 9,
    name: 'Джуманджи',
    age: '12+',
    images: ['src/assets/quest__9.jpg', 'src/assets/quest__9(2).jpg', 'src/assets/quest__9(3).jpg'],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Средний',
    contact: '+7 (391) 269-92-23',
    address: 'ул. Белинского, 8 ТРЦ "Комсомолл" 3 этаж',
  },
];

const lounges = [
  {
    id: 1,
    image: 'src/assets/lounge__1.jpg',
    address: 'ул. Алексеева, 113',
    price: 'от 1500 ₽/час',
    players: '2-6',
  },
  {
    id: 2,
    image: 'src/assets/lounge__2.jpg',
    address: 'ул. Ленина, 45',
    price: 'от 2000 ₽/час',
    players: '4-8',
  },
  {
    id: 3,
    image: 'src/assets/lounge__3.jpg',
    address: 'ул. Пушкина, 10',
    price: 'от 1800 ₽/час',
    players: '3-5',
  },
  {
    id: 4,
    image: 'src/assets/lounge__4.jpg',
    address: 'ул. Пушкина, 10',
    price: 'от 1800 ₽/час',
    players: '3-5',
  },
  {
    id: 5,
    image: 'src/assets/lounge__5.jpg',
    address: 'ул. Пушкина, 10',
    price: 'от 1800 ₽/час',
    players: '3-5',
  },
  {
    id: 6,
    image: 'src/assets/lounge__6.jpg',
    address: 'ул. Пушкина, 10',
    price: 'от 1800 ₽/час',
    players: '3-5',
  },
  // Добавьте остальные лаундж-зоны
];
</script>

<style>
:root {
  --primary-color: #CF1034;
  --text-color: #fff;
  --border-radius: 40px;
  --transition-duration: 0.5s;
}

.title {
  margin: 60px auto;
  width: fit-content;
  font-size: 32px;
  color: var(--text-color);
}

@media (max-width: 450px) {
  .container {
    width: 380px;
    margin: 0 auto;
  }
}
</style>