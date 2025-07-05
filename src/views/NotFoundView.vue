<script setup>
import { useHead } from "@unhead/vue";
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

useHead({
  title: "Страница не найдена · Чеширский КОД",
  titleTemplate: null
});
</script>

<template>
  <Header></Header>

  <main class="not-found">
    <div class="container">
      <div class="not-found__content">
        <h1 class="not-found__title">404</h1>
        <p class="not-found__subtitle">Упс! Страница не найдена</p>
        <p class="not-found__text">Похоже, такой страницы не существует или она была перемещена.</p>
        <router-link to="/" class="not-found__button">Вернуться на главную</router-link>
      </div>
    </div>
  </main>

  <Footer></Footer>
</template>

<style scoped>
.not-found {
  padding: 60px 0;
  text-align: center;
  background-color: #fff;
}

.not-found__content {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.not-found__title {
  font-size: 120px;
  font-weight: 700;
  color: #CF1034;
  margin: 0;
  line-height: 1;
}

.not-found__subtitle {
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin: 20px 0 10px;
}

.not-found__text {
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
}

.not-found__button {
  display: inline-block;
  padding: 12px 30px;
  background-color: #CF1034;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.not-found__button:hover {
  background-color: #a50d2a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(207, 16, 52, 0.3);
}

@media (max-width: 768px) {
  .not-found {
    padding: 40px 0;
  }

  .not-found__content {
    padding: 30px 20px;
  }

  .not-found__title {
    font-size: 80px;
    margin-bottom: 10px;
  }

  .not-found__subtitle {
    font-size: 24px;
  }

  .not-found__text {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .not-found__button {
    padding: 10px 25px;
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .not-found__title {
    font-size: 60px;
  }

  .not-found__subtitle {
    font-size: 20px;
  }

  .not-found__text {
    font-size: 15px;
    margin-bottom: 15px;
  }
}
</style>