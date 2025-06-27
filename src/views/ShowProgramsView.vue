<template>
  <div class="show-programs">
    <Header></Header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1 class="hero__title">Шоу-программы</h1>
        <p class="hero__subtitle">Специальные программы для детей от 5 до 7 лет. Дети становятся героями и активными
          участниками сказачного приключения, а пройти все испытания им помогают анимированные сказочные персонажи.</p>
        <p class="hero__duration">Длительность всех шоу-программ - 2 часа 30 минут</p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="main-content">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Загрузка шоу-программ...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <p>{{ error }}</p>
          <button @click="loadShows" class="retry-button">Повторить</button>
        </div>

        <!-- Основные шоу-программы -->
        <div v-else>
          <div class="shows-grid">
            <div class="shows-grid">
              <div v-for="show in showPrograms" :key="show.id" class="show-card">
                <div class="show-image" @click="openModal(show, 'gallery')">
                  <img :src="show.previewImage" :alt="show.name" loading="lazy">
                </div>
                <div class="show-content" @click="openModal(show, 'description')">
                  <h3>{{ show.name }}</h3>
                  <p class="show-description" v-html="show.previewText"></p>
                  <div class="show-details">
                    <div class="detail-row">
                      <span class="detail-label">Адрес: {{ show.location.address }}</span>
                    </div>
                    <div class="show-price">От {{ show.price.base }} ₽ / участник <span
                        class="price-note">Команда до {{ show.price.players }} человек - {{ show.price.all }} ₽</span>
                    </div>
                    <div class="show-buttons">
                      <button>Подробнее</button>
                      <button class="book" @click="openModal(show, 'book')" @click.stop>Забронировать</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Галерея шоу-программы -->
          <div v-if="showGallery" class="gallery-modal" @click="closeModal">
            <div class="gallery-modal__content" @click.stop>
              <button class="gallery-modal__close" @click="closeModal">&times;</button>
              <swiper-container
                  :navigation="true"
                  thumbs-swiper=".show-thumbs"
                  class="swiper-show"
                  :zoom="true"
              >
                <swiper-slide
                    v-for="(photo, index) in selectedShow.gallery"
                    :key="index"
                >
                  <div class="swiper-zoom-container">
                    <img :src="photo" :alt="`Фото ${index + 1}`">
                  </div>
                </swiper-slide>
              </swiper-container>
              <swiper-container
                  class="show-thumbs"
                  :slidesPerView="3"
                  :free-mode="true"
                  :watchSlidesProgress="true"
                  :spaceBetween="10"
                  :breakpoints="{
                    768: {
                       slidesPerView: 6
                    }
                  }"
              >
                <swiper-slide
                    v-for="(photo, index) in selectedShow.gallery"
                    :key="index"
                    class="thumbs-slide"
                >
                  <img :src="photo" :alt="`Фото ${index + 1}`">
                </swiper-slide>
              </swiper-container>
            </div>
          </div>

          <div v-if="showDescription" class="gallery-modal" @click="closeModal">
            <div class="gallery-modal__content" @click.stop>
              <button class="gallery-modal__close" @click="closeModal">&times;</button>
              <div class="description-modal">
                <h3>{{ selectedShow.name }}</h3>
                <p class="description" v-html="selectedShow.detailText"></p>
                <p class="include-title">Что входит:</p>
                <ul>
                  <li v-for="element in selectedShow.elements">{{ element }}</li>
                </ul>
                <p><span class="bolder">Ведущие: </span>{{ selectedShow.actor }}</p>
                <p><span class="bolder">Продолжительность: </span>{{ selectedShow.duration }}</p>
                <p><span class="bolder">Звуоковое сопровождение: </span>{{ selectedShow.music }}</p>
                <p><span class="bolder">Адрес: </span>{{ selectedShow.location.address }}</p>
                <div class="map-links">
                  <a
                      v-if="selectedShow.location.links && selectedShow.location.links.ymaps"
                      :href="selectedShow.location.links.ymaps"
                      target="_blank"
                      class="map-link"
                  >
                    Яндекс.Карты
                  </a>
                  <a
                      v-if="selectedShow.location.links && selectedShow.location.links['2gis']"
                      :href="selectedShow.location.links['2gis']"
                      target="_blank"
                      class="map-link"
                  >
                    2GIS
                  </a>
                </div>
                <div class="show-price">От {{ selectedShow.price.base }} ₽ / участник
                  <span class="price-note">Команда до {{
                      selectedShow.price.players
                    }} человек - {{ selectedShow.price.all }} ₽</span>
                </div>
                <div class="show-buttons">
                  <button class="book" @click="openModal(selectedShow, 'book')">Забронировать</button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="showBook" class="gallery-modal" @click="closeModal">
            <div class="gallery-modal__content" @click.stop>
              <div class="booking-modal">
                <button class="gallery-modal__close" @click="closeModal">&times;</button>
                <h2 class="booking-modal__title">Бронирование шоу-программы</h2>

                <div v-if="!isSubmitted" class="booking-modal__form">
                  <div class="selected-show">
                    <strong>Выбранная программа:</strong> {{ selectedShow.name }}
                  </div>

                  <div class="form-group">
                    <label for="booking-name">Ваше имя</label>
                    <div class="input-wrapper">
                      <input
                          type="text"
                          id="booking-name"
                          v-model="bookingData.name"
                          required
                          placeholder="Введите ваше имя"
                          @input="validateField('name')"
                          @blur="validateField('name')"
                          :class="{ 'error': errors.name }"
                      >
                      <div class="input-focus-effect"></div>
                    </div>
                    <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
                  </div>

                  <div class="form-group">
                    <label for="booking-phone">Телефон</label>
                    <div class="input-wrapper">
                      <input
                          type="tel"
                          id="booking-phone"
                          v-model="bookingData.phone"
                          v-mask="'+7 (###) ###-##-##'"
                          required
                          placeholder="+7 (___) ___-__-__"
                          @input="handlePhoneInput"
                          @blur="validateField('phone')"
                          @keyup.enter="submitBooking"
                          :class="{ 'error': errors.phone }"
                          ref="phoneInput"
                      >
                      <div class="input-focus-effect"></div>
                    </div>
                    <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
                  </div>

                  <div class="form-group">
                    <label for="booking-date">Дата мероприятия</label>
                    <div class="input-wrapper">
                      <input
                          type="date"
                          id="booking-date"
                          v-model="bookingData.date"
                          required
                          @input="validateField('date')"
                          @blur="validateField('date')"
                          :class="{ 'error': errors.date }"
                          :min="minDate"
                      >
                      <div class="input-focus-effect"></div>
                    </div>
                    <span v-if="errors.date" class="error-message">{{ errors.date }}</span>
                  </div>

                  <div class="form-group">
                    <label for="booking-comment">Пожелания и комментарии</label>
                    <div class="input-wrapper">
                      <textarea
                          id="booking-comment"
                          v-model="bookingData.comment"
                          placeholder="Ваши пожелания, особенности мероприятия и т.д."
                          rows="3"
                      ></textarea>
                      <div class="input-focus-effect"></div>
                    </div>
                  </div>

                  <button
                      type="submit"
                      class="booking-modal__submit"
                      @click="submitBooking"
                      :disabled="isSubmitting || !isFormValid"
                  >
                    {{ isSubmitting ? 'Отправка...' : 'Забронировать' }}
                  </button>
                </div>

                <div v-else class="success-message">
                  <div class="success-icon">✓</div>
                  <h3>Заявка отправлена!</h3>
                  <p>Мы свяжемся с вами для подтверждения бронирования.</p>
                  <button class="close-btn" @click="closeModal">Закрыть</button>
                </div>
                <span v-if="errors.submit" class="error-message">{{ errors.submit }}</span>
              </div>
            </div>
          </div>

          <h2 class="section-title">Дополнительные развлечения</h2>
          <p class="section-subtitle">
            Вы можете добавить к любой шоу-программе небольшие увлекательные развлечения
          </p>
          <div class="mini-shows-grid">
            <div v-for="mini in miniShows" :key="mini.id" class="mini-show-card" @click="openMiniModal(mini)">
              <img :src="mini.image" :alt="mini.name" loading="lazy">
              <h4>{{ mini.name }}</h4>
              <p class="mini-price">{{ mini.price }} ₽</p>
            </div>
          </div>

          <!-- Modal -->
          <div v-if="selectedMiniShow" class="modal-backdrop" @click.self="closeMiniModal">
            <div class="modal-content">
              <button class="modal-close" @click="closeMiniModal">×</button>
              <img :src="selectedMiniShow.image" :alt="selectedMiniShow.name"/>
              <h3>{{ selectedMiniShow.name }}</h3>
              <p>{{ selectedMiniShow.description }}</p>
              <p class="mini-price">{{ selectedMiniShow.price }} ₽</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer></Footer>
  </div>
