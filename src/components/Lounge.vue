<template>
  <section class="lounge">
    <div class="container">
      <h1 class="title">Лаундж зоны</h1>
      <div class="lounge__list">
        <div
            v-for="lounge in lounges"
            :key="lounge.id"
            class="lounge__el"
            :style="{ backgroundImage: `url(${lounge.image})` }"
        >
          <div class="lounge__info">
            <div class="lounge__address">{{ lounge.address }}</div>
            <div class="lounge__price">{{ lounge.price }}</div>
            <div class="lounge__players">{{ lounge.players }} гостей</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  lounges: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.lounge {
  padding: 60px 0;
}

.title {
  margin-bottom: 40px;
  text-align: center;
  font-size: 32px;
  color: #fff;
}

.lounge__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.lounge__el {
  position: relative;
  min-height: 300px;
  border-radius: var(--border-radius);
  overflow: hidden;
  background-size: cover;
  background-position: center;
  transition: transform var(--transition-duration) ease, opacity var(--transition-duration) ease;
  opacity: 0.4;

}

.lounge__el:hover {
  transform: scale(1.05);
  opacity: 1;
}

.lounge__info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  padding: 20px;
  color: #fff;
  opacity: 1;
  z-index: 2;
  transition: opacity var(--transition-duration) ease;
}

.lounge__el:hover .lounge__info {
  opacity: 1;
}

.lounge__address,
.lounge__price,
.lounge__players {
  margin-bottom: 10px;
  font-size: 16px;
}

.lounge__price {
  font-weight: bold;
  font-size: 24px;
  color: #cf1034;
  background: #FFFFFF;
  width: fit-content;
  padding: 5px;
  border-radius: 10px;
}

.lounge__players {
  font-style: italic;
}

@media (max-width: 768px) {
  .lounge__list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 450px) {
  .lounge__list {
    grid-template-columns: 1fr;
  }

  .lounge__info {
    opacity: 1; /* Всегда показываем информацию на мобильных устройствах */
  }
}
</style>