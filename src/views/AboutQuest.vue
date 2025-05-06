<template>
  <Header />
  <div class="quest-page">
    <template v-if="quest">
      <!-- Заголовок квеста -->
      <div class="quest-header" :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${headerImage})` }">
        <div class="container">
          <div class="quest-info">
            <div class="quest-title-wrapper">
              <h1 class="name-quest">{{ quest.name }}</h1>
              <button class="to-book">Забронировать</button>
              <!-- <div class="age-badge">{{ quest.age }}</d  iv> -->
            </div>
            <div class="quest-chars">
              <div class="char-item">
                <img :src="players" alt="Players" />
                <span>{{ quest.players }}</span>
              </div>
              <div class="char-item">
                <img :src="time" alt="Time" />
                <span>{{ quest.time }}</span>
              </div>
              <div class="char-item">
                <img :src="difficulty" alt="Difficulty" />
                <span>{{ quest.difficulty }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Основной контент -->
      <div class="container">
        <div class="quest-content">
          <!-- Слайдер -->
          <div class="slider">
            <ImgSlider :images="quest.images" />
           
          </div>

          <!-- Описание -->
          <div class="quest-description">
            <h2 class="section-title">Описание квеста</h2>
            <p class="description">{{ quest.description }}</p>
        <!-- Блок Ограничения -->


              <button class="to-book">Забронировать</button>
          </div>
        </div>
      <!-- Ограничения -->
      <div class="quest-restrictions">
        <h2 class="section-title">Ограничения</h2>
        <ul class="restriction-list">
          <li v-for="(rule, index) in quest.restrictions" :key="index" class="restriction-item">
            
            <span class="restriction-icon-wrapper">
              <span class="restriction-icon">!</span>
            </span>
            <span>{{ rule }}</span>
          </li>
        </ul>
      </div>

        <!-- Дополнительные услуги -->
        <div class="options">
          <h2 class="section-title">Дополнительные услуги</h2>
          <div class="options-list">
            <div v-for="(option, index) in options" :key="index" class="option-item">
              <div class="option-item__header">
                <img :src="option.icon" alt="Icon" class="option-item__image" />
                <span class="option-item__name">{{ option.name }}</span>
              </div>
              <p class="option-item__desc">{{ option.description }}</p>
            </div>
          </div>
        </div>

        <!-- Похожие квесты -->
        <div class="likes">
          <div class="container">
            <h2 class="section-title">Вам также может понравиться</h2>
            <Quests :quests="likes" />
          </div>
        </div>

        <!-- Контакты -->
        <div class="contacts">
          <h2 class="section-title">Контакты</h2>
          <div class="contacts-info">
            <div class="contact-item">
              <img src="@/assets/images/icon__quest-1.png" alt="Phone" class="contact-icon" />
              <p class="phone">{{ quest.contact }}</p>
            </div>
            <div class="contact-item">
              <img src="@/assets/images/icon__quest-2.png" alt="Location" class="contact-icon" />
              <p class="way">Подобрать маршрут</p>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="quest-not-found">
      <h1>Квест не найден</h1>
      <p>Извините, запрашиваемый квест не существует.</p>
      <router-link to="/quests" class="back-link">Вернуться к списку квестов</router-link>
    </div>
  </div>
  <Map></Map>
  <Footer />
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Quests from "@/components/Quests.vue";
import ImgSlider from "@/components/ImgSlider.vue";

// Импортируем изображения
import quest1Image from '@/assets/images/quest__1.jpg';
import quest1Image2 from '@/assets/images/quest__1(2).jpg';
import quest2Image from '@/assets/images/quest__2.jpg';
import quest2Image2 from '@/assets/images/quest__2(2).jpg';
import quest2Image3 from '@/assets/images/quest__2(3).jpg';
import quest3Image from '@/assets/images/quest__3.jpg';
import quest3Image2 from '@/assets/images/quest__3(2).jpg';
import quest3Image3 from '@/assets/images/quest__3(3).jpg';
import quest4Image from '@/assets/images/quest__4.gif';
import quest4Image2 from '@/assets/images/quest__4(2).gif';
import quest4Image3 from '@/assets/images/quest__4(3).gif';
import quest5Image from '@/assets/images/quest__5.jpg';
import quest5Image2 from '@/assets/images/quest__5(2).jpg';
import quest6Image from '@/assets/images/quest__6.jpg';
import quest6Image2 from '@/assets/images/quest__6(2).jpg';
import quest6Image3 from '@/assets/images/quest__6(3).jpg';
import quest7Image from '@/assets/images/quest__7.jpg';
import quest7Image2 from '@/assets/images/quest__7(2).jpg';
import quest8Image from '@/assets/images/quest__8.jpg';
import quest8Image2 from '@/assets/images/quest__8(2).jpg';
import quest8Image3 from '@/assets/images/quest__8(3).jpg';
import quest9Image from '@/assets/images/quest__9.jpg';
import quest9Image2 from '@/assets/images/quest__9(2).jpg';
import quest9Image3 from '@/assets/images/quest__9(3).jpg';
import icon1 from '@/assets/images/icon__quest-1.png';
import icon2 from '@/assets/images/icon__quest-2.png';
import players from '@/assets/images/players.png';
import time from '@/assets/images/time.png';
import difficulty from '@/assets/images/difficulty.png';
const route = useRoute();
const currentIndex = ref(0);
const likes = [
  {
    id: 8,
    name: 'Семейка Аддамс',
    age: '12+',
    images: [quest6Image, quest6Image2, quest6Image3],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Средний',
    contact: '+7 (391) 269-92-23',
    address: 'ул. Белинского, 8 ТРЦ "Комсомолл" 3 этаж',
  },
  {
    id: 2,
    name: 'Корабль-Призрак',
    age: '12+',
    images: [quest2Image, quest2Image2, quest2Image3],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Средний',
    contact: '+7 (391) 269-92-23',
    address: 'ул. Белинского, 8 ТРЦ "Комсомолл" 3 этаж',
  },
  {
    id: 3,
    name: 'Станция "Логос"',
    age: '14+',
    images: [quest3Image, quest3Image2, quest3Image3],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Сложный',
    contact: '+7 (391) 269-92-23',
    address: 'ул. Алексеева, 113',
  },
];

const quests = [
  {
    id: 1,
    name: 'Башня Франкенштейна',
    age: '7+',
    images: [quest1Image, quest1Image2],
    players: '2-4 игрока',
    time: '60 минут',
    difficulty: 'Средний',
    contact: '+7 (391) 986-85-16',
    restrictions: [
"Нельзя на каблуках",
"Нельзя людям, использующим кардиостимулятор",
"Нельзя в состоянии алкогольного или наркотического опьянения",
"Дети от 7 до 12 лет могут играть в сопровождении взрослого или аниматора"
],
    description:
        'Несколько десятков лет прошло с тех пор, как история чудовища, созданного ученым Виктором Франкенштейном, потрясла всю округу. Замок ученого пустовал. Люди стали забывать холодящие спину от ужаса истории.\n' +
        '\n' +
        '       Но в последнее время ночами в одной из башен замка кто-то стал зажигать огонь. Свет горит в лаборатории Франкенштейна.\n' +
        '\n' +
        '       Ходят слухи, что последователь Виктора вернулся ради какой-то зловещей цели. Местные жители не выходят из дома в темное время суток, опасаясь стать жертвой во имя новой жизни нового чудовища. Очень жаль, что вы с друзьями не восприняли эти слухи всерьез…',
  },
  {
    id: 2,
    name: 'Корабль-Призрак',
    age: '12+',
    images: [quest2Image, quest2Image2, quest2Image3],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Средний',
    contact: '+7 (391) 269-92-23',
  "restriction": [
"Дети от 8 до 14 лет могут играть в сопровождении взрослого или аниматора",
"Нельзя на каблуках; в состоянии алкогольного или наркотического опьянения"
],
    description: 'Вы - команда исследователей, которая отправилась на поиски затерянного корабля. Легенды гласят, что на его борту находится сокровище невероятной ценности. Однако, когда вы находите корабль, оказывается, что он не так уж и пуст...',
  },
  {
    id: 3,
    name: 'Станция "Логос"',
    age: '14+',
    images: [quest3Image, quest3Image2, quest3Image3],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Сложный',
    contact: '+7 (391) 269-92-23',
    restrictions: [
      "Дети от 8 до 14 лет могут играть в сопровождении взрослого или аниматора",
      "Нельзя на каблуках; в состоянии алкогольного или наркотического опьянения"
      ],
    description: 'Вы - команда ученых, отправленная на заброшенную космическую станцию "Логос". Ваша задача - выяснить, что случилось с предыдущей экспедицией и восстановить работу станции. Но чем глубже вы проникаете в тайны станции, тем больше понимаете, что здесь происходит что-то необъяснимое...',
  },
  {
    id: 4,
    name: 'Афера века',
    age: '12+',
    images: [quest4Image, quest4Image2, quest4Image3],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Средний',
    contact: '+7 (391) 269-92-23',
    restrictions: [
"Дети от 8 до 14 лет могут играть в сопровождении взрослого или аниматора",
"Нельзя на каблуках; в состоянии алкогольного или наркотического опьянения"
],
    description: 'Вы - команда профессиональных мошенников, которым предстоит провернуть самую грандиозную аферу в истории. Но чтобы добиться успеха, вам нужно разгадать множество загадок и обойти все системы безопасности...',
  },
  {
    id: 5,
    name: 'Петля времени',
    age: '14+',
    images: [quest5Image, quest5Image2],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Средний',
    contact: '+7 (391) 269-92-23',
    restrictions: [
"Дети от 8 до 14 лет могут играть в сопровождении взрослого или аниматора",
"Нельзя на каблуках; в состоянии алкогольного или наркотического опьянения"
],
    description: 'Вы случайно активировали устройство, которое перенесло вас в прошлое. Теперь вам нужно найти способ вернуться в настоящее, но каждое ваше действие может изменить будущее...',
  },
  {
    id: 6,
    name: 'Логово Великана',
    age: '12+',
    images: [quest6Image, quest6Image2, quest6Image3],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Средний',
    contact: '+7 (391) 269-92-23',
    description: 'Вы - команда исследователей, отправившаяся в древнее логово великана. Легенды гласят, что здесь спрятаны несметные сокровища, но путь к ним охраняют древние ловушки и загадки...',
  },
  {
    id: 7,
    name: 'Мумия. В поисках артефакта',
    age: '12+',
    images: [quest7Image, quest7Image2],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Средний',
    contact: '+7 (391) 269-92-23',
    restrictions: [
"Дети от 8 до 14 лет могут играть в сопровождении взрослого или аниматора",
"Нельзя на каблуках; в состоянии алкогольного или наркотического опьянения"
],
    description: 'Вы - команда археологов, отправившаяся в древнюю гробницу в поисках легендарного артефакта. Но когда вы проникаете внутрь, оказывается, что гробница не так уж и пуста...',
  },
  {
    id: 8,
    name: 'Семейка Аддамс',
    age: '12+',
    images: [quest8Image, quest8Image2, quest8Image3],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Средний',
    contact: '+7 (391) 269-92-23',
    restrictions: [
"Дети от 8 до 14 лет могут играть в сопровождении взрослого или аниматора",
"Нельзя на каблуках; в состоянии алкогольного или наркотического опьянения"
],
    description: 'Вы - гости в доме семейства Аддамс. Но что-то пошло не так, и теперь вам нужно найти способ выбраться из этого странного дома, разгадывая загадки и преодолевая препятствия...',
  },
  {
    id: 9,
    name: 'Джуманджи',
    age: '12+',
    images: [quest9Image, quest9Image2, quest9Image3],
    players: '2-6 игрока',
    time: '60 минут',
    difficulty: 'Средний',
    contact: '+7 (391) 269-92-23',
    restrictions: [
"Дети от 8 до 14 лет могут играть в сопровождении взрослого или аниматора",
"Нельзя на каблуках; в состоянии алкогольного или наркотического опьянения"
],
    description: 'Вы случайно активировали древнюю игру Джуманджи, и теперь вам нужно пройти все испытания, чтобы вернуться в реальный мир. Но будьте осторожны - каждое ваше действие может иметь непредсказуемые последствия...',
  }
];
// Текущий квест
const quest = computed(() => {
  const questId = parseInt(route.params.id);
  const foundQuest = quests.find((q) => q.id === questId);
  if (!foundQuest) {
    console.error(`Quest with ID ${questId} not found.`);
    return null;
  }
  return foundQuest;
});

// Изображения
const headerImage = computed(() => quest.value?.images[0]);
const currentImage = computed(() => quest.value?.images[currentIndex.value]);

// Переключение изображений
const nextImage = () => {
  if (quest.value) {
    currentIndex.value = (currentIndex.value + 1) % quest.value.images.length;
  }
};

const prevImage = () => {
  if (quest.value) {
    currentIndex.value = (currentIndex.value - 1 + quest.value.images.length) % quest.value.images.length;
  }
};

// Дополнительные услуги
const options = [
  {
    name: 'Инструктор',
    icon: icon1,
    description:
        'Максимум драйва и безопасности! Инструктор погрузит вас в сюжет.',
  },
  {
    name: 'Фотограф',
    icon: icon2,
    description: 'Профессиональный фотограф запечатлеет моменты.',
  },
];
</script>

<style scoped>
.quest-restrictions {
  padding: 30px;
  background-color: #2a2a2a;
  border-radius: 20px;
  margin-bottom: 60px;
}

.restriction-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.restriction-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 1.05rem;
  line-height: 1.6;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.restriction-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.restriction-icon-wrapper {
  width: 30px;
  height: 30px;
  background-color: #cf1034;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.restriction-icon {
  width: 16px;
  height: 16px;
}

.quest-page {
  color: #fff;
  padding: 20px;
  background-color: #1a1a1a;
}

.quest-header {
  height: 500px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  margin-bottom: 40px;
  position: relative;
}

.quest-header .container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.quest-info {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.quest-chars {
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
  align-self: flex-end;
}

.quest-title-wrapper {
  gap: 20px;
  margin-bottom: 20px;
}

.name-quest {
  font-size: 3rem;
  margin: 0;
  font-weight: 700;
}

.age-badge {
  background-color: #cf1034;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: 600;
}

.char-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
}

.char-item img {
  width: 24px;
  height: 24px;
}

.to-book {
  background-color: #cf1034;
  color: white;
  border: none;
  padding: 15px 50px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 600;
}

.to-book:hover {
  background-color: #a50d2a;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(207, 16, 52, 0.3);
}

.quest-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 60px;
}

.slider {
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
}

.slider :deep(.owl-carousel) {
  height: 100%;
}

.slider :deep(.owl-carousel .item) {
  height: 100%;
}

.slider :deep(.owl-carousel img) {
  height: 100%;
  object-fit: cover;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 15px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100px;
  height: 3px;
  background-color: #cf1034;
}

.quest-description {
  padding: 30px;
  background-color: #2a2a2a;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
}

.description {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 30px;
}

.booking-section {
  text-align: center;
  padding: 30px;
  background-color: rgba(207, 16, 52, 0.1);
  border-radius: 15px;
  margin-top: auto;
}

.booking-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.options {
  margin-bottom: 60px;
}

.options-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.option-item {
  background-color: #2a2a2a;
  padding: 30px;
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.option-item:hover {
  transform: translateY(-5px);
}

.option-item__header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.option-item__image {
  width: 40px;
  height: 40px;
}

.option-item__name {
  font-size: 1.2rem;
  font-weight: 600;
}

.option-item__desc {
  font-size: 1rem;
  line-height: 1.6;
  color: #ccc;
}

.contacts {
  background-color: #2a2a2a;
  padding: 40px;
  border-radius: 20px;
  margin-bottom: 40px;
}

.contacts-info {
  display: flex;
  gap: 40px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.contact-icon {
  width: 24px;
  height: 24px;
}

.phone, .way {
  font-size: 1.1rem;
  margin: 0;
}

.quest-not-found {
  text-align: center;
  padding: 100px 20px;
  color: #fff;
}

.quest-not-found h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.quest-not-found p {
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.back-link {
  display: inline-block;
  background-color: #cf1034;
  color: white;
  padding: 15px 30px;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 600;
}

.back-link:hover {
  background-color: #a50d2a;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(207, 16, 52, 0.3);
}

@media (max-width: 768px) {
  .quest-content {
    grid-template-columns: 1fr;
  }

  .quest-header {
    height: 400px;
  }

  .name-quest {
    font-size: 2rem;
  }

  .quest-chars {
    flex-direction: column;
    gap: 15px;
  }

  .contacts-info {
    flex-direction: column;
    gap: 20px;
  }

  .options-list {
    grid-template-columns: 1fr;
  }
}
</style>