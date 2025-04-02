<template>
  <section class="quests">
    <div class="container">
      <ul class="quests__list">
        <li v-for="quest in quests" :key="quest.id" class="quests__el">
          <router-link :to="`/quests/${quest.id}`" class="quest_link">
            <div class="age">{{ quest.age }}</div>
            <QuestsSlider :images="quest.images" />
            <div class="quest_info">
              <div class="quest_title">{{ quest.name }}</div>
              <div class="quest_chars">
                <div class="players">{{ quest.players }}</div>
                <div class="time">{{ quest.time }}</div>
                <div class="difficulty">{{ quest.difficulty }}</div>
              </div>
              <div class="booking">
                <btn class="to_book">Забронировать</btn>
                <div class="contacts">
                  <div class="contact">{{ quest.contact }}</div>
                  <div class="address">{{ quest.address }}</div>
                </div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import QuestsSlider from "@/components/QuestsSlider.vue";

defineProps({
  quests: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.quests__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.quests__el {
  position: relative;
  background-color: var(--primary-color);
  height: 500px;
  border-radius: 10px;
  transition: opacity var(--transition-duration) ease;
  overflow: hidden;
  opacity: 0.9;
}

.quests__el:hover {
  opacity: 1;
}

.quest_link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.age {
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: #cf1034;
  color: #fff;
  padding: 8px 20px;
  border-radius: 0 0 0 7.5px;
  font-size: 14px;
  z-index: 2;
}

.quest_info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  padding: 20px;
  color: #fff;
  z-index: 1;
}

.quest_title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}
.booking{
  display: flex;
  justify-content: space-between;
  align-items: end;
}
.to_book {
  display: inline-block;
  background-color: var(--primary-color);
  color: #fff;
  padding: 10px 30px;
  border-radius: 7.5px;
  font-size: 16px;
  cursor: pointer;
  margin: 10px 0;
  height: 45px;
  transition: background-color 0.3s ease;
}

.to_book:hover {
  background-color: darken(var(--primary-color), 10%);
}

.contact,
.address {
  font-size: 14px;
  margin-bottom: 5px;
  max-width: 150px;
}

@media (max-width: 450px) {
  .quests__list {
    display: flex;
    flex-direction: column;
  }

  .quest_info {
    padding: 15px;
  }

  .quest_title {
    font-size: 20px;
  }

  .to_book {
    font-size: 14px;
    padding: 8px 16px;
  }

  .contact,
  .address {
    font-size: 12px;
  }
}
</style>