<template>
  <div class="show-details">
    <Header></Header>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Загрузка информации о шоу...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="loadShow" class="retry-button">Повторить</button>
    </div>

    <!-- Content -->
    <div v-else-if="show" class="show-content">
      <!-- Hero Section -->
      <section class="hero" :style="{ backgroundImage: `url(${show.detailImage})` }">
        <div class="container">
          <h1 class="hero__title">{{ show.name }}</h1>
        </div>
      </section>

      <!-- Main Content -->
      <section class="main-content">
        <div class="container">
          <div class="content-grid">
            <!-- Left Column -->
            <div class="main-info">
              <div class="card">
                <h2 class="card__title">Описание</h2>
                <p class="description">{{ show.detailText }}</p>
              </div>

              <div class="card">
                <h2 class="card__title">Детали</h2>
                <div class="details-list">
                  <div class="detail-item">
                    <strong>Длительность:</strong>
                    <span>{{ show.duration }}</span>
                  </div>
                  <div class="detail-item">
                    <strong>Актеры:</strong>
                    <span>{{ show.actor }}</span>
                  </div>
                  <div class="detail-item">
                    <strong>Музыка:</strong>
                    <span>{{ show.music }}</span>
                  </div>
                  <div class="detail-item">
                    <strong>Локация:</strong>
                    <span>{{ show.location }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div class="side-info">
              <div class="card">
                <h2 class="card__title">Стоимость</h2>
                <div class="price">{{ show.price }} ₽</div>
                <button class="book-button">Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <Footer></Footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import axios from 'axios'

const route = useRoute()
const show = ref(null)
const loading = ref(true)
const error = ref(null)

const loadShow = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await axios.get(`https://chezakod.ru/api/v2/show/${route.params.id}`)
    if (response.data.status && response.data.result) {
      show.value = {
        id: response.data.result.id,
        name: response.data.result.name,
        detailImage: response.data.result.detail_image,
        detailText: response.data.result.detail_text?.replace(/<[^>]*>/g, '') || '',
        price: response.data.result.price,
        location: response.data.result.location,
        video: response.data.result.video,
        actor: response.data.result.actor,
        duration: response.data.result.duration,
        music: response.data.result.music,
        photo: response.data.result.photo,
        elements: response.data.result.elements
      }
    } else {
      throw new Error('Неверный формат данных от сервера')
    }
  } catch (err) {
    console.error('Ошибка при загрузке шоу:', err)
    error.value = 'Не удалось загрузить информацию о шоу. Пожалуйста, попробуйте позже.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadShow()
})
</script>

<style scoped>
.show-details {
  background-color: #f8f9fa;
}

.hero {
  background-size: cover;
  background-position: center;
  color: white;
  padding: 100px 0;
  text-align: center;
  position: relative;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
}

.hero__title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
  position: relative;
}

.container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.main-content {
  padding: 60px 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.card__title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #CF1034;
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
}

.details-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.detail-item:last-child {
  border-bottom: none;
}

.price {
  font-size: 2rem;
  font-weight: bold;
  color: #CF1034;
  margin-bottom: 20px;
}

.book-button {
  width: 100%;
  padding: 15px;
  background: #CF1034;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.book-button:hover {
  background: #a00d29;
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

@media (max-width: 1200px) {
  .container {
    width: 100%;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero__title {
    font-size: 36px;
  }
  
  .card {
    padding: 20px;
  }
}
</style> 