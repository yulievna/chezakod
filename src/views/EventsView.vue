<template>
  <div class="events-page">
    <Header></Header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1 class="hero__title">Корпоратив от Чеширского</h1>
        <p class="hero__subtitle">Незабываемые мероприятия для вашей команды</p>
      </div>
    </section>

    <!-- Image Slider Section -->
  

    <!-- Event Type Toggle -->
    <section class="event-type-toggle">
      <div class="container">
        <div class="toggle-buttons">
          <button 
            :class="{ 'active': activeEventType === 'corporate' }" 
            @click="activeEventType = 'corporate'"
          >
            Корпоративы
          </button>
          <button 
            :class="{ 'active': activeEventType === 'birthday' }" 
            @click="activeEventType = 'birthday'"
          >
            Дни рождения
          </button>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="main-content" v-if="activeEventType === 'corporate'">
      <div class="container">
        <div class="content-grid">
          <!-- Left Column - Main Info -->
          <div class="main-info">
            <div class="card">
              <h2 class="card__title">САЛАТ-ШОУ на Вашем празднике</h2>
              
              <div class="shows-list">
                <h3 class="section-title">День Рождения или Корпоратив по мотивам популярных ТВ-шоу:</h3>
                <div class="shows-grid">
                  <div v-for="(show, index) in shows" :key="index" class="show-card" :class="{ 'show-card--active': activeShow === index }" @click="activeShow = index">
                    <div class="show-card__content">
                      <h4>{{ show.name }}</h4>
                      <p>{{ show.description }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="description">
                <p class="highlight-text">
                  Мы смешали лучшие игровые моменты, пропитали интригой, приправили харизмой ведущего и украсили усами Якубовича. 
                  САЛАТ-ШОУ на Ваш праздник готов! Крутите барабан!
                </p>
              </div>
            </div>
            <div class="slider-section">
              <ImgSlider :images="eventImages"></ImgSlider>
          </div>
          </div>

          <!-- Right Column - Info Cards -->
          <div class="info-cards">
            <div class="card">
              <h3 class="card__title">КАК ПРОХОДИТ?</h3>
              <div class="process-steps">
                <div class="step">
                  <div class="step__number">1</div>
                  <p>Делитесь на 2 команды</p>
                </div>
                <div class="step">
                  <div class="step__number">2</div>
                  <p>Крутите Колесо фортуны</p>
                </div>
                <div class="step">
                  <div class="step__number">3</div>
                  <p>Играете в выпавшее шоу</p>
                </div>
              </div>
            </div>

            <div class="card">
              <h3 class="card__title">СКОЛЬКО ДЛИТСЯ?</h3>
              <div class="duration-options">
                <div class="duration-option" :class="{ 'duration-option--active': selectedDuration === '1h' }" @click="selectedDuration = '1h'">
                  <h4>1 час</h4>
                  <p>6-8 шоу</p>
                </div>
                <div class="duration-option" :class="{ 'duration-option--active': selectedDuration === '1.5h' }" @click="selectedDuration = '1.5h'">
                  <h4>1.5 часа</h4>
                  <p>8-10 шоу</p>
                </div>
              </div>
            </div>

            <div class="card">
              <h3 class="card__title">СКОЛЬКО СТОИТ?</h3>
              <div class="pricing-tabs">
                <div class="tabs-header">
                  <button :class="{ 'active': activeTab === 'weekday' }" @click="activeTab = 'weekday'">Будни</button>
                  <button :class="{ 'active': activeTab === 'weekend' }" @click="activeTab = 'weekend'">Выходные</button>
                </div>
                <div class="tabs-content">
                  <div v-if="activeTab === 'weekday'" class="pricing-content">
                    <div class="price-item">
                      <span class="price">700₽</span>
                      <span class="duration">за 1 час</span>
                    </div>
                    <div class="price-item">
                      <span class="price">800₽</span>
                      <span class="duration">за 1.5 часа</span>
                    </div>
                    <p class="price-note">* но не менее 13000₽ и 14000₽ на весь коллектив</p>
                  </div>
                  <div v-else class="pricing-content">
                    <div class="price-item">
                      <span class="price">900₽</span>
                      <span class="duration">за 1 час</span>
                    </div>
                    <div class="price-item">
                      <span class="price">1000₽</span>
                      <span class="duration">за 1.5 часа</span>
                    </div>
                    <p class="price-note">* но не менее 15000₽ и 16000₽ на весь коллектив</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <h3 class="card__title">ГДЕ ПРОХОДИТ?</h3>
              <div class="location-info">
                <p>Шоу может проходить на любых площадках Чеширский код. Мы подбираем подходящее под Ваше мероприятие помещение на одном из наших филиалов.</p>
                <p class="highlight">Стоимость аренды в этом случае дополнительно НЕ оплачивается.</p>
                <p>Так же возможен выезд на вашу площадку.</p>
                <p class="highlight">Стоимость выезда за пределы Красноярска +3000₽</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>

    <!-- Birthday Content -->
    <section class="main-content" v-if="activeEventType === 'birthday'">
      <div class="container">
        <div class="content-grid">
          <!-- Left Column - Main Info -->
          <div class="main-info">
            <div class="card">
              <h2 class="card__title">Квест-шоу для детей</h2>
              <p class="description">
                Специальные программы для детей от 5 до 7 лет. Дети становятся героями и активными участниками сказочного приключения, а пройти все испытания им помогают анимированные сказочные персонажи.
              </p>
            </div>

            <!-- Quests Grid -->
            <div class="quests-grid">
              <Quest 
                v-for="quest in birthdayQuests" 
                :key="quest.id"
                :quest="quest"
              />
            </div>
          </div>

          <!-- Right Column - Info Cards -->
          <div class="info-cards">
            <div class="card">
              <h3 class="card__title">Дополнительные услуги</h3>
              <div class="services-list">
                <div v-for="(service, index) in birthdayServices" :key="index" class="service-item">
                  <div class="service-item__content">
                    <h4>{{ service.name }}</h4>
                    <p>{{ service.description }}</p>
                    <div class="service-item__price">{{ service.price }} ₽</div>
                  </div>
                  <router-link :to="{ name: 'about-show', params: { id: service.id }}" class="service-item__link">
                    Подробнее
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Additional Services -->


    <!-- Lounges Section -->
    <section class="lounges-section">
      <div class="container">
        <Lounge 
            :lounges="lounges"
          />
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
      <div class="container">
        <div class="contact-info">
          <h2>Забронировать мероприятие</h2>
          <p class="contact-types">выездной квест | ваш офис | база отдыха</p>
          <a href="tel:2-333-999" class="phone-number">2-333-999</a>
        </div>
      </div>
    </section>

    <Footer></Footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ImgSlider from '@/components/ImgSlider.vue'
import Quest from '@/components/Quests.vue'
import Lounge from '@/components/Lounge.vue'
import axios from 'axios'

import korporativ from '@/assets/images/korporativ.jpg';
import korporativ2 from '@/assets/images/korporativ2.jpg';
import korporativ3 from '@/assets/images/korporativ4.jpg';
import korporativ4 from '@/assets/images/korporativ5.jpg';
import korporativ5 from '@/assets/images/korporativ6.jpg';
import korporativ6 from '@/assets/images/korporativ7.jpg';
import korporativ7 from '@/assets/images/korporativ3.jpg';



const activeEventType = ref('corporate')
const activeShow = ref(null)
const selectedDuration = ref('1h')
const activeTab = ref('weekday')

const eventImages = [ korporativ, korporativ2, korporativ3, korporativ4, korporativ5, korporativ6, korporativ7
  // {
  //   src: korporativ,
  //   alt: 'Корпоратив',
  //   id: 'corporate-1'
  // },
  // {
  //   src: korporativ2,
  //   alt: 'Корпоратив',
  //   id: 'corporate-1'
  // },
  // {
  //   src: korporativ4,
  //   alt: 'Корпоратив',
  //   id: 'corporate-1'
  // },
  // {
  //   src: korporativ3,
  //   alt: 'Корпоратив',
  //   id: 'corporate-1'
  // },
  // {
  //   src: korporativ5,
  //   alt: 'Корпоратив',
  //   id: 'corporate-1'
  // },
  // {
  //   src: korporativ6,
  //   alt: 'Корпоратив',
  //   id: 'corporate-1'
  // },
  // {
  //   src: korporativ7,
  //   alt: 'Корпоратив',
  //   id: 'corporate-1'
  // },
]

const shows = [
  {
    name: 'Битва экстрасенсов',
    description: 'Угадайте, что скрыто в черном ящике'
  },
  {
    name: 'Что? Где? Когда?',
    description: 'Проверьте свою эрудицию'
  },
  {
    name: 'Где логика',
    description: 'Найдите связь между предметами'
  },
  {
    name: 'Голос',
    description: 'Покажите свой вокальный талант'
  },
  {
    name: 'Импровизация',
    description: 'Создавайте истории на ходу'
  },
  {
    name: 'Поле Чудес',
    description: 'Угадайте слово по буквам'
  },
  {
    name: 'Танцы',
    description: 'Покажите свои танцевальные способности'
  },
  {
    name: 'Большие гонки',
    description: 'Соревнуйтесь в скорости и ловкости'
  },
  {
    name: 'Студия Союз',
    description: 'Создайте свой музыкальный клип'
  }
]




const additionalServices = [
  {
    name: 'Профессиональный фотограф',
    description: 'Сделать необычные снимки и запечатлеть памятные моменты поможет профессиональный фотограф',
    price: 3500,
    icon: '@/assets/images/icon_quest-2.svg'
  },
  // ... add other additional services ...
]

const lounges = ref([]);
onMounted(async () => {
  try {
    const responseL = await axios.get('https://chezakod.ru/api/v2/vip/');
    lounges.value = responseL.data.result.map((l) => ({
      id: l.id,
      photo: l.photo,
      location: {
        id: l.location.id,
        name: l.location.name,
        address: l.location.address.replace(/&quot;/g, '"'),
        coordinates: l.location.coordinates,
        links: l.location.links
      },
      quests: l.quests
    }));
    // lounges.value = responseL.
  } catch (error) {
    console.error('Ошибка при загрузке випок:', error);
  }
});
</script>

<style scoped>
.events-page {
  background-color: #f8f9fa;
}

.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/images/korporativ.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 100px 0;
  text-align: center;
}