</template>


<script setup>
import {onMounted, onServerPrefetch, ref, computed} from 'vue'
import axios from 'axios'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import {useHead} from "@unhead/vue";
import {register} from "swiper/element/bundle";

register();


const showPrograms = ref([]);
const miniShows = ref([]);
const selectedMiniShow = ref(null);
const loading = ref(true);
const error = ref(null);
const selectedShow = ref(null);
const showGallery = ref(false);
const showDescription = ref(false);
const showBook = ref(false);

const bookingData = ref({
  name: '',
  phone: '',
  date: '',
  comment: '',
  showTitle: ''
});

const errors = ref({
  name: '',
  phone: '',
  date: '',
  submit: ''
});

const isSubmitting = ref(false);
const isSubmitted = ref(false);
const phoneInput = ref(null);

const minDate = computed(() => {
  return new Date().toISOString().split('T')[0];
});

const isFormValid = computed(() => {
  return bookingData.value.name.trim() &&
      isValidPhone(bookingData.value.phone) &&
      bookingData.value.date
});


const openModal = (show, mode) => {
  selectedShow.value = show;
  showGallery.value = false;
  showDescription.value = false;
  showBook.value = false;
  document.body.style.overflow = 'hidden';
  switch (mode) {
    case "gallery":
      showGallery.value = true;
      break;
    case "description":
      showDescription.value = true;
      break;
    case "book":
      showBook.value = true;
      break;
    default:
      document.body.style.overflow = '';
  }
};

