<template>

    <!-- HEADER  -->
    
    <Header></Header>
    <!-- <Owl></Owl> -->
    <!-- MAIN SECTION -->
  
    <section class="main">
      <div class="container">
        <ul class="servises__list">
          <li class="main-slider"><ImgSlider :images="imageUrls"></ImgSlider></li>
          <router-link
            class="serviсes__el quests"
            to="/quests"
            style="background-image: url('src/assets/images/quest__2.jpg');"
          >
            <span class="overlay">Квесты</span>
          </router-link>

          <a href="https://party-kod.ru/"
            class="serviсes__el karaoke"
            style="background-image: url('src/assets/images/party.jpg');"
          >
            <span class="overlay">Караоке</span>
          </a>

          <router-link
            class="serviсes__el action-games"
            to="/action-games"
            style="background-image: url('src/assets/images/action.jpg');"
          >
            <span class="overlay">Экшн-игры</span>
          </router-link>

          <a  href="https://kartingchego.ru/"
              class="serviсes__el karting"
              style="background-image: url('src/assets/images/chego.jpg');"
            >
              <span class="overlay">Картинг</span>
          </a>
          <li class="programs"><ImgSlider :images="imagePrograms" :is-promo-slider="true"></ImgSlider></li>
          <li class="serviсes__el kids-party" style="background-image: url('src/assets/images/children.jpg');"><router-link class="overlay" to="/">Детские праздники</router-link></li>
          <li class="serviсes__el adult-party" style="background-image: url('src/assets/images/korporativ.jpg');"><router-link class="overlay" to="/">Корпоративы</router-link></li>
        </ul>
      </div>
    </section>
  
  <section class="container">
    <div class="about-stats">
      <div class="stat-card">
        <h3 class="stat-number">C 2015</h3>
        <p class="stat-text">Года работаем</p>
      </div>
      <div class="stat-card">
        <h3 class="stat-number">32</h3>
        <p class="stat-text">Квестов и мероприятий</p>
      </div>

      <div class="stat-card">
        <h3 class="stat-number">28 296</h3>
        <p class="stat-text">Проведено квестов и мероприятий</p>
      </div>

      <div class="stat-card">
        <h3 class="stat-number">100%</h3>
        <p class="stat-text">Гарантия веселья</p>
      </div>

      <div class="stat-card">
        <h3 class="stat-number">17 354</h3>
        <p class="stat-text">Подписчиков в ВК</p>
      </div>
    </div>
  </section>

    <VideoSlider :videos="videos"></VideoSlider>
  
    <section class="form">
        <div class="container">
          <h2 class="title">Заполни форму и мы с тобой свяжимся</h2>
          <Form></Form>
        </div>
    </section>
  
    <!-- FQA SECTION -->
  
    <section class="faq">
      <div class="container">
      <h2 class="title">Ответы на часто задаваемые вопросы</h2>

          <Accordion></Accordion>
      </div>
    </section>
  
    <!-- REVIEW SECTION -->
    <section class="review">
      <div class="container">
        <Review></Review>
      </div>
    </section>
    
    <!-- MAP SECTION -->
    <section class="map">
      <Map></Map>
    </section>
      
  
    <!-- FOOTER SECTION -->
    <Footer></Footer>
    
  
  </template>
  
  
  
  <script setup>
  import Accordion from '../components/Accordion.vue';
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  import Map from '@/components/Map.vue';
  import ImgSlider from '@/components/ImgSlider.vue';
  import Review from '@/components/Review.vue';
  import VideoSlider from "@/components/VideoSlider.vue";
  import Form from "@/components/Form.vue";

  const imageUrls = [
    'src/assets/images/sl2.jpg',
    'src/assets/images/korporativ.jpg',
    'src/assets/images/sl3.jpg',
  ];


  const imagePrograms = [
    {
      src: 'src/assets/images/discount1.jpg',
      alt: 'Легкий четверг',
      id: 'easy-thursday'
    },
    {
      src: 'src/assets/images/discount2.jpg',
      alt: 'Программа лояльности',
      id: 'loyalty-program'
    },
    {
      src: 'src/assets/images/discount3.jpg',
      alt: 'Билет',
      id: 'ticket'
    },
    {
      src: 'src/assets/images/discount4.jpg',
      alt: 'Скидка в день рождения',
      id: 'birthday'
    },
    {
      src: 'src/assets/images/discount5.jpg',
      alt: 'Акции Party KOD',
      id: 'party-kod'
    },
    {
      src: 'src/assets/images/discount6.jpg',
      alt: 'Жмурки',
      id: 'zhmurki'
    },
    {
      src: 'src/assets/images/discount7.jpg',
      alt: 'Классным руководителям',
      id: 'teachers'
    }
  ];

  const videos = [
    {
      src: "https://chezakod.ru/upload/video/5.mp4"
    },
    {
      src: "https://chezakod.ru/kiosk/video/actionkod/Action_Kod_Zhmurki_1min.mp4"
    },
  ];

  </script>
  
  
  
  <style>
  /* --------------------------------- */
  .container{
    width: 1200px;
    margin: 0 auto;
  }
  /* --------------------------------- */
  .servises__list{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(3, 176px);
    gap: 20px;
    margin: 60px auto;
    grid-template-areas:
      "slider slider slider quests games"
      "slider slider slider karting karaoke"
      "programs programs programs adult kids";
  }
  /* .serviсes__el{
    background-color: #CF1034;
    color: #fff;
    font-size: 36px;
    border-radius: 7.5px;
    transition: transform 0.5s ease;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
  }
  .serviсes__el:hover{
    transform: scale(1.15);
  } */
  .serviсes__el {
  position: relative;
  display: block;
  border-radius: 12px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

/* Псевдоэлемент для размытия фона */
.serviсes__el::before {
  content: "";
  position: absolute;
  inset: 0;
  backdrop-filter: blur(0px);
  background-color: rgba(0, 0, 0, 0.2);
  transition: backdrop-filter 0.4s ease, background-color 0.4s ease;
  z-index: 1;
}

/* Hover — активируем размытие */
.serviсes__el:hover::before {
  backdrop-filter: blur(2px);
}

/* Текстовая часть по центру */
.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  padding: 12px 20px;
  border-radius: 8px;
  opacity: 1;
  transition: opacity 0.4s ease;
}

