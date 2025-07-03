<template>
  <Header/>
  <div class="timetable-page">
      <h1 class="page-title">Расписание</h1>
      <section class="service-category-toggler">
        <div class="container">
          <div class="toggle-buttons">
            <button v-for="(title, category) in categories"
                    :class="{ 'active': activeCategory === category }"
                    @click="switchToCategory(category)"
            >
              {{ title }}
            </button>
          </div>
        </div>
      </section>
      <TimetableEmbed :questIds="questIds"/>
    </div>
  <Footer/>
</template>

<script setup>
import {defineAsyncComponent, onMounted, ref} from 'vue';
import axios from 'axios';
import {useHead} from "@unhead/vue";

const Header = defineAsyncComponent(() => import('@/components/Header.vue'));
const Footer = defineAsyncComponent(() => import('@/components/Footer.vue'));
const TimetableEmbed = defineAsyncComponent(() => import('@/components/TimetableEmbed.vue'));

const questIds = ref([]);

const categories = {
  all: "Все",
  quest: "Квесты",
  action: "Экшн-игры",
  karting: "Картинг",
  karaoke: "Лофт-караоке",
  child: "Детские квесты"
};

let activeCategory = ref("quest");

useHead({
  title: "Расписание"
});

const loadIds = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL + '/quests/?category=' + activeCategory.value);
    if (response.data && response.data.result) {
      questIds.value = response.data.result.map(quest => quest.id);
    }
  } catch (error) {
    console.error('Error fetching quests:', error);
  }
}

const switchToCategory = (category) => {
  activeCategory.value = category;
  loadIds().then(() => { return true;});
}

onMounted(async () => {
  await loadIds();
});
</script>

<style scoped>

.service-category-toggler {
  padding: 10px 0 20px 0;
  border-bottom: 1px solid #e0e0e0;
}

.toggle-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.toggle-buttons button {
  padding: 10px 20px;
  border: 2px solid #CF1034;
  background: transparent;
  color: #CF1034;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-buttons button.active {
  background: #CF1034;
  color: white;
}

.timetable-page {
  min-height: 85vh;
  color: #fff;
  margin: 30px 0 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  font-size: 32px;
  margin: 30px 0;
  text-align: center;
  color: #CF1034;
  font-weight: 600;
}

@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }

  .page-title {
    font-size: 24px;
    margin: 20px 0;
  }

  .toggle-buttons {
    flex-direction: column;
    align-items: center;
  }

  .toggle-buttons button {
    width: 100%;
    max-width: 300px;
  }
}
</style> 