const openMiniModal = (mini) => {
  selectedMiniShow.value = mini;
  document.body.style.overflow = "hidden";
}

const closeMiniModal = () => {
  selectedMiniShow.value = null;
  document.body.style.overflow = "";
}

const closeModal = () => {
  selectedShow.value = null;
  showGallery.value = false;
  showDescription.value = false;
  showBook.value = false;
  document.body.style.overflow = '';

  bookingData.value = {
    name: '',
    phone: '',
    date: '',
    comment: '',
    showTitle: ''
  };
  errors.value = {
    name: '',
    phone: '',
    date: '',
    submit: ''
  };
  isSubmitted.value = false;
};

const handlePhoneInput = () => {
  let digits = bookingData.value.phone.replace(/\D/g, '');
  if (digits.startsWith('8') && digits.length > 0) {
    digits = '7' + digits.slice(1);
  }
  else if (!digits.startsWith('7') && digits.length > 0) {
    digits = '7' + digits;
  }

  digits = digits.slice(0, 11);

  let formatted = '+7';
  if (digits.length > 1) {
    formatted += ` (${digits.slice(1, 4)}`;
  }
  if (digits.length > 4) {
    formatted += `) ${digits.slice(4, 7)}`;
  }
  if (digits.length > 7) {
    formatted += `-${digits.slice(7, 9)}`;
  }
  if (digits.length > 9) {
    formatted += `-${digits.slice(9, 11)}`;
  }

  bookingData.value.phone = formatted;
  validateField('phone');
};

