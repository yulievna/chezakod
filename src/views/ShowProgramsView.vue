<template> 
  <div class="show-programs">
    <Header></Header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1 class="hero__title">Шоу-программы</h1>
        <p class="hero__subtitle">Незабываемые развлечения для вашего праздника</p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="main-content">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Загрузка шоу-программ...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <p>{{ error }}</p>
          <button @click="loadShows" class="retry-button">Повторить</button>
        </div>

        <!-- Основные шоу-программы -->
        <div v-else>
          <!-- <h2 class="section-title">Основные шоу-программы</h2> -->
<div class="shows-grid">
  <div v-for="show in showPrograms" :key="show.id" class="show-card">
    <div class="show-image">
      <img :src="show.previewImage" :alt="show.name" loading="lazy">
    </div>
    <div class="show-content">
      <h3>{{ show.name }}</h3>
      <p>{{ show.previewText }}</p>
      <div class="show-details">
        <p><strong>Длительность:</strong> {{ show.duration }}</p>
        <p><strong>Актеры:</strong> {{ show.actor }}</p>
        <div class="show-price">{{ show.price }} ₽</div>
      </div>
    </div>
  </div>
</div>

<h2 class="section-title">Мини шоу-программы</h2>
<div class="mini-shows-grid">
  <div v-for="mini in miniShows" :key="mini.id" class="mini-show-card" @click="selectedMiniShow = mini">
    <img :src="mini.image" :alt="mini.name" loading="lazy">
    <h4>{{ mini.name }}</h4>
    <p class="mini-price">{{ mini.price }} ₽</p>
  </div>
</div>

<!-- Modal -->
<div v-if="selectedMiniShow" class="modal-backdrop" @click.self="selectedMiniShow = null">
  <div class="modal-content">
    <button class="modal-close" @click="selectedMiniShow = null">×</button>
    <img :src="selectedMiniShow.image" :alt="selectedMiniShow.name" />
    <h3>{{ selectedMiniShow.name }}</h3>
    <p>{{ selectedMiniShow.description }}</p>
    <p class="mini-price">{{ selectedMiniShow.price }} ₽</p>
  </div>
</div>


        </div>
      </div>
    </section>

    <Footer></Footer>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const showPrograms = ref([]);
const miniShows = ref([]);
const selectedMiniShow = ref(null);
const loading = ref(true);
const error = ref(null);

const loadShows = async () => {
  loading.value = true;
  error.value = null;

  try {
    const [main, mini] = await Promise.all([
      axios.get('https://chezakod.ru/api/v2/show/'),
      axios.get('https://chezakod.ru/api/v2/service/')
    ]);

    // Основные шоу
    showPrograms.value = main.data.result.map(show => ({
      id: show.id,
      name: show.name,
      previewImage: show.preview_image,
      previewText: show.preview_text?.replace(/<[^>]*>/g, '') || '',
      duration: show.duration,
      actor: show.actor,
      price: show.price
    }));

    // Мини-шоу
    miniShows.value = mini.data.result.map(service => ({
      id: service.id,
      name: service.name,
      description: service.description.replace(/<[^>]*>/g, ''),
      price: service.price,
      image: service.image
    }));
  } catch (err) {
    console.error(err);
    error.value = 'Ошибка загрузки шоу-программ.';
  } finally {
    loading.value = false;
  }
};

onMounted(loadShows);

</script>

<style scoped>
.mini-shows {
  margin-top: 60px;
}

.mini-shows-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.mini-show-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  text-align: center;
  padding: 10px;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mini-show-card:hover {
  transform: translateY(-4px);
}

/* Мини-шоу стили */
.mini-shows {
  margin-top: 60px;
}

.section-title {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #CF1034;
}

.mini-shows-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-top: 20px;
}

.mini-show-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 16px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.mini-show-card:hover {
  transform: translateY(-5px);
}

.mini-show-image {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 12px;
}

.mini-show-info {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.mini-show-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.mini-show-description {
  font-size: 0.95rem;
  color: #555;
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.mini-show-price {
  font-size: 1.1rem;
  color: #CF1034;
  font-weight: 600;
  margin-top: auto;
}
.section-title {
  font-size: 28px;
  margin: 40px 0 20px;
  text-align: center;
  color: #333;
}

.mini-shows-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.mini-show-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  transition: transform 0.3s ease;
  padding: 15px;
}

.mini-show-card:hover {
  transform: scale(1.03);
}

.mini-show-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.mini-show-card h4 {
  font-size: 18px;
  margin: 12px 0 6px;
  color: #CF1034;
}

.mini-price {
  font-weight: bold;
  color: #333;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  position: relative;
  animation: fadeIn 0.3s ease;
}

.modal-content img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
}

.modal-content h3 {
  color: #CF1034;
  margin-bottom: 10px;
}

.modal-content p {
  margin-bottom: 10px;
  line-height: 1.5;
  color: #555;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #666;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Шоу-программы стили (улучшения) */
.show-card {
  background: linear-gradient(to bottom right, #fff, #fdf4f6);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.show-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
}

.show-title {
  font-size: 1.6rem;
  color: #CF1034;
  font-weight: 700;
  margin-bottom: 10px;
}

.show-description {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  max-height: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.show-link {
  background: linear-gradient(135deg, #CF1034, #e82c4c);
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
}


.show-programs {
  background-color: #f8f9fa;
}

.hero {
  background-size: cover;
  background-position: center;
  color: #000;
  padding: 100px 0;
  text-align: center;
}

.hero__title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
}

.hero__subtitle {
  font-size: 24px;
  opacity: 0.9;
}

.container {
  width: 1200px;
  margin: 0 auto;
}

.main-content {
  /* padding: 60px 0; */
}

.shows-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.show-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.show-card:hover {
  transform: translateY(-5px);
}

.show-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.show-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.show-content {
  padding: 20px;
}

.show-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #CF1034;
}

.show-description {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 15px;
  color: #666;
}

.show-details {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.show-details p {
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #666;
}

.show-price {
  font-size: 1.2rem;
  font-weight: 600;
  color: #CF1034;
  margin-top: 10px;
}

.show-link {
  display: inline-block;
  padding: 10px 20px;
  background: #CF1034;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 15px;
  transition: background 0.3s ease;
}

.show-link:hover {
  background: #a00d29;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-top: 60px;
  color: #000;
}

@media (max-width: 1200px) {
  .container {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .hero__title {
    font-size: 36px;
  }
  
  .hero__subtitle {
    font-size: 20px;
  }
  
  .shows-grid {
    grid-template-columns: 1fr;
  }
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 40px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #CF1034;
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error State */
.error-state {
  text-align: center;
  padding: 40px;
  color: #CF1034;
}

.retry-button {
  margin-top: 20px;
  padding: 10px 20px;
  background: #CF1034;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.retry-button:hover {
  background: #a00d29;
}
</style>
