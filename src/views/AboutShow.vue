<template>
  <Header />
  <section class="about-show">
    <div class="container">
      <div class="show-content">
        <!-- Left Column - Main Info -->
        <div class="main-info">
          <div class="card">
            <h1 class="card__title">{{ show.name }}</h1>
            <div class="show-images">
              <img :src="show.image" :alt="show.name" class="main-image">
            </div>
            <div class="description">
              <p>{{ show.description }}</p>
            </div>
            <div class="show-details">
              <div class="price">{{ show.price }} ₽</div>
              <a :href="'tel:' + show.contact" class="contact-button">
                <span class="contact-button__text">Забронировать</span>
                <span class="contact-button__phone">{{ show.contact }}</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Right Column - Additional Info -->
        <div class="info-cards">
          <div class="card">
            <h3 class="card__title">Дополнительная информация</h3>
            <div class="info-list">
              <div class="info-item" v-if="show.duration">
                <h4>Длительность</h4>
                <p>{{ show.duration }}</p>
              </div>
              <div class="info-item" v-if="show.age">
                <h4>Возраст</h4>
                <p>{{ show.age }}</p>
              </div>
              <div class="info-item" v-if="show.participants">
                <h4>Количество участников</h4>
                <p>{{ show.participants }}</p>
              </div>
              <div class="info-item" v-if="show.includes && show.includes.length">
                <h4>Что включено</h4>
                <ul>
                  <li v-for="(item, index) in show.includes" :key="index">{{ item }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

// Import images
import touchShowImage from '@/assets/images/shows/touch-show.jpg';
import tasteShowImage from '@/assets/images/shows/taste-show.jpg';
import silverShowImage from '@/assets/images/shows/silver-show.jpg';
import chemicalShowImage from '@/assets/images/shows/chemical-show.jpg';
import popitShowImage from '@/assets/images/shows/popit-show.jpg';
import slimeShowImage from '@/assets/images/shows/slime-show.jpg';
import ebruImage from '@/assets/images/shows/ebru.jpg';
import cottonCandyImage from '@/assets/images/shows/cotton-candy.jpg';
import bubbleShowImage from '@/assets/images/shows/bubble-show.jpg';

const route = useRoute();
const show = ref(null);

const showsData = {
  'touch-show': {
    name: '"Нащупай" шоу',
    description: 'Сверхэмоциональное шоу, где вам одновременно весело и страшно от неизвестности. Внутрь симпатичного белого ящика ведущий помещает "нечто". Участник программы должен просунуть руки в ящик и определить, на ощупь, что там лежит.',
    price: 5500,
    image: touchShowImage,
    duration: '30 минут',
    age: '5+',
    participants: 'до 15 человек',
    includes: [
      'Профессиональный ведущий',
      'Все необходимые реквизиты',
      'Музыкальное сопровождение',
      'Подарки для участников'
    ],
    contact: '+7 (391) 269-92-23'
  },
  'taste-show': {
    name: 'Попробуй Шоу',
    description: 'Уникальное "вкусное" шоу, где участники испытывают свои вкусовые способности и таланты. Вам предстоит угадать все напитки, которые спрятаны в ящике.',
    price: 5500,
    image: tasteShowImage,
    duration: '30 минут',
    age: '5+',
    participants: 'до 15 человек',
    includes: [
      'Профессиональный ведущий',
      'Все необходимые реквизиты',
      'Музыкальное сопровождение',
      'Подарки для участников'
    ],
    contact: '+7 (391) 269-92-23'
  },
  'silver-show': {
    name: 'Серебряное шоу',
    description: 'Очень веселое и красивое представление, которое оставит после себя невероятные впечатления и бурю эмоций не только у детей, но и у их родителей! Зрелище является аналогом бумажного шоу, только вместо бумаги используется 10 кг. серебристого конфетти.',
    price: 5500,
    image: silverShowImage,
    duration: '30 минут',
    age: '3+',
    participants: 'до 20 человек',
    includes: [
      'Профессиональный ведущий',
      '10 кг серебристого конфетти',
      'Музыкальное сопровождение',
      'Фото и видео съемка'
    ],
    contact: '+7 (391) 269-92-23'
  },
  'chemical-show': {
    name: 'Химическое шоу',
    description: 'Хим-шоу - удивительное шоу, в котором научные принципы сочетаются со шквалом дыма, льда и огня. Химики создают захватывающие эксперименты, которые заставляют участников шоу восклицать и аплодировать.',
    price: 5500,
    image: chemicalShowImage,
    duration: '45 минут',
    age: '5+',
    participants: 'до 25 человек',
    includes: [
      'Профессиональный химик',
      'Все необходимые реактивы',
      'Защитное оборудование',
      'Памятные сувениры'
    ],
    contact: '+7 (391) 269-92-23'
  },
  'popit-show': {
    name: 'Pop it шоу',
    description: 'Pop it - шоу - фейерверк эмоций и самая популярная игра у детей. Интерактивный формат пиньяты и оригинальная фотозона.',
    price: 5500,
    image: popitShowImage,
    duration: '30 минут',
    age: '3+',
    participants: 'до 15 человек',
    includes: [
      'Профессиональный ведущий',
      'Pop it игрушки',
      'Фотозона',
      'Подарки для участников'
    ],
    contact: '+7 (391) 269-92-23'
  },
  'slime-show': {
    name: 'Слайм шоу',
    description: 'Залипательное представление, где дети сами создадут уникальные слаймы. Море блесток, ароматов, цветов и наполнителей!',
    price: 5500,
    image: slimeShowImage,
    duration: '45 минут',
    age: '5+',
    participants: 'до 15 человек',
    includes: [
      'Профессиональный ведущий',
      'Все необходимые материалы',
      'Защитные фартуки',
      'Контейнеры для слаймов'
    ],
    contact: '+7 (391) 269-92-23'
  },
  'ebru': {
    name: 'Рисование ЭБРУ',
    description: 'Волшебная техника живописи красками по воде с дальнейшим перенесением художества на бумагу. Каждый ребенок создаст уникальный рисунок и оставит себе на память яркое творение.',
    price: 5500,
    image: ebruImage,
    duration: '60 минут',
    age: '5+',
    participants: 'до 10 человек',
    includes: [
      'Профессиональный художник',
      'Все необходимые материалы',
      'Защитные фартуки',
      'Рамы для картин'
    ],
    contact: '+7 (391) 269-92-23'
  },
  'cotton-candy': {
    name: 'Шоу сладкой ваты',
    description: 'Воздушное угощение для сладкоежек! Именинник даже научиться сам ее закручивать.',
    price: 5500,
    image: cottonCandyImage,
    duration: '30 минут',
    age: '3+',
    participants: 'до 20 человек',
    includes: [
      'Профессиональный ведущий',
      'Аппарат для сладкой ваты',
      'Разноцветная сахарная вата',
      'Подарочные упаковки'
    ],
    contact: '+7 (391) 269-92-23'
  },
  'bubble-show': {
    name: 'Шоу мыльных пузырей',
    description: 'Необыкновенное представление, завораживающее и детей и взрослых! Оно непременно вызовет восторг и бурю эмоций у всех!',
    price: 5500,
    image: bubbleShowImage,
    duration: '30 минут',
    age: '3+',
    participants: 'до 25 человек',
    includes: [
      'Профессиональный ведущий',
      'Специальные растворы',
      'Разнообразные рамки',
      'Дымовые эффекты'
    ],
    contact: '+7 (391) 269-92-23'
  }
};

onMounted(() => {
  const showId = route.params.id;
  show.value = showsData[showId];
});
</script>

<style scoped>
.about-show {
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

.show-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.card {
  background: #2a2a2a;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 30px;
}

.card__title {
  font-size: 2rem;
  color: #CF1034;
  margin-bottom: 20px;
}

.show-images {
  margin-bottom: 30px;
}

.main-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #ccc;
  margin-bottom: 30px;
}

.show-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}

.price {
  font-size: 2rem;
  font-weight: bold;
  color: #CF1034;
}

.contact-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  background: #CF1034;
  color: white;
  padding: 15px 30px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.contact-button:hover {
  background: #a00d2a;
}

.contact-button__text {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.contact-button__phone {
  font-size: 1.1rem;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-item h4 {
  color: #CF1034;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.info-item p, .info-item ul {
  color: #ccc;
  line-height: 1.6;
}

.info-item ul {
  list-style-type: disc;
  padding-left: 20px;
}

.info-item li {
  margin-bottom: 5px;
}

@media (max-width: 768px) {
  .show-content {
    grid-template-columns: 1fr;
  }

  .card__title {
    font-size: 1.75rem;
  }

  .main-image {
    height: 300px;
  }

  .show-details {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
}
</style> 