const isValidPhone = (phone) => {
  const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  return phoneRegex.test(phone);
};

const validateField = (field) => {
  errors.value[field] = '';

  if (field === 'name') {
    if (!bookingData.value.name.trim()) {
      errors.value.name = 'Введите ваше имя';
    } else if (bookingData.value.name.trim().length < 2) {
      errors.value.name = 'Имя слишком короткое';
    }
  }

  if (field === 'phone') {
    if (!bookingData.value.phone) {
      errors.value.phone = 'Введите номер телефона';
    } else if (!isValidPhone(bookingData.value.phone)) {
      errors.value.phone = 'Введите корректный номер';
    }
  }

  if (field === 'date') {
    if (!bookingData.value.date) {
      errors.value.date = 'Укажите дату мероприятия';
    }
  }
};

const submitBooking = async () => {
  validateField('name');
  validateField('phone');
  validateField('date');

  if (Object.values(errors.value).some(error => error)) return;

  isSubmitting.value = true;

  try {
    const submitData = {
      ...bookingData.value,
      phone: bookingData.value.phone.replace(/\D/g, ''),
      showId: selectedShow.value?.id
    };

    const formDataToSend = new FormData();
    formDataToSend.append('name', submitData.name);
    formDataToSend.append('phone', submitData.phone);
    formDataToSend.append('date', submitData.date);
    formDataToSend.append('comment', submitData.comment);
    formDataToSend.append('showTitle', submitData.showTitle);
    if (submitData.showId) {
      formDataToSend.append('showId', submitData.showId);
    }

    // const response = await fetch(import.meta.env.VITE_API_URL + '/booking', {
    //   method: 'POST',
    //   body: formDataToSend
    // });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при отправке формы');
    }

    const result = await response.json();
    isSubmitted.value = true;
  } catch (error) {
    console.error('Ошибка при отправке:', error);
    errors.value.submit = error.message || 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.';
  } finally {
    isSubmitting.value = false;
  }
};

const loadShows = async () => {
  loading.value = true;
  error.value = null;

  try {
    const [main, mini] = await Promise.all([
      axios.get(import.meta.env.VITE_API_URL + '/show/'),
      axios.get(import.meta.env.VITE_API_URL + '/service/')
    ]);

    // Основные шоу
    showPrograms.value = main.data.result.map(show => ({
      id: show.id,
      name: show.name,
      previewImage: show.preview_image,
      previewText: show.preview_text,
      detailText: show.detail_text,
      detailImage: show.detail_image,
      duration: show.duration,
      actor: show.actor,
      price: show.price,
      gallery: show.photo || [],
      location: show.location,
      music: show.music,
      elements: show.elements
    }));

    // Мини-шоу
    miniShows.value = mini.data.result.map(service => ({
      id: service.id,
      name: service.name,
      description: service.description.replace(/<[^>]*>/g, ''),
      price: service.price,
      image: service.image
    }));
  } catch (err) {
    console.error(err);
    error.value = 'Ошибка загрузки шоу-программ.';
  } finally {
    loading.value = false;
  }
};

useHead({
  title: "Шоу-программы"
});

onServerPrefetch(loadShows);
onMounted(loadShows);

</script>

<style scoped>

.map-links {
  display: inline-flex;
  gap: 10px;
}

.map-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  padding: 10px 16px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;
  border: 3px solid #cf1034;
}

.map-link:hover {
  background: var(--primary-color);
  color: #fff;
}

.description-modal {
  background: white;
  padding: 30px;
  border-radius: 10px;
  overflow-x: hidden;
  overflow-y: auto;
}

.description-modal h3 {
  font-size: 24pt;
  font-weight: 700;
  margin-bottom: 12px;
  color: #CF1034;
  line-height: 1.3;
}

.description-modal p {
  font-size: 12pt;
  margin-bottom: 10px;
}

