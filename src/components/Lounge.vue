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
          <div class="lounge__overlay">
            <div class="lounge__info">
              <div class="lounge__address">
                <!-- <span class="icon"></span> -->
                {{ lounge.address }}
              </div>
              <div class="lounge__price">{{ lounge.price }}</div>
              <div class="lounge__players">
                <!-- <span class="icon">👥</span> -->
                {{ lounge.players }} гостей
              </div>
              <button class="lounge__book-btn">Забронировать</button>
            </div>
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
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.05), transparent);
}

.title {
  margin-bottom: 40px;
  text-align: center;
  font-size: 46px;
  color: #fff;
  position: relative;
  padding-bottom: 15px;
}

.lounge__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 20px;
}

.lounge__el {
  position: relative;
  min-height: 400px;
  border-radius: 20px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  transition: all 0.4s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.lounge__el:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.lounge__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2));
  opacity: 0;
  transition: opacity 0.4s ease;
  display: flex;
  align-items: flex-end;
  padding: 30px;
}

.lounge__el:hover .lounge__overlay {
  opacity: 1;
}

.lounge__info {
  color: #fff;
  width: 100%;
  transform: translateY(20px);
  transition: transform 0.4s ease;
}

.lounge__el:hover .lounge__info {
  transform: translateY(0);
}

.lounge__address,
.lounge__players {
  font-size: 16px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.lounge__price {
  font-weight: bold;
  font-size: 24px;
  color: #cf1034;
  background: #fff;
  width: fit-content;
  padding: 8px 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.lounge__book-btn {
  background-color: #cf1034;
  color: #fff;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 15px;
  position: relative;
  overflow: hidden;
}

.lounge__book-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.6),
    transparent
  );
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.lounge__book-btn:hover::before {
  left: 100%;
}

.lounge__book-btn:hover {
  box-shadow: 0 4px 15px rgba(207, 16, 52, 0.3);
}

.icon {
  font-size: 18px;
}

@media (max-width: 1024px) {
  .lounge__list {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .lounge {
    padding: 40px 0;
  }

  .title {
    font-size: 28px;
    margin-bottom: 30px;
  }

  .lounge__list {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 10px;
  }

  .lounge__el {
    min-height: 350px;
  }

  .lounge__overlay {
    opacity: 1;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4));
  }

  .lounge__info {
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .lounge__el {
    min-height: 300px;
  }

  .lounge__price {
    font-size: 20px;
    padding: 6px 12px;
  }

  .lounge__address,
  .lounge__players {
    font-size: 14px;
  }

  .lounge__book-btn {
    padding: 10px 20px;
    font-size: 14px;
  }
}
</style>