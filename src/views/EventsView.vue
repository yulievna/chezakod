<template>
  <div class="events-page">
    <Header/>

    <!-- Hero Section -->
    <section
        class="hero"
        :class="activeEventType"
    >
      <div class="container">
        <h1 class="hero__title">
          {{ activeEventType === 'corporate' ? 'Корпоратив от Чеширского' : 'День рождения с квестами' }}
        </h1>
        <p class="hero__subtitle">
          {{
            activeEventType === 'corporate'
                ? 'Незабываемые мероприятия для вашей команды'
                : 'Лучшие шоу и квесты для детей'
          }}
        </p>
      </div>
    </section>

    <!-- Event Type Toggle -->
    <section class="event-type-toggle">
      <div class="container">
        <div class="toggle-buttons">
          <button
              :class="{ 'active': activeEventType === 'corporate' }"
              @click="switchToCorporate()"
          >
            Корпоративы
          </button>
          <button
              :class="{ 'active': activeEventType === 'birthday' }"
              @click="switchToBirthday()"
          >
            Дни рождения
          </button>
        </div>
      </div>
    </section>

    <!-- Corporate Content -->
    <section v-show="activeEventType === 'corporate'" class="main-content">
      <div class="container">
        <div class="content-grid">
          <!-- Left Column - Main Info -->
          <div class="main-info">
            <div class="card">
              <h2 class="card__title">САЛАТ-ШОУ на Вашем празднике</h2>

              <div class="shows-list">
                <h3 class="section-title">Корпоратив по мотивам популярных ТВ-шоу:</h3>
                <div class="shows-grid">
                  <div
                      v-for="(show, index) in shows"
                      :key="'show-'+index"
                      class="show-card"
                      :class="{
                      'show-card--active': activeShow === index,
                      'show-card--even': index % 2 === 0,
                      'show-card--odd': index % 2 !== 0
                    }"
                      @click="selectShow(index)"
                  >
                    <div class="show-card__icon">
                      <img :src="show.icon" :alt="show.name" loading="lazy">
                    </div>
                    <div class="show-card__content">
                      <h4>{{ show.name }}</h4>
                      <p>{{ show.description }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="description">
                <p class="highlight-text">
                  Мы смешали лучшие игровые моменты, пропитали интригой, приправили харизмой ведущего и украсили усами
                  Якубовича.
                  САЛАТ-ШОУ на Ваш праздник готов! Крутите барабан!
                </p>
              </div>
            </div>
            <div class="slider-section">
              <ImgSlider :images="eventImages" :navigation="true" :autoplay-delay="5000"/>
            </div>
          </div>

          <!-- Right Column - Info Cards -->
          <div class="info-cards">
            <div class="card">
              <h3 class="card__title">КАК ПРОХОДИТ?</h3>
              <div class="process-steps">
                <div
                    v-for="(step, index) in steps"
                    :key="'step-'+index"
                    class="step"
                    :class="{ 'step--active': activeStep === index }"
                    @mouseenter="setActiveStep(index)"
                    @mouseleave="resumeAutoSlide()"
                >
                  <div class="step__number">{{ index + 1 }}</div>
                  <p>{{ step.description }}</p>
                </div>
              </div>
              <div class="steps-slider">
                <transition name="fade" mode="out-in">
                  <div
                      v-if="steps[activeStep]"
                      :key="'step-image-'+activeStep"
                      class="steps-slider__image steps-slider__image--active"
                  >
                    <img :src="steps[activeStep].image" :alt="steps[activeStep].description" loading="lazy">
                  </div>
                </transition>
              </div>
            </div>

            <div class="card">
              <h3 class="card__title">СКОЛЬКО ДЛИТСЯ?</h3>
              <div class="duration-options">
                <div
                    class="duration-option"
                    :class="{ 'duration-option--active': selectedDuration === '1h' }"
                    @click="selectedDuration = '1h'"
                >
                  <h4>1 час</h4>
                  <p>6-8 шоу</p>
                </div>
                <div
                    class="duration-option"
                    :class="{ 'duration-option--active': selectedDuration === '1.5h' }"
                    @click="selectedDuration = '1.5h'"
                >
                  <h4>1.5 часа</h4>
                  <p>8-10 шоу</p>
                </div>
              </div>
            </div>

            <div class="card">
              <h3 class="card__title">СКОЛЬКО СТОИТ?</h3>
              <div class="pricing-tabs">
                <div class="tabs-header">
                  <button
                      :class="{ 'active': activeTab === 'weekday' }"
                      @click="activeTab = 'weekday'"
                  >
                    Будни
                  </button>
                  <button
                      :class="{ 'active': activeTab === 'weekend' }"
                      @click="activeTab = 'weekend'"
                  >
                    Выходные
                  </button>
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
                <p>Шоу может проходить на любых площадках Чеширский код. Мы подбираем подходящее под Ваше мероприятие
                  помещение на одном из наших филиалов.</p>
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
    <section v-show="activeEventType === 'birthday'" class="main-content">
      <div class="container">
        <div class="birthday-steps">
          <!-- Шаг 1: Выбор игр -->
          <div class="birthday-step">
            <div class="step-header">
              <div class="step-number">1</div>
              <h2>Выберите игры</h2>
              <p class="step-description">
                Активные и интеллектуальные развлечения сделают детский праздник запоминающимся и необычным.
                А наш менеджер поможет разработать идеальный игровой сценарий для детей!
              </p>
            </div>

            <div class="games-grid">
              <div
                  v-for="game in games"
                  :key="'game-'+game.id"
                  class="game-card"
              >
                <img :src="game.image" :alt="game.title" loading="lazy">
                <div class="game-card__content">
                  <h3>{{ game.title }}</h3>
                  <p>{{ game.description }}</p>
                  <router-link :to="game.link" class="btn-more">Подробнее</router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Шаг 2: Выбор зала -->
          <div class="birthday-step">
            <div class="step-header">
              <div class="step-number">2</div>
              <img src="@/assets/images/lounge.png" alt="Иконка зала" loading="lazy" class="lounge-icon">
              <h2>Выберите Lounge зону для праздника</h2>
              <p class="step-description">
                Уютная зона, где можно расслабиться как после игры, так и во время неё. Родители могут наблюдать за
                игрой или просто отдохнуть, пока дети участвуют в экшн-квесте. Сервированная стеклянной посудой, с чаем
                и кипятком — всё готово для комфортного празднования. Вам остается только принести любимые угощения и
                напитки. Отличное решение для дней рождения, семейных мероприятий и корпоративов!
              </p>
              <router-link to="/quests#lounges" class="btn-more">Посмотреть залы</router-link>

            </div>


          </div>

          <!-- Шаг 3: Дополнительные услуги -->
          <div class="birthday-step">
            <div class="step-header">
              <div class="step-number">3</div>
              <h2>Дополнительные услуги</h2>
              <p class="step-description">
                Сделайте праздник еще более особенным с нашими дополнительными услугами
              </p>
            </div>

            <div class="services-grid">
              <div
                  v-for="service in additionalServices"
                  :key="'service-'+service.id"
                  class="service-card"
              >
                <div class="service-card__icon">
                  <img :src="service.icon" :alt="service.name" loading="lazy">
                </div>
                <div class="service-card__content">
                  <h3>{{ service.name }}</h3>
                  <p>{{ service.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Шаг 4: Форма заказа -->
          <div class="birthday-step">
            <div class="step-header">
              <div class="step-number">4</div>
              <h2>Заполните форму</h2>
              <p class="step-description">
                Оставьте заявку, и наш менеджер свяжется с вами для уточнения деталей
              </p>
            </div>

            <div class="booking-form">
              <Form/>
            </div>
          </div>
        </div>
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

    <Footer/>
  </div>
</template>

<script setup>
import {onMounted, onServerPrefetch, ref} from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ImgSlider from '@/components/ImgSlider.vue'
import Form from '@/components/Form.vue'
import axios from 'axios'
import {useHead} from "@unhead/vue";

// Import images
import korporativ from '@/assets/images/korporativ.jpg'
import korporativ2 from '@/assets/images/korporativ2.jpg'
import korporativ3 from '@/assets/images/korporativ4.jpg'
import korporativ4 from '@/assets/images/korporativ5.jpg'
import korporativ5 from '@/assets/images/korporativ6.jpg'
import korporativ6 from '@/assets/images/korporativ7.jpg'
import korporativ7 from '@/assets/images/korporativ3.jpg'

import psychic from '@/assets/images/psychic.png'
import brain from '@/assets/images/brain.png'
import logic from '@/assets/images/logic.png'
import microphone from '@/assets/images/microphone.png'
import theater from '@/assets/images/theater.png'
import wheel from '@/assets/images/wheel.png'
import music from '@/assets/images/music.png'
import race from '@/assets/images/race.png'
import dance from '@/assets/images/dance.png'

import questImage from '@/assets/images/quest__1.jpg'
import actionImage from '@/assets/images/sl3.jpg'
import showImage from '@/assets/images/showImage.png'

import photographer from '@/assets/images/photografer.png'
import instructor from '@/assets/images/instructor.png'
import animator from '@/assets/images/animator.png'

// Reactive state
const activeEventType = ref('corporate')
const selectedDuration = ref('1h')
const activeTab = ref('weekday')
const activeStep = ref(0)
const activeShow = ref(0)
const lounges = ref([])
let slideTimer = null

// Data
const eventImages = [korporativ, korporativ2, korporativ3, korporativ4, korporativ5, korporativ6, korporativ7]

const steps = [
  {
    description: 'Делитесь на 2 команды',
    image: korporativ5
  },
  {
    description: 'Крутите Колесо фортуны',
    image: korporativ6
  },
  {
    description: 'Играете в выпавшее шоу',
    image: korporativ7
  }
]

const shows = [
  {
    name: 'Битва экстрасенсов',
    description: 'Угадайте, что скрыто в черном ящике',
    icon: psychic
  },
  {
    name: 'Что? Где? Когда?',
    description: 'Проверьте свою эрудицию',
    icon: brain
  },
  {
    name: 'Где логика',
    description: 'Найдите связь между предметами',
    icon: logic
  },
  {
    name: 'Голос',
    description: 'Покажите свой вокальный талант',
    icon: microphone
  },
  {
    name: 'Импровизация',
    description: 'Создавайте истории на ходу',
    icon: theater
  },
  {
    name: 'Поле Чудес',
    description: 'Угадайте слово по буквам',
    icon: wheel
  },
  {
    name: 'Танцы',
    description: 'Покажите свои танцевальные способности',
    icon: dance
  },
  {
    name: 'Большие гонки',
    description: 'Соревнуйтесь в скорости и ловкости',
    icon: race
  },
  {
    name: 'Студия Союз',
    description: 'Создайте свой музыкальный клип',
    icon: music
  }
]
const additionalServices = [
  {
    name: 'Фотограф',
    description: 'Сделать необычные снимки и запечатлеть памятные моменты поможет профессиональный фотограф',
    icon: photographer
  },
  {
    name: 'Инструктор',
    description: 'Максимум драйва и безопасности! Инструктор погрузит в сюжет, поможет сориентироваться и обеспечит безопасность. Обязателен для команд с участниками младше 12 лет',
    icon: instructor
  },
  {
    name: 'Аниматор',
    description: 'Аниматор – добрый персонаж квеста – в игровой форме поможет детям справиться с трудными задачами, сложными переходами и сюжетной линией',
    icon: animator
  }

]
const games = [
  {
    id: 1,
    title: 'Квесты',
    description: 'Антуражные квест-комнаты различной сложности',
    image: questImage,
    link: '/quests'
  },
  {
    id: 2,
    title: 'Экшн-игры',
    description: 'Захватывающие экшн-игры с лазерными ружьями и командными миссиями',
    image: actionImage,
    link: '/action-games'
  },
  {
    id: 3,
    title: 'Шоу-программы',
    description: 'Увлекательные интерактивные шоу с аниматорами, конкурсами и сюрпризами',
    image: showImage,
    link: '/show-programs'
  },
  {
    id: 4,
    title: 'Картинг',
    description: 'Захватывающий дух скоростной электро-картинг с игровыми элементами',
    image: showImage,
    link: 'https://kartingchego.ru'
  },
  {
    id: 5,
    title: 'Лофт-караоке',
    description: 'Уютные залы в уникальном стиле с караоке-системой',
    image: showImage,
    link: 'https://party-kod.ru'
  }
]

// Methods
const startAutoSlide = () => {
  stopAutoSlide()
  slideTimer = setInterval(() => {
    activeStep.value = (activeStep.value + 1) % steps.length
  }, 3000)
}

const stopAutoSlide = () => {
  if (slideTimer) {
    clearInterval(slideTimer)
    slideTimer = null
  }
}

const setActiveStep = (index) => {
  activeStep.value = index
  stopAutoSlide()
}

const resumeAutoSlide = () => {
  startAutoSlide()
}

const selectShow = (index) => {
  activeShow.value = index
}

const switchToCorporate = () => {
  activeEventType.value = 'corporate'
  activeShow.value = 0
  startAutoSlide()
}

const switchToBirthday = () => {
  activeEventType.value = 'birthday'
}

const init = async () => {
  try {
    const responseL = await axios.get(import.meta.env.VITE_API_URL + '/vip/')
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
    }))
  } catch (error) {
    console.error('Ошибка при загрузке випок:', error)
  }
  startAutoSlide()
};
// Lifecycle hooks