.hero__title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
}

.hero__subtitle {
  font-size: 24px;
  opacity: 0.9;
}

.main-info{
  max-height: 1100px;
}
.slider-section {
  grid-column: span 2;
  max-width: 565px;
  height: 330px;
}

.container {
  width: 1200px;
  margin: 0 auto;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin: 60px 0;
}

.card {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.card__title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #CF1034;
}

.shows-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 20px;
}

.show-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.show-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.show-card--active {
  background: #CF1034;
  color: white;
}

.process-steps {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.step {
  text-align: center;
  flex: 1;
  padding: 0 15px;
}

.step__number {
  width: 40px;
  height: 40px;
  background: #CF1034;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
  font-weight: bold;
}

.duration-options {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.duration-option {
  flex: 1;
  padding: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.duration-option:hover {
  border-color: #CF1034;
}

.duration-option--active {
  background: #CF1034;
  color: white;
  border-color: #CF1034;
}

.pricing-tabs {
  margin-top: 20px;
}

.tabs-header {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tabs-header button {
  flex: 1;
  padding: 10px;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
  border-radius: 5px;
}

.tabs-header button.active {
  background: #CF1034;
  color: white;
}

.price-item {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 10px;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #CF1034;
}

.price-note {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}

.location-info {
  line-height: 1.6;
}

.highlight {
  color: #CF1034;
  font-weight: bold;
}

.event-type-toggle {
  background: white;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
}

.toggle-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.toggle-buttons button {
  padding: 15px 30px;
  border: 2px solid #CF1034;
  background: transparent;
  color: #CF1034;
  border-radius: 30px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-buttons button.active {
  background: #CF1034;
  color: white;
}

.services-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.service-item {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease;
}

.service-item:hover {
  transform: translateY(-5px);
}

.service-item__content {
  flex: 1;
}

.service-item__price {
  font-size: 24px;
  font-weight: bold;
  color: #CF1034;
  margin: 10px 0;
}

.service-item__link {
  padding: 10px 20px;
  background: #CF1034;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s ease;
}

.service-item__link:hover {
  background: #a00d29;
}

.lounges-section {
  padding: 60px 0;
  background: white;
}

.lounges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.contact-section {
  background: #CF1034;
  color: white;
  padding: 60px 0;
  text-align: center;
}

.contact-info {
  max-width: 600px;
  margin: 0 auto;
}

.phone-number {
  display: inline-block;
  font-size: 36px;
  font-weight: bold;
  color: white;
  text-decoration: none;
  margin-top: 20px;
  padding: 15px 30px;
  border: 2px solid white;
  border-radius: 30px;
  transition: all 0.3s ease;
}

.phone-number:hover {
  background: white;
  color: #CF1034;
}

.quests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

@media (max-width: 1200px) {
  .container {
    width: 100%;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .shows-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero__title {
    font-size: 36px;
  }
  
  .hero__subtitle {
    font-size: 20px;
  }
  
  .shows-grid {
    grid-template-columns: 1fr;
  }
  
  .process-steps {
    flex-direction: column;
    gap: 20px;
  }
  
  .toggle-buttons {
    flex-direction: column;
    padding: 0 20px;
  }
  
  .service-item {
    flex-direction: column;
    text-align: center;
  }
  
  .service-item__link {
    margin-top: 15px;
  }
}
</style> 