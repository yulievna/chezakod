<script setup>
import {onMounted, onServerPrefetch, ref} from 'vue';
import axios from 'axios';

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Map from '@/components/Map.vue';
import Quests from '@/components/Quests.vue';
import Lounge from '@/components/Lounge.vue';
import TimetableEmbed from '@/components/TimetableEmbed.vue';
import {useHead} from "@unhead/vue";
import {useRoute} from "vue-router";

const quests = ref([]);
const lounges = ref([]);
const activeCategory = ref('regular');
const timetableQuestIds = ref([]);
const route = useRoute();

const scrollToElem = (hash) => {
  if (hash) {
    const element = document.getElementById(hash.slice(1));
    if (element) {
      const headerHeight = 200;
      const y = element.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
};

const loadQuests = async (category) => {
  try {
    const url = category === 'child'
        ? import.meta.env.VITE_API_URL + '/quests/?category=child'
        : import.meta.env.VITE_API_URL + '/quests/';

    const responseQ = await axios.get(url);
    quests.value = responseQ.data.result.map((q) => ({
      id: q.id,
      questId: q.id,
      slug: q.slug,
      name: q.name,
      age: `${q.age_min}+`,
      images: [q.main_image, ...(q.photo || [])],
      players: `${q.players.min}-${q.players.max} игрока`,
      time: `${q.duration} минут`,
      address: q.location.address,
    }));

    timetableQuestIds.value = responseQ.data.result.map((q) => q.id);
  } catch (error) {
    console.error('Ошибка при загрузке квестов:', error);
  }
};

const switchCategory = (category) => {
  activeCategory.value = category;
  loadQuests(category);
};

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

useHead({
  title: "Квесты"
});

onServerPrefetch(async () => {
  await loadQuests('regular');
  await loadLounges();
})

onMounted(async () => {
  await loadQuests('regular');
  await loadLounges();

  // Load timetable script
  const script = document.createElement('script');
  script.src = import.meta.env.VITE_HOST + '/f/build/embed.js';
  script.async = true;
  document.body.appendChild(script);

  setTimeout(() => { scrollToElem(route.hash) }, 800);
});
</script>
<template>
  <Header/>
  <div class="quests-page">
    <div class="container">
      <h1 class="page-title">Квесты</h1>
      <div class="category-switcher">
        <button
            :class="['switch-btn', { active: activeCategory === 'regular' }]"
            @click="switchCategory('regular')"
        >
          Квесты
        </button>
        <button
            :class="['switch-btn', { active: activeCategory === 'child' }]"
            @click="switchCategory('child')"
        >
          Детские квесты
        </button>
      </div>
      <Quests
          :quests="quests"
          :basePath="activeCategory === 'child' ? '/child-quests' : '/quests'"
      />
    </div>
  </div>
  <section class="schedule">
    <div class="container">
      <h1 class="title">Расписание</h1>
      <TimetableEmbed :questIds="timetableQuestIds"/>
    </div>
  </section>
  <section class="lounges" id="lounges">
    <div class="container">
      <h2 class="page-title">Лаундж зоны</h2>
      <Lounge :lounges="lounges"/>
    </div>
  </section>
  <Map/>
  <Footer/>
</template>

<style scoped>
:root {
  --primary-color: #CF1034;
  --primary-hover: rgba(207, 16, 52, 0.1);
  --text-color: #333;
  --bg-color: #fff;
  --border-radius: 8px;
  --transition: all 0.3s ease;
}

.quests-page {
  color: var(--text-color);
  background-color: var(--bg-color);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}


@media (min-width: 1200px) {
  .container {
    padding: 0;
  }
}

.page-title, .title {
  font-size: clamp(1.5rem, 5vw, 2rem);
  text-align: center;
  color: var(--primary-color);
  font-weight: 600;
  margin: 2rem auto;
  line-height: 1.3;
}

.page-title {
  margin-bottom: 1.5rem;
}

.title {
  margin: 3rem auto;
}

.lounges {
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .page-title, .title {
    margin: 1.5rem auto;
  }
}

.category-switcher {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.switch-btn {
  font-size: 16px;
  padding: 7px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-weight: 500;
  border: 2px solid var(--primary-color);
  background: transparent;
  color: var(--primary-color);
  min-width: 160px;
  text-align: center;
}

.switch-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
}

.switch-btn:active {
  transform: translateY(0);
}

.switch-btn.active {
  background: var(--primary-color);
  color: #fff;
  box-shadow: 0 4px 8px rgba(207, 16, 52, 0.2);
}

@media (max-width: 768px) {
  .category-switcher {
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  .switch-btn {
    width: 250px;
    font-size: 16px;
    padding: 10px 20px;
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .category-switcher {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

}
</style>