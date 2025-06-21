<template>
  <Header/>
  <section class="action-games">
    <div class="container">
      <h1 class="page-title">Экшн Игры</h1>
      <Quests :quests="actionGames" basePath="/action-games"/>
    </div>
  </section>
  <section class="schedule">
    <div class="container">
      <h2 class="page-title">Расписание</h2>
      <TimetableEmbed :questIds="timetableQuestIds"/>
    </div>
  </section>
  <section class="lounges">
    <div class="container">
      <h2 class="page-title">Лаундж зоны</h2>
      <Lounge :lounges="lounges"/>
    </div>
  </section>
  <Map/>
  <Footer/>
</template>

<script setup>
import {onMounted, onServerPrefetch, ref} from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Quests from '@/components/Quests.vue';
import Map from "@/components/Map.vue";
import TimetableEmbed from "@/components/TimetableEmbed.vue";
import Lounge from "@/components/Lounge.vue";
import axios from "axios";

import img1 from '@/assets/images/sl1.jpg';
import img2 from '@/assets/images/sl2.jpg';
import img3 from '@/assets/images/sl3.jpg';
import img4 from '@/assets/images/jmurki.jpg';
import img5 from '@/assets/images/jmurki2.jpg';
import img6 from '@/assets/images/jmurki3.jpg';
import img7 from '@/assets/images/playkod1.jpeg';
import img8 from '@/assets/images/playkod2.jpeg';
import {useHead} from "@unhead/vue";

useHead({
  title: "Экшн-игры"
})

const actionGames = ref([
  {
    id: "14428",
    slug: "zhmurki",
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
    slug: "action-kod",
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
    slug: "play-kod",
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
const lounges = ref([]);
const timetableQuestIds = ref(['14428', '11519850', '12507544']);

const loadLounges = async () => {
  try {
    const responseL = await axios.get(import.meta.env.VITE_API_URL + '/vip/');
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
  } catch (error) {
    console.error('Ошибка при загрузке лаундж-зон:', error);
  }
};

onServerPrefetch(loadLounges);

onMounted(async () => {

  await loadLounges();

  // Load timetable script
  const script = document.createElement('script');
  script.src = import.meta.env.VITE_HOST + '/f/build/embed.js';
  script.async = true;
  document.body.appendChild(script);
});
</script>

<style scoped>
.lounges {
  margin-bottom: 1.5rem;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}

.page-title {
  font-size: clamp(1.5rem, 5vw, 2rem);
  text-align: center;
  color: var(--primary-color);
  font-weight: 600;
  line-height: 1.3;
  margin: 3rem auto 2rem;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
}
</style> 