<template>
  <section class="quests">
    <div class="container">
      <ul class="quests__list">
        <li v-for="quest in quests" :key="quest.id" class="quests__el">
          <router-link :to="basePath + '/' + quest.id" class="quest_link">
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
                <button class="to_book" @click.prevent="goToAboutQuest(quest.id)">Забронировать</button>
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
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  quests: {
    type: Array,
    required: true
  },
  basePath: {
    type: String,
    required: true
  }
});

const goToAboutQuest = (questId) => {
  router.push(props.basePath + '/' + questId);
};
</script>

<style scoped>
.quests__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.quests__el {
  position: relative;
  background-color: var(--primary-color);
  height: 500px;
  border-radius: 10px;
  transition: all var(--transition-duration) ease;
  overflow: hidden;
  opacity: 0.9;
}

.quests__el:hover {
  opacity: 1;
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.quest_link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.age {
  position: absolute;
  top: 0;
  right: 0;
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

.quest_chars {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.players, .time, .difficulty {
  font-size: 14px;
  opacity: 0.9;
}

.booking {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-top: 10px;
}

.to_book {
  display: inline-block;
  background-color: var(--primary-color);
  color: #fff;
  padding: 10px 30px;
  border-radius: 7.5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}
.to_book::before{
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.to_book:hover::before {
  left: 100%;
}

.contacts {
  text-align: right;
}

.contact, .address {
  font-size: 14px;
  margin-bottom: 5px;
  max-width: 150px;
}

@media (max-width: 768px) {
  .quests__list {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .quests__el {
    height: 450px;
  }

  .quest_title {
    font-size: 20px;
  }

  .quest_chars {
    gap: 10px;
  }

  .to_book {
    padding: 8px 20px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .quests__list {
    grid-template-columns: 1fr;
  }

  .quests__el {
    height: 400px;
  }

  .quest_info {
    padding: 15px;
  }

  .quest_title {
    font-size: 18px;
  }

  .booking {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .contacts {
    text-align: left;
  }
}
</style>