<template>
  <section class="quests">
    <ul class="quests__list">
      <li v-for="quest in quests" :key="quest.id" class="quests__el">
        <router-link :to="getQuestPath(quest.slug)" class="quest_link">
          <div class="age">{{ quest.age }}</div>
          <QuestsSlider :images="quest.images"/>
          <div class="quest_info">
            <div class="quest_title">{{ quest.name }}</div>
            <div class="quest_chars">
              <div class="players small">{{ quest.players }}</div>
              <div class="time small">{{ quest.time }}</div>
              <div class="mobile-address small">{{ quest.address }}</div>
            </div>
            <div class="booking">
              <button class="to_book" @click.prevent="goToAboutQuest(quest.slug)">Забронировать</button>
              <div class="contacts">
                <div class="address small">{{ quest.address }}</div>
              </div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script setup>
import {useRouter} from '@/composables/useRouter.js';
import {defineAsyncComponent} from "vue";

const router = useRouter();

const QuestsSlider = defineAsyncComponent(() => import("@/components/QuestsSlider.vue"));

const props = defineProps({
  quests: {
    type: Array,
    required: true
  },
  basePath: {
    type: String,
    required: true
  },
});

const getQuestPath = (slug) => {
  return `${props.basePath}/${slug}`;
};

const goToAboutQuest = (slug) => {
  router.push(getQuestPath(slug));
};
</script>

<style scoped>

.small {
  font-size: 0.9rem;
}

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

.players, .time, .mobile-address {
  opacity: 0.9;
}

.booking {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  border: none;
}

.to_book::before {
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
  max-width: 150px;
}

.mobile-address {
  display: none;
}

/* Медиа-запросы для адаптивности */
@media (max-width: 1200px) {
  .quests__list {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 1072px) {
  .to_book {
    width: 50%;
    padding: 8px 14px;
  }
}


@media (max-width: 992px) {
  .quests__list {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 15px;
  }

  .quest_title {
    font-size: 20px;
  }

  .quest_chars {
    gap: 10px;
  }

  .to_book {
    padding: 8px 20px;
    width: 60%;
  }
}

@media (max-width: 768px) {
  .quests__list {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 12px;
  }

  .quest_info {
    padding: 15px;
  }

  .quest_title {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .quest_chars {
    margin-bottom: 10px;
  }

  .booking {
    flex-direction: column-reverse;
    align-items: flex-end;
    gap: 10px;
  }

  .contacts {
    display: none;
  }

  .mobile-address {
    display: block;
  }

  .contact, .address {
    max-width: none;
  }

  .to_book {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .quests__list {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .quests__el {
    opacity: 1;
  }

  .quest_info {
    padding: 12px;
  }

  .quest_title {
    font-size: 16px;
  }

  .age {
    padding: 6px 15px;
    font-size: 12px;
  }
}
</style>