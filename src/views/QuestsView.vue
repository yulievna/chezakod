<template>
  <Header />
  <div class="quests-page">
    <div class="container">
      <h1 class="page-title">Квесты</h1>
      <Quests :quests="quests" basePath="/quests"/>
    </div>
  </div>
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
import { ref, onMounted } from 'vue';
import axios from 'axios';

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Map from '@/components/Map.vue';
import Quests from '@/components/Quests.vue';
import Lounge from '@/components/Lounge.vue';

// Здесь можно оставить импорты изображений, если они используются отдельно

const quests = ref([]);
const lounges = ref([]);
onMounted(async () => {
  try {
    const responseQ = await axios.get('https://chezakod.ru/api/v2/quests/');
    quests.value = responseQ.data.result.map((q) => ({
      id: q.id,
      name: q.name.replace(/&quot;/g, '"'), // для замены кавычек
      age: `${q.age_min}+`,
      images: [q.main_image, ...(q.photo || [])],
      players: `${q.players.min}-${q.players.max} игрока`,
      time: `${q.duration} минут`,
      difficulty: 'Средний', // Если из API не приходит — задаём дефолт
      contact: '+7 (391) 269-92-23', // Тоже дефолтно, если всегда одинаковый
      address: q.location.address.replace(/&quot;/g, '"'),
    }));
    const responseL = await axios.get('https://chezakod.ru/api/v2/vip/');
    lounges.value = responseL.data.result.map((l) => ({
      id: l.id,
      photo: l.photo,
      location: {
        id: l.location.id,
        name: l.location.name,
        address: l.location.address.replace(/&quot;/g, '"'),
        coordinates: l.location.coordinates,
        links: l.location.links
      },
      quests: l.quests
    }));
    // lounges.value = responseL.
  } catch (error) {
    console.error('Ошибка при загрузке квестов:', error);
  }
});

// const lounges = [
//   {
//     id: 1,
//     image: 'src/assets/images/lounge__1.jpg',
//     address: 'ул. Алексеева, 113',
//     price: 'от 1500 ₽/час',
//     players: '2-6',
//   },
//   {
//     id: 2,
//     image: 'src/assets/images/lounge__2.jpg',
//     address: 'ул. Ленина, 45',
//     price: 'от 2000 ₽/час',
//     players: '4-8',
//   },
//   {
//     id: 3,
//     image: 'src/assets/images/lounge__3.jpg',
//     address: 'ул. Пушкина, 10',
//     price: 'от 1800 ₽/час',
//     players: '3-5',
//   },
//   {
//     id: 4,
//     image: 'src/assets/images/lounge__4.jpg',
//     address: 'ул. Пушкина, 10',
//     price: 'от 1800 ₽/час',
//     players: '3-5',
//   },
//   {
//     id: 5,
//     image: 'src/assets/images/lounge__5.jpg',
//     address: 'ул. Пушкина, 10',
//     price: 'от 1800 ₽/час',
//     players: '3-5',
//   },
//   {
//     id: 6,
//     image: 'src/assets/images/lounge__6.jpg',
//     address: 'ул. Пушкина, 10',
//     price: 'от 1800 ₽/час',
//     players: '3-5',
//   },
//   // Добавьте остальные лаундж-зоны
// ];
</script>

<style>
:root {
  --primary-color: #CF1034;
  --text-color: #fff;
  --border-radius: 40px;
  --transition-duration: 0.5s;
}

.quests-page {
  color: #fff;
}

.page-title {
  font-size: 32px;
  margin: 30px;
  text-align: center;
  color:#CF1034;
  font-weight: 600;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  margin: 60px auto;
  width: fit-content;
  font-size: 32px;
  color:#CF1034;

}

@media (max-width: 450px) {
  .container {
    width: 380px;
    margin: 0 auto;
  }
}
</style>