/* Показываем текст при наведении */
.serviсes__el:hover .overlay {
  opacity: 1;
}
.serviсes__el:hover {
  transform: scale(1.05);
}






  .programs:hover, .main-slider:hover{
    transform: scale(1.05);
  }
  .main-slider{
    grid-area: slider;
    overflow: hidden;
    transition: transform 0.5s ease;
    border-radius: 10px;
  }
  .action-games{
    grid-area: games;
  }
  .quests{
    grid-area: quests;
  }
  .karting{
    grid-area: karting;
  }
  .karaoke{
    grid-area: karaoke;
  }
  .programs{
    grid-area: programs;
    overflow: hidden;
    transition: transform 0.5s ease;
    border-radius: 10px;
  }
  .adult-party{
    grid-area: adult;
  }
  .kids-party{
    grid-area: kids;
  }
  /* --------------------------------- */
  .slider-container{
    position: relative;
  }
  .overlay {
    color: #fff;
    font-size: 24px;
    background: radial-gradient(#000, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.0) );
    padding: 20px;
  }
  /* --------------------------------- */
  .title{
    color: #CF1034;
    font-size: 36px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;
  }
  .form{
    margin: 30px 0 60px;
  }
  .form__content{
    max-width: 792px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 40px;
    font-size: 24px;
  }
  .form__head{
    display: flex;
    justify-content: space-between;
    padding: 33px 80px;
    color: #000;
    border-bottom: 5px solid #CF1034;
  }
  .form__body{
    padding: 50px 80px;
  }
  .form__buttons{
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }
  .form__button{
    font-size: 24px;
    color: #fff;
    border: none;
    padding: 11px 65px;
    background-color: #CF1034;
  }
  input[type=radio]:checked{
    accent-color: #CF1034;
  }
  label{
    color: #000;
    margin-left: 30px;
  }
  /* --------------------------------- */
  .accordion{
    max-width: 792px;
    margin: 0 auto;
  }
  /* --------------------------------- */
  /* --------------------------------- */
  .footer{
    background-color: #CF1034;
    padding: 26px 0;
    font-size: 16px;
  }
  .faq{
    margin-bottom: 60px;
  }
  .review{
    margin-bottom: 60px;
  }


.about-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #000;
}

.about-stats {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 60px;
}

.stat-card {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 200px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  text-align: center;
  
}

.stat-card:hover {
  transform: scale(1.05);
}

.stat-number {
  font-size: 28px;
  font-weight: bold;
  color: #cf1034;
}
.stat-number::selection{
  color: #fff;
}
.stat-text {
  font-size: 16px;
  color: #333;
}
/* Адаптация */

@media (max-width: 450px) {
  .container{
    width: 100%;
    margin: 0 auto;
  }

  .servises__list{
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(6, 120px);
    grid-template-areas:
      "slider slider"
      "slider slider"
      "programs programs"
      "quests games"
      "karting karaoke"
      "adult kids";
  }
}
</style>