.description-modal .include-title {
  font-weight: bold;
  font-size: larger;
  margin: 0;
}

.description-modal ul {
  list-style: none;
  padding-left: 20px;
  margin-bottom: 10px;
}

.description-modal li {
  background: url('https://chezakod.ru/local/templates/main/img/show/star.png') no-repeat left center;
  padding-left: 30px;
  font-size: 12pt;
}

.bolder {
  font-weight: bold;
  font-size: larger;
}

.show-buttons {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.show-buttons button {
  display: inline-block;
  padding: 10px 30px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
  border: none;
}

@media(max-width: 405px) {
  .show-buttons button {
    padding: 10px;
  }
}

.show-buttons button.book {
  color: #fff;
  background-color: var(--primary-color);
}

.show-buttons button:not(.book) {
  background-color: white;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.show-buttons button.book::before {
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

.show-buttons button.book:hover::before {
  left: 100%;
}

.swiper-show {
  margin-bottom: 10px;
}

swiper-container * {
  border-radius: 20px;
}

swiper-slide.thumbs-slide img {
  object-fit: cover;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s ease;
}

swiper-slide.thumbs-slide img:hover {
  opacity: 0.8;
}

swiper-slide.swiper-slide-thumb-active.thumbs-slide img {
  border: 2px solid #cf1034;
  opacity: 1;
}

.hero__duration {
  margin-top: 20px;
  font-size: 18pt;
  font-weight: bold;
  text-decoration: underline;
}

.mini-shows-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.mini-show-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  text-align: center;
  padding: 10px;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mini-show-card:hover {
  transform: translateY(-4px);
}

.section-title {
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  margin-top: 60px;
  color: #000;
}

.section-subtitle {
  text-align: center;
  font-size: 14pt;
}

.mini-shows-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.mini-show-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 16px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.mini-show-card:hover {
  transform: translateY(-5px);
}

.mini-shows-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.mini-show-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  transition: transform 0.3s ease;
  padding: 15px;
}

.mini-show-card:hover {
  transform: scale(1.03);
}

.mini-show-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.mini-show-card h4 {
  font-size: 18px;
  margin: 12px 0 6px;
  color: #CF1034;
}

.mini-price {
  font-weight: bold;
  color: #333;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 500px;
  max-height: 95%;
  width: 90%;
  position: relative;
  animation: fadeIn 0.3s ease;
  overflow-x: hidden;
  overflow-y: auto;
}

.modal-content img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
}

.modal-content h3 {
  color: #CF1034;
  margin-bottom: 10px;
}

.modal-content p {
  margin-bottom: 10px;
  line-height: 1.5;
  color: #555;
}

.modal-close {
  position: absolute;
  top: -5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #666;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.show-card {
  background: linear-gradient(to bottom right, #fff, #fdf4f6);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.show-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
}

.show-title {
  font-size: 1.6rem;
  color: #CF1034;
  font-weight: 700;
  margin-bottom: 10px;
}

.show-description {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
}

.show-link {
  background: linear-gradient(135deg, #CF1034, #e82c4c);
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
}


.show-programs {
  background-color: #f8f9fa;
}

.hero {
  background-size: cover;
  background-position: center;
  color: #000;
  padding: 40px 0 0 0;
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

.container {
  width: 1200px;
  margin: 0 auto;
}

.shows-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  margin: 30px 0;
}

.show-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.show-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.show-image {
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.show-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.show-card:hover .show-image img {
  transform: scale(1.03);
}

.show-content {
  display: flex;
  flex-direction: column;
  padding: 24px;
  flex-grow: 1;
}

.show-content h3 {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #CF1034;
  line-height: 1.3;
  height: 50px;
}

.show-description {
  font-size: 15px;
  line-height: 1.5;
  color: #000;
  flex-grow: 1;
}

.show-details {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.show-details p {
  color: #666;
}

.detail-row {
  display: flex;
  margin-bottom: 8px;
  font-size: 14px;
  gap: 10px;
}

.detail-label {
  font-weight: 500;
  color: #333;
  min-width: 90px;
}

.detail-value {
  color: #666;
}

.show-price {
  font-size: 20px;
  font-weight: 700;
  color: #CF1034;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed #eee;
}

.price-note {
  font-size: 13px;
  font-weight: 400;
  color: #888;
  display: block;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .shows-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .show-image {
    height: 180px;
  }

  .show-content {
    padding: 18px;
  }

  .description-modal {
    padding: 15px;
  }

  .map-link {
    width: 100%;
    padding: 12px;
  }
}

@media (max-width: 1200px) {
  .container {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .hero__title {
    font-size: 36px;
  }

  .hero__subtitle {
    font-size: 20px;
  }

  .hero__duration {
    font-size: 14pt;
  }

  .shows-grid {
    grid-template-columns: 1fr;
  }

  ::-webkit-scrollbar-track {
    opacity: 0;
  }

  .gallery-modal__content {
    border-radius: 16px;
    position: relative;
    width: 90%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 40px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #CF1034;
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Error State */
.error-state {
  text-align: center;
  padding: 40px;
  color: #CF1034;
}

.retry-button {
  margin-top: 20px;
  padding: 10px 20px;
  background: #CF1034;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.retry-button:hover {
  background: #a00d29;
}

.gallery-modal {

  ::-webkit-scrollbar {
    display: none;
  }

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.gallery-modal__content {
  border-radius: 16px;
  position: relative;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.gallery-modal__close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 5px;
  line-height: 1;
  transition: color 0.3s ease;
}

.gallery-modal__close:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.gallery-modal__thumbnails img {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.gallery-modal__thumbnails img:hover {
  opacity: 0.8;
  transform: scale(1.05);
}

.gallery-modal__thumbnails img.active {
  opacity: 1;
  border: 2px solid #CF1034;
}

@media (max-width: 768px) {

  .gallery-modal__close {
    right: -10px;
    top: -40px;
  }
}
/* Cтили для формы бронирования */
.booking-modal {
 position: relative;
 background: white;
 padding: 30px;
 border-radius: 12px;
 max-width: 500px;
 margin: 0 auto;
}

.booking-modal__title {
  font-size: 24px;
  color: #CF1034;
  margin-bottom: 25px;
  text-align: center;
}

.selected-show {
  background: #f8f8f8;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 16px;
}

.booking-modal__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.input-wrapper {
  position: relative;
}

.form-group input,
.form-group textarea {
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Rubik', sans-serif;
  transition: border-color 0.3s ease;
  width: 100%;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #CF1034;
  outline: none;
}

.input-focus-effect {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #CF1034;
  transition: width 0.3s ease;
}


.booking-modal__submit {
  background: #CF1034;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.booking-modal__submit:hover {
  background: #a00d29;
}

.booking-modal__submit:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #ff4444;
  font-size: 14px;
  margin-top: 4px;
}

input.error,
textarea.error {
  border-color: #ff4444;
}

.success-message {
  text-align: center;
  padding: 20px 0;
}

.success-icon {
  width: 60px;
  height: 60px;
  background: #CF1034;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  margin: 0 auto 20px;
}

.success-message h3 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

.success-message p {
  color: #666;
  margin-bottom: 20px;
}

.close-btn {
  background: #CF1034;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .booking-modal {
    padding: 20px;
  }

  .booking-modal__title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .form-group input,
  .form-group textarea {
    padding: 10px;
    font-size: 14px;
  }

  .booking-modal__submit {
    padding: 12px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .booking-modal {
    padding: 15px;
    margin: 10px;
    width: calc(100% - 20px);
  }

  .booking-modal__title {
    font-size: 18px;
    margin-bottom: 15px;
  }

  .selected-show {
    font-size: 14px;
    padding: 10px;
  }

  .form-group label {
    font-size: 14px;
  }
}
</style>
