<template>
  <Header />
  <div class="action-game-page">
    <template v-if="game">
      <!-- Заголовок игры -->
      <div class="game-header" :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${headerImage})` }">
        <div class="container">
          <div class="game-info">
            <div class="game-title-wrapper">
              <h1 class="name-game">{{ game.name }}</h1>
              <button class="to-book">Забронировать</button>
            </div>
            <div class="game-chars">
              <div class="char-item">
                <img :src="players" alt="Players" />
                <span>{{ game.players }}</span>
              </div>
              <div class="char-item">
                <img :src="time" alt="Time" />
                <span>{{ game.time }} мин</span>
              </div>
              <div class="char-item">
                <img :src="difficulty" alt="Difficulty" />
                <span>{{ game.difficulty }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Основной контент -->
      <div class="container">
        <div class="game-content">
          <!-- Слайдер -->
          <div class="slider">
            <ImgSlider :images="game.images" />
          </div>

          <!-- Описание -->
          <div class="game-description">
            <h2 class="section-title">Описание игры</h2>
            <div class="description" v-html="game.description"></div>
            <button class="to-book">Забронировать</button>
          </div>
        </div>

        <!-- Ограничения -->
        <div class="game-restrictions" v-if="game.restrictions && game.restrictions.length">
          <h2 class="section-title">Ограничения</h2>
          <ul class="restriction-list">
            <li v-for="(rule, index) in game.restrictions" :key="index" class="restriction-item">
              <div class="restriction-icon-wrapper">
                <img src="@/assets/images/icon_restriction.svg" alt="!" class="restriction-icon" />
              </div>
              <span>{{ rule }}</span>
            </li>
          </ul>
        </div>

        <!-- Дополнительные услуги -->
        <div class="options" v-if="game.services && game.services.length">
          <h2 class="section-title">Дополнительные услуги</h2>
          <div class="options-list">
            <div v-for="(service, index) in game.services" :key="index" class="option-item">
              <div class="option-item__header">
                <img :src="getServiceIcon(service)" alt="Icon" class="option-item__image" />
                <span class="option-item__name">{{ service }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Контакты -->
        <div class="contacts">
          <h2 class="section-title">Контакты</h2>
          <div class="contacts-info">
            <div class="contact-item">
              <img src="@/assets/images/icon__quest-1.png" alt="Phone" class="contact-icon" />
              <p class="phone">{{ game.contact }}</p>
            </div>
            <div class="contact-item">
              <img src="@/assets/images/icon__quest-2.png" alt="Location" class="contact-icon" />
              <p class="way">{{ game.address }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="game-not-found">
      <h1>Игра не найдена</h1>
      <p>Извините, запрашиваемая игра не существует.</p>
      <router-link to="/action-games" class="back-link">Вернуться к списку игр</router-link>
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
import ImgSlider from "@/components/ImgSlider.vue";
import Map from "@/components/Map.vue";

// Импортируем изображения
import players from '@/assets/images/players.png';
import time from '@/assets/images/time.png';
import difficulty from '@/assets/images/difficulty.png';

import img1 from '@/assets/images/sl1.jpg';
import img2 from '@/assets/images/sl2.jpg';
import img3 from '@/assets/images/sl3.jpg';
import img4 from '@/assets/images/jmurki.jpg';
import img5 from '@/assets/images/jmurki2.jpg';
import img6 from '@/assets/images/jmurki3.jpg';
import img7 from '@/assets/images/playkod1.jpeg';
import img8 from '@/assets/images/playkod2.jpeg';

const route = useRoute();

const games = [
  {
    id: "14428",
    name: "Жмурки",
    players: "4-4",
    time: "60",
    difficulty: "Легкий",
    images: [img4, img5, img6],
    address: "ул. Ленина, 1",
    contact: '+7 (391) 986-85-16',
    services: ["Инструктор", "Аниматор"],
    restrictions: [
      "Нельзя в состоянии алкогольного или наркотического опьянения",
      "!!! Минимальное количество игроков 4 человека"
    ],
    description: "«Жмурки» - это экшн-игра, похожая на прятки в темноте, но в современной адаптации <br>\r\n На площади более 200 м² мы реализовали пространство, где игроки сами творцы своих эмоций. <br>\r\n Двухэтажный бесконечный лабиринт наполнен укромными местами, необычными предметами, различными электронными ловушками, тактильными поверхностями, объемным звуком и другими спецэффектами. <br>\r\n <br>\r\n Участники игры делятся на две команды: \"Охотники\" и \"Тени\", которые потом меняются местами. Тени испытывают дикий страх перед охотниками, их задача надежно спрятаться и дожить до утра. Задача Охотников - поймать всех Теней. <br>\r\n <br>\r\n В течение 60 минут, которые длится игра, вы забудете о времени и о внешнем мире, а загадочные ночные обитатели лабиринта усилят градус напряжения и не дадут вам расслабиться ни на секунду. А мягкие полы, обшитые углы и ровные поверхности обеспечат безопасность для самых активных и юных игроков.<br>\r\n <br>\r\nВ игре возможны различные сценарии, которые подойдут для любого возраста и любого количества игроков."
  },
  {
    id: "11519850",
    name: "ACTION:KOD",
    players: "2-4",
    time: "70",
    difficulty: "Легкий",
    images: [img1, img2, img3],
    address: "ул. Ленина, 1",
    contact: '+7 (391) 986-85-16',
    services: [
      "Инструктор",
      "Профессиональный фотограф",
      "Будьте в центре событий!",
      "Lounge зона"
    ],
    restrictions: [
      "Обязательна спортивная обувь",
      "Дети от 7 до 12 лет играют в сопровождении инструктора",
      "Нельзя в состоянии алкогольного опьянения",
      "Ограничение по весу участника до 100кг."
    ],
    description: "ActionKOD — это не просто квест, а революция в мире приключений!<br>\r\n <br>\r\n Что вас ждет:<br>\r\n<ul>\r\n\t<li><b>10 уникальных локаций</b> с нестандартными испытаниями, где каждый шаг — это новый вызов!</li>\r\n\t<li><b>Инновационные технологии</b>, разработанные в Красноярске, которые погружают в атмосферу игры и делают её незабываемой.</li>\r\n\t<li>Идеальный баланс: <b>логические задачи + физическая активность</b>, чтобы развлечься и проверить свою команду на прочность.</li>\r\n\t<li>Все ваши достижения и рекорды сохраняются в <b>персональном боте</b> — следите за прогрессом, соревнуйтесь и улучшайте свои результаты!</li>\r\n\t<li><b>Повторные игры?</b> Легко! Каждый раз вас ждут новые испытания и возможности.</li>\r\n\t<li>Играть можно в <b>командах до 6 человек</b>. Одновременно на арене могут быть <b>до 6&nbsp;команд</b> — настройтесь на командную борьбу!</li>\r\n</ul>\r\n <br>\r\n ActionKOD — это игра, которая бросает вызов вашему уму и телу, заставляет работать в команде и дарит массу эмоций. Готовы испытать себя?<br>\r\n <br>\r\n <b><span style=\"color: #fdc68c;\">Квест относится к спортивным экшн-играм. Удобная одежда, спортивная сменная обувь - обязательно.</span></b><br>\r\n <br>"
  },
  {
    id: "12507544",
    name: "PLAY KOD",
    players: "1-6",
    time: "50",
    difficulty: "Легкий",
    images: [img7, img8],
    address: "ул. Ленина, 1",
    contact: '+7 (391) 986-85-16',
    services: [],
    restrictions: [],
    description: "<h4><br>\r\n </h4>\r\n<h4>Цель игры:</h4>\r\n <br>\r\n Игроки могут соревноваться друг с другом или объединять усилия в динамичных мини-играх, чтобы набрать максимум баллов и пройти как можно больше уровней. Быстрая реакция, стратегия и командная работа – ключ к победе!<br>\r\n<h4><br>\r\n </h4>\r\n<h4>Главные фишки интерактивного пола:</h4>\r\n <br>\r\n ✔ Командная и соревновательная игра – выбирайте: играть вместе или сражаться друг против друга!<br>\r\n ✔ Много мини-игр – прыгай, бегай, уворачивайся и используй смекалку!<br>\r\n ✔ Для всех возрастов – подойдет как детям от 3 лет, так и взрослым!<br>\r\n ✔ Безопасность и движение – активное развлечение без сложного инвентаря.<br>\r\n ✔ Современные технологии – сенсоры реагируют на движения, создавая эффект полного погружения.<br>\r\n<h4><br>\r\n </h4>\r\n<h4>Кому подойдет?</h4>\r\n <br>\r\n<ul>\r\n\t<li>Семейный отдых – веселая игра для детей и родителей.</li>\r\n\t<li>Дни рождения – оригинальный формат активного праздника.</li>\r\n\t<li>Корпоративные мероприятия – тимбилдинг и соревнования.</li>\r\n\t<li>Любителям современных игр – новый опыт в мире интерактивных развлечений!</li>\r\n</ul>\r\n <br>\r\nГотовы испытать свою реакцию и командный дух? Попробуйте интерактивный пол и станьте чемпионом! ??"
  }
];

// Текущая игра
const game = computed(() => {
  const gameId = route.params.id;
  return games.find((g) => g.id === gameId);
});

// Изображения
const headerImage = computed(() => game.value?.images[0]);

const getServiceIcon = (service) => {
  const icons = {
    "Инструктор": "@/assets/icon__quest-1.png",
    "Аниматор": "@/assets/icon__quest-1.png",
    "Профессиональный фотограф": "@/assets/icon__quest-2.png",
    "Будьте в центре событий!": "@/assets/icon__quest-1.png",
    "Lounge зона": "@/assets/icon__quest-2.png"
  };
  return icons[service] || "@/assets/icon__quest-1.png";
};
</script>

<style scoped>
.action-game-page {
  color: #fff;
  padding: 20px;
  background-color: #1a1a1a;
  font-family: 'Rubik';
}

.game-header {
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

.game-header .container {

  display: flex;
  justify-content: space-between;
}

.game-info {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.game-chars {
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
  align-self: flex-end;
}

.game-title-wrapper {
  gap: 20px;
  margin-bottom: 20px;
}

.name-game {
  font-size: 3rem;
  margin: 0;
  font-weight: 700;
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

.game-content {
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

.game-description {
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

.game-restrictions {
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
}

.option-item__image {
  width: 40px;
  height: 40px;
}

.option-item__name {
  font-size: 1.2rem;
  font-weight: 600;
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

.game-not-found {
  text-align: center;
  padding: 100px 20px;
  color: #fff;
}

.game-not-found h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.game-not-found p {
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
  .game-content {
    grid-template-columns: 1fr;
  }

  .game-header {
    height: 400px;
  }

  .name-game {
    font-size: 2rem;
  }

  .game-chars {
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