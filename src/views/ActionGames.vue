<template>
  <Header/>
  <section class="action-games">
    <div class="container">
      <h1 class="page-title">Экшн-Игры</h1>
      <Quests :quests="actionGames" basePath="/action-game"/>
    </div>
  </section>
  <section class="schedule">
      <h2 class="page-title">Расписание</h2>
      <TimetableEmbed :questIds="timetableQuestIds"/>
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
import {defineAsyncComponent, onMounted, onServerPrefetch, ref} from 'vue';
import axios, {HttpStatusCode} from "axios";

import {useHead} from "@unhead/vue";

useHead({
  title: "Экшн-игры"
});

const Header = defineAsyncComponent(() => import('@/components/Header.vue'));
const Footer = defineAsyncComponent(() => import('@/components/Footer.vue'));
const Quests = defineAsyncComponent(() => import('@/components/Quests.vue'));
const Map = defineAsyncComponent(() => import("@/components/Map.vue"));
const TimetableEmbed = defineAsyncComponent(() => import("@/components/TimetableEmbed.vue"));
const Lounge = defineAsyncComponent(() => import("@/components/Lounge.vue"));

const actionGames = ref([]);

const loadGames = async () => {
  try {
    const resp = await axios.get(import.meta.env.VITE_API_URL + "/quests/?category=action");
    if (resp.status === HttpStatusCode.Ok && resp.data.status) {
      actionGames.value = resp.data.result.map((i) => ({
        id: i.id,
        slug: i.slug,
        name: i.name,
        age: `${i.age_min}+`,
        players: `${i.players.min}-${i.players.max}`,
        time: `${i.duration} мин`,
        address: i.location.address,
        images: i.photo
      }));
    } else {
      throw new Error("Ошибка сервера");
    }
  } catch (error) {
    console.error(error);
  }
}

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

onServerPrefetch(async () => {
  await loadGames();
  await loadLounges();
});

onMounted(async () => {

  await loadGames();
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
@media (max-width: 1200px) {
  .container{
    padding: 0 20px;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
}
</style> 