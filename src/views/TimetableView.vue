<template>
  <Header />
  <div class="timetable-page">
    <div class="container">
      <h1 class="page-title">Расписание</h1>
      <TimetableEmbed :questIds="questIds" />
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import TimetableEmbed from '@/components/TimetableEmbed.vue';

const questIds = ref([]);

onMounted(async () => {
  try {
    // Fetch all quests from the API
    const response = await axios.get('https://chezakod.ru/api/v2/quests/');
    if (response.data && response.data.result) {
      // Extract quest IDs from the response
      questIds.value = response.data.result.map(quest => quest.id);
    }
  } catch (error) {
    console.error('Error fetching quests:', error);
  }
});
</script>

<style scoped>
.timetable-page {
  min-height: 100vh;
  color: #fff;
  margin: 30px 0;
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
}
</style> 