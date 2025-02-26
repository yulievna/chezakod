<template>

    <!-- HEADER  -->
    
    <Header></Header>
    <!-- <Owl></Owl> -->
    <!-- MAIN SECTION -->
  
    <section class="main">
      <div class="container">
        <ul class="servises__list">
          <li class="servises__el main-slider"><ImgSlider></ImgSlider></li>
          <router-link to="/quests"><li class="servises__el quests" style="background-image: url('src/assets/logovo-velikana.jpg');"></li></router-link>
          <li class="servises__el karaoke" style="background-image: url('src/assets/party.jpg');"><a href="#"></a></li>
          <li class="servises__el acrion-games" style="background-image: url('src/assets/action.jpg');"><a href="#"></a></li>
          <li class="servises__el karting" style="background-image: url('src/assets/chego.jpg');"><a href="#"></a></li>
          <li class="servises__el programs" style="background-image: url('src/assets/jmurki.jpg');"><a href="#"></a></li>
          <li class="servises__el kids-party" style="background-image: url('src/assets/children.jpg');"><a href="#"></a></li>
          <li class="servises__el adult-party"style="background-image: url('src/assets/korporativ.jpg');"><a href="#"></a></li>
        </ul>
      </div>
    </section>
  
  <section class="about-container">
    <div class="about-stats">
      <div class="stat-card">
        <h3 class="stat-number">10</h3>
        <p class="stat-text">Лет опыта</p>
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

    <VideoSlider></VideoSlider>
  
    <section class="slider">
        <div class="container slider-container">
        </div>
    </section>
  
    <!-- FQA SECTION -->
  
    <section class="faq">
      <div class="container">
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
  // import Slider from '../components/Slider.vue';
  import VideoCarousel from '@/components/VideoCarousel.vue';
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  import Map from '@/components/Map.vue';
  import ImgSlider from '@/components/ImgSlider.vue';
  import Form from '@/components/Form.vue';
  import Review from '@/components/Review.vue';
  import VideoSlider from "@/components/VideoSlider.vue";
  // import axios from 'axios';
  
  // let data = $ref(null);
  
  // async function fetchData() {
  //   try {
  //     const response = await axios.get('http://127.0.0.1:8000/category/list');
  //     data = response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  </script>
  
  
  
  <style>
  /* --------------------------------- */
  .container{
    width: 1280px;
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
  .servises__el{
    background-color: #CF1034;
    color: #fff;
    font-size: 36px;
    border-radius: 7.5px;
    transition: transform 0.5s ease;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    
  }
  .servises__el:hover{
    transform: scale(1.15);
  }
  .programs:hover, .main-slider:hover{
    transform: scale(1.05);
  }
  .main-slider{
    grid-area: slider;
  }
  .acrion-games{
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
  /* --------------------------------- */
  .form{
    margin: 290px 0 60px;
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
  .about-container {
  text-align: center;
  padding: 30px 20px;
  border-radius: 10px;
  margin: 50px auto;
  width: 100%;
  overflow: hidden;
}

.about-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #000;
}

.about-stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
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

.stat-text {
  font-size: 16px;
  color: #333;
}
/* Адаптация */

@media (max-width: 450px) {
  .container{
    width: 380px;
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