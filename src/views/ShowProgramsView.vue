<template>
  <Header />
  <section class="show-programs">
    <div class="container">
      <h1 class="page-title">Шоу программы</h1>
      
      <!-- Mini Programs Section -->
      <div class="section">
        <h2 class="section-title">Мини программы</h2>
        <div class="mini-programs-grid">
          <div v-for="program in miniPrograms" :key="program.id" class="mini-program-card">
            <div class="mini-program-card__image">
              <img :src="program.image" :alt="program.name">
            </div>
            <div class="mini-program-card__content">
              <h3 class="mini-program-card__title">{{ program.name }}</h3>
              <p class="mini-program-card__description">{{ program.description }}</p>
              <div class="mini-program-card__price">{{ program.price }} ₽</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Show Programs Section -->
      <div class="section">
        <h2 class="section-title">Шоу-программы</h2>
        <div class="quests-grid">
          <Quest
            :quest="showPrograms"
          />
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>

<script setup>
import { ref } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Quest from '@/components/Quests.vue';

// Import images
import touchShowImage from '@/assets/images/touch-show.jpg';
import tasteShowImage from '@/assets/images/taste-show.jpg';
import silverShowImage from '@/assets/images/silver-show.jpg';
import chemicalShowImage from '@/assets/images/chemical-show.jpg';
import popitShowImage from '@/assets/images/popit-show.jpg';
import slimeShowImage from '@/assets/images/slime-show.jpg';
import ebruImage from '@/assets/images/ebru.jpg';
import cottonCandyImage from '@/assets/images/cotton-candy.jpg';
import bubbleShowImage from '@/assets/images/bubble-show.jpg';

const miniPrograms = ref([
  {
    id: 'touch-show',
    name: '"Нащупай" шоу',
    description: 'Сверхэмоциональное шоу, где вам одновременно весело и страшно от неизвестности.',
    price: 5500,
    image: touchShowImage
  },
  {
    id: 'taste-show',
    name: 'Попробуй Шоу',
    description: 'Уникальное "вкусное" шоу, где участники испытывают свои вкусовые способности.',
    price: 5500,
    image: tasteShowImage
  },
  {
    id: 'silver-show',
    name: 'Серебряное шоу',
    description: 'Очень веселое и красивое представление с использованием 10 кг серебристого конфетти.',
    price: 5500,
    image: silverShowImage
  },
  {
    id: 'chemical-show',
    name: 'Химическое шоу',
    description: 'Удивительное шоу, в котором научные принципы сочетаются со шквалом дыма, льда и огня.',
    price: 5500,
    image: chemicalShowImage
  },
  {
    id: 'popit-show',
    name: 'Pop it шоу',
    description: 'Фейерверк эмоций и самая популярная игра у детей. Интерактивный формат пиньяты.',
    price: 5500,
    image: popitShowImage
  },
  {
    id: 'slime-show',
    name: 'Слайм шоу',
    description: 'Залипательное представление, где дети сами создадут уникальные слаймы.',
    price: 5500,
    image: slimeShowImage
  },
  {
    id: 'ebru',
    name: 'Рисование ЭБРУ',
    description: 'Волшебная техника живописи красками по воде с перенесением на бумагу.',
    price: 5500,
    image: ebruImage
  },
  {
    id: 'cotton-candy',
    name: 'Шоу сладкой ваты',
    description: 'Воздушное угощение для сладкоежек! Именинник научится сам ее закручивать.',
    price: 5500,
    image: cottonCandyImage
  },
  {
    id: 'bubble-show',
    name: 'Шоу мыльных пузырей',
    description: 'Необыкновенное представление, завораживающее и детей и взрослых!',
    price: 5500,
    image: bubbleShowImage
  }
]);

const showPrograms = ref([
  {
    id: 'museum',
    name: 'Тайны ночного музея',
    description: 'Когда-нибудь задумывались, есть ли у экспонатов в музее своя жизнь? А что, если обычная экскурсия превратится в увлекательное приключение? Приготовьтесь к фантастическому путешествию, где встретятся древние культуры и загадочные существа.',
    features: [
      'Изучение письменности Майя',
      'Выращивание динозавров',
      'Разгадка шифра от тайной двери',
      'Танцы с динозавром и принцессой'
    ],
    includes: [
      'Пригласительные',
      'Банкетная зона на 2,5 часа',
      'Сервировка стола праздной посудой',
      'Праздничный фонтан из шаров',
      'Зажигательный ведущий после основной программы',
      'Персональный менеджер праздника'
    ],
    hosts: ['Принцесса племени по имени Майя'],
    time: '2,5 часа',
    equipment: 'Портативная колонка',
    price: 20500,
    priceNote: 'На команду 10 человек',
    address: 'Ул. Белинского 8 ТРЦ «Комсомолл» 3 этаж',
    images: ['@/assets/images/quests/museum.jpg']
  },
  {
    id: 'pirate',
    title: 'Пиратское приключение',
    description: 'Неутомимый капитан Джек Воробей снова отправляется на встречу опасности. Джек задумал обрести вечную жизнь с помощью источника молодости. Для этого он даже похитил русалку с берегов адриатического моря. Вот только есть одна проблема: для эликсира молодости нужна не сама русалка, а ее слеза радости.',
    features: [
      'Знакомство с Пиратом и его пленницей – Русалкой',
      'Клятва пирата',
      '«От юнги до капитана»',
      '«Распутай Русалку»',
      'Найти общий язык с русалкой',
      'Превращение слезы и жемчужины в эликсир'
    ],
    includes: [
      'Пригласительные',
      'Банкетная зона на 2,5 часа',
      'Сервировка стола праздной посудой',
      'Праздничный фонтан из шаров',
      'Зажигательный ведущий после основной программы',
      'Персональный менеджер праздника'
    ],
    hosts: ['2 ведущих (Пират и русалка)'],
    duration: '2 часа 30 минут',
    equipment: 'Портативная колонка',
    price: 20500,
    priceNote: 'На команду 10 человек',
    address: 'ул. Белинского, 8 ТРЦ "Комсомолл" 3 этаж',
    phone: '2-333-999',
    image: '@/assets/images/quests/pirate.jpg'
  },
  {
    id: 'wizard',
    title: 'Ученик Чародея',
    description: 'Орден Чародеев защищает волшебную Башню, многие века хранящая свою магическую силу. Но в Башню проникает злой дух, который крадет электричество. Спящий в Башне Чародей знает способ, как усмирить духа, но только магия способна его разбудить.',
    features: [
      'Приветствие и посвящение в историю Чародейкой',
      'Памятные сувениры из квеста – обереги',
      'Активные игры с Чародеем',
      'Тесла-катушка и настоящая молния',
      'Сказочный антураж квеста',
      'Магия химического шоу и опытов'
    ],
    includes: [
      'Пригласительные',
      'Банкетная комната на 2.5 часа',
      'Сервировка стола праздничной посудой',
      'Праздничный фонтан из шаров',
      'Зажигательный ведущий после основной программы',
      'Персональный менеджер праздника'
    ],
    hosts: ['2 ведущих (Великий Чародей Мэрлин и Чародейка)'],
    duration: '2 часа 30 минут',
    equipment: 'Портативная колонка',
    price: 20500,
    priceNote: 'На команду 10 человек',
    address: 'Ул. Робеспьера 1',
    phone: '2-333-999',
    image: '@/assets/images/quests/wizard.jpg'
  },
  {
    id: 'spiderman',
    title: 'Спайдермен против доктора Осьминога',
    description: 'Вы супергерои! Объединились вместе, чтобы противостоять злу в команде с Человеком-пауком! Ваша миссия обезвредить сыворотку, которая может сделать всех людей несчастными.',
    features: [
      'Знакомство с профессором и лаборантом',
      'Проверка знаний на составление химических формул',
      'Разминирование бункера (игра «Твистер»)',
      'Сбор цепей кода для открытия станции',
      'Генерация секретной сыворотки (3 опыта)'
    ],
    includes: [
      'Пригласительные',
      'Банкетная зона на 2,5 часа',
      'Сервировка стола праздной посудой',
      'Праздничный фонтан из шаров',
      'Зажигательный ведущий после основной программы',
      'Персональный менеджер праздника'
    ],
    hosts: ['2 ведущих (Человек-Паук и Доктор Осьминог)'],
    duration: '2 часа 30 минут',
    equipment: 'Портативная колонка',
    price: 20500,
    priceNote: 'На команду 10 человек',
    address: 'Ул. Алексеева 113 (цоколь)',
    phone: '2-333-999',
    image: '@/assets/images/quests/spiderman.jpg'
  },
  {
    id: 'dinosaur',
    title: 'По следам динозавров',
    description: 'С древних времён люди находили в земле окаменелые кости странных, непонятных существ и пытались объяснить их природу самыми разными способами. Великие тайны мира динозавров не раскрыты до сих пор...',
    features: [
      'Знакомство с виновником торжества и его друзьями',
      'Путешествие на затерянный остров',
      'Изучение затерянного языка Майа',
      'Поиск карты с местоположением захоронения костей',
      'Оживление динозавра с помощью камня'
    ],
    includes: [
      'Пригласительные',
      'Банкетная зона на 2,5 часа',
      'Сервировка стола праздной посудой',
      'Праздничный фонтан из шаров',
      'Зажигательный ведущий после основной программы',
      'Персональный менеджер праздника'
    ],
    hosts: ['2 ведущих (Палеонтологи и Динозавр)'],
    duration: '2 часа 30 минут',
    equipment: 'Портативная колонка',
    price: 20500,
    priceNote: 'На команду 10 человек',
    address: 'ул. Белинского, 8 ТРЦ "Комсомолл" 3 этаж',
    phone: '2-333-999',
    image: '@/assets/images/quests/dinosaur.jpg'
  }
]);
</script>

<style scoped>
.show-programs {
  padding: 40px 0;
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 40px;
  text-align: center;
  position: relative;
}

.section {
  margin-bottom: 60px;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 30px;
  color: #CF1034;
}

/* Mini Programs Grid */
.mini-programs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.mini-program-card {
  background: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.mini-program-card:hover {
  transform: translateY(-5px);
}

.mini-program-card__image {
  width: 100%;
  height: 150px;
  overflow: hidden;
}

.mini-program-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mini-program-card__content {
  padding: 15px;
}

.mini-program-card__title {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #CF1034;
}

.mini-program-card__description {
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 10px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mini-program-card__price {
  font-size: 1.1rem;
  font-weight: bold;
  color: #CF1034;
}

/* Show Programs Grid */
.quests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

@media (max-width: 768px) {
  .mini-programs-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  
  .quests-grid {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
}
</style> 