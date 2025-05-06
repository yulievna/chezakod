<template>
  <Header />
  <section class="quests">
    <div class="container">
      <h1 class="page-title">Экшн Игры</h1>
      <Quests :quests="actionGames" basePath="/action-games" />
    </div>
  </section>
  <Footer />
</template>

<script setup>
import { ref } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Quests from '@/components/Quests.vue';

import img1 from '@/assets/images/sl1.jpg';
import img2 from '@/assets/images/sl2.jpg';
import img3 from '@/assets/images/sl3.jpg';
import img4 from '@/assets/images/jmurki.jpg';
import img5 from '@/assets/images/jmurki2.jpg';
import img6 from '@/assets/images/jmurki3.jpg';
import img7 from '@/assets/images/playkod1.jpeg';
import img8 from '@/assets/images/playkod2.jpeg';

const actionGames = ref([
  {
    id: "14428",
    name: "Жмурки",
    age: "12+",
    players: "4-4",
    time: "60 мин",
    difficulty: "Легкий",
    images: [img4, img5, img6],
    address: "ул. Ленина, 1",
    contact: '+7 (391) 986-85-16',
  },
  {
    id: "11519850",
    name: "ACTION:KOD",
    age: "14+",
    players: "2-4",
    time: "70 мин",
    difficulty: "Легкий",
    images: [img1, img2, img3],
    address: "ул. Ленина, 1",
    contact: '+7 (391) 986-85-16',
  },
  {
    id: "12507544",
    name: "PLAY KOD",
    age: "3+",
    players: "1-6",
    time: "50 мин", 
    difficulty: "Легкий",
    images: [img7, img8],
    address: "ул. Ленина, 1",
    contact: '+7 (391) 986-85-16',
  }
]);
</script>

<style scoped>
.quests {
  padding: 40px 0;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 40px;
  text-align: center;
  position: relative;
}

.page-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background-color: #cf1034;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
}
</style> 