useHead({
  title: "Мероприятия"
});

onMounted(init);
onServerPrefetch(init);

// onBeforeUnmount(() => {
//   stopAutoSlide()
// })
</script>
<style scoped>
/* Base styles */
.events-page {
  background-color: #f8f9fa;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero section */
.hero {
  padding: 100px 0;
  text-align: center;
  color: white;
  transition: background 0.5s ease;
  position: relative;
}

.hero.corporate {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/images/korporativ.jpg');
  background-size: cover;
  background-position: center;
}

.hero.birthday {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/images/birthday1.jpg');
  background-size: cover;
  background-position: center;
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

/* Event type toggle */
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

.slider-section {
  grid-column: span 2;
  width: 100%;
  max-width: 756px;
  height: 615px;
  margin: 0 auto;
  border-radius: 20px;
}

.slider-section * {
  border-radius: 20px;
}

.toggle-buttons button {
  padding: 15px 30px;
  border: 2px solid #CF1034;
  background: transparent;
  color: #CF1034;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-buttons button.active {
  background: #CF1034;
  color: white;
}

/* Content grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin: 60px 0;
}

/* Cards */
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

/* Shows grid */
.shows-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 30px;
}

.show-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.show-card:hover,
.show-card--active {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.show-card--even {
  background-color: #F8F8F7;
}

.show-card--odd {
  background-color: #fff;
}

.show-card__icon {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
}

.show-card__icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.show-card__content h4 {
  font-size: 18px;
  margin: 0 0 8px;
  font-weight: 600;
}

.show-card__content p {
  font-size: 14px;
  margin: 0;
  opacity: 0.8;
}

/* Process steps */
.process-steps {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.step {
  text-align: center;
  flex: 1;
  padding: 0 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.step:hover,
.step--active {
  transform: translateY(-5px);
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
  transition: all 0.3s ease;
}

.step__number:hover {
  background: #fff;
  color: #CF1034;
  border: 2px solid #CF1034;
}

.step p {
  font-size: 16px;
  line-height: 1.4;
  margin: 0;
  color: #333;
}

/* Duration options */
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

/* Pricing tabs */
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

/* Birthday steps */
.birthday-steps {
  max-width: 1200px;
  margin: 0 auto;
}

.step-header {
  text-align: center;
  margin-bottom: 40px;
}

.step-header h2 {
  color: #CF1034;
}

.step-number {
  width: 50px;
  height: 50px;
  background: #CF1034;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 60px auto 20px;
  font-size: 24px;
  font-weight: bold;
}

.step-description {
  font-size: 18px;
  color: #000;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Games and services grid */
.games-grid,
.lounges-grid,
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
  margin-top: 30px;
}

.game-card,
.service-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.service-card {
  background: #000;
}

.game-card:hover,
.lounge-card:hover,
.service-card:hover {
  transform: translateY(-5px);
}

.game-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.service-card__icon {
  width: fit-content;
  margin: 20px auto 0;
}

.game-card__content,
.lounge-card__content,
.service-card__content {
  padding: 20px;
  text-align: center;
}

.service-card__content h3 {
  font-size: 24px;
  color: #fff;
}

.service-card__content p {
  font-size: 16px;
  color: #fff;
}

/* Contact section */
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

.steps-slider__image img {
  border-radius: 10px;
  margin-top: 20px;
}

/* Responsive styles */
@media (max-width: 1200px) {
  .container {
    padding: 0 20px;
  }

  .content-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .shows-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .slider-section {
    grid-column: 1;
    width: 400px;
    height: 300px;
  }

  .hero__title {
    font-size: 36px;
  }

  .hero__subtitle {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 60px 0;
  }

  .hero__title {
    font-size: 28px;
  }

  .hero__subtitle {
    font-size: 16px;
  }

  .toggle-buttons {
    flex-direction: column;
    align-items: center;
  }

  .toggle-buttons button {
    width: 100%;
    max-width: 300px;
  }

  .shows-grid {
    grid-template-columns: 1fr;
  }

  .show-card {
    padding: 15px;
  }

  .show-card__icon {
    width: 40px;
    height: 40px;
  }

  .process-steps {
    flex-direction: column;
    gap: 15px;
  }

  .duration-options {
    flex-direction: column;
  }

  .tabs-header {
    flex-direction: column;
  }

  .tabs-header button {
    width: 100%;
  }

  .games-grid,
  .lounges-grid,
  .services-grid {
    grid-template-columns: 1fr;
  }

  .step-description {
    font-size: 16px;
    padding: 0 20px;
  }

  .phone-number {
    font-size: 28px;
    padding: 12px 24px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 40px 0;
  }

  .slider-section {
    max-width: 400px;
    overflow: hidden;
  }

  .hero__title {
    font-size: 24px;
  }

  .hero__subtitle {
    font-size: 14px;
  }

  .card {
    padding: 20px;
  }

  .card__title {
    font-size: 20px;
  }

  .show-card__content h4 {
    font-size: 16px;
  }

  .show-card__content p {
    font-size: 12px;
  }

  .step__number {
    width: 35px;
    height: 35px;
    font-size: 14px;
  }

  .step p {
    font-size: 14px;
  }

  .price {
    font-size: 20px;
  }

  .price-note {
    font-size: 12px;
  }

  .step-header h2 {
    font-size: 20px;
  }

  .game-card__content h3,
  .lounge-card__content h3 {
    font-size: 18px;
  }

  .btn-more {
    width: 100%;
    text-align: center;
  }
}
</style> 