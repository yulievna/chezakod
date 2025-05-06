<template>
  <Header></Header>

  <section class="about-us">
    <div class="container">
      <h1>О нас</h1>

      <div class="about-content">
        <div class="about-text" data-aos="fade-right">
          <p>Мы — команда корпорации развлечений Чеширский код, родились и живём в Красноярске, и с 2015 года создаём проекты, которые дарят эмоции, впечатления и радость всей семье. Компания официально образовалась в 2017 году, и всё началось с квестов в реальности.</p>
          <p>Мы уделяем внимание каждой детали, поэтому наши квесты до сих пор остаются одними из самых любимых развлечений гостей всех возрастов. У нас есть форматы как с актёрами, так и классические сценарные квесты, а также современные игровые механики с дополненной реальностью и необычными сюжетами.</p>
        </div>
        <div class="about-image" data-aos="fade-left">
          <img src="@/assets/images/logo-white.svg" alt="Чеширский код" />
        </div>
      </div>
    </div>
  </section>

  <section class="organizations">
    <div class="container">
      <h2 data-aos="fade-up">Наши проекты</h2>
      <p class="section-intro" data-aos="fade-up" data-aos-delay="100">Со временем мы поняли, что хотим большего — так родились новые уникальные форматы:</p>
      
      <div class="org-grid">
        <div class="org-card" data-aos="fade-up" data-aos-delay="200">
          <div class="card-content">
            <img src="@/assets/images/logo-white.svg" alt="Чеширский KOD" />
            <h3>Чеширский KOD</h3>
            <p>Атмосферные квесты, организация и проведение праздников в Красноярске.</p>
          </div>
          <a href="https://chezakod.ru" class="btn-primary" target="_blank">Перейти на сайт</a>
        </div>

        <div class="org-card" data-aos="fade-up" data-aos-delay="300">
          <div class="card-content">
            <img src="@/assets/images/zhmurki-logo.svg" alt="Жмурки" />
            <h3>Жмурки</h3>
            <p>Первая экшн-игра в полной темноте, которая влюбила в себя тысячи игроков.</p>
          </div>
          <a href="https://zhmurki.ru" class="btn-primary" target="_blank">Перейти на сайт</a>
        </div>

        <div class="org-card" data-aos="fade-up" data-aos-delay="400">
          <div class="card-content">
            <img src="@/assets/images/chego-logo.svg" alt="Че!Go" />
            <h3>Че!Go</h3>
            <p>Современный крытый электрокартинг для всей семьи. Удобное расположение, свежий воздух, безопасность и драйв!</p>
          </div>
          <a href="https://chego.ru" class="btn-primary" target="_blank">Перейти на сайт</a>
        </div>

        <div class="org-card" data-aos="fade-up" data-aos-delay="500">
          <div class="card-content">
            <img src="@/assets/images/actionkod-logo.svg" alt="Action Kod" />
            <h3>Action Kod</h3>
            <p>Технологичный соревновательный формат, в котором команды решают задания, проходят испытания и соревнуются за баллы. Эту игру мы разрабатывали с 2018 года и вложили в неё весь наш опыт.</p>
          </div>
          <a href="https://actionkod.ru" class="btn-primary" target="_blank">Перейти на сайт</a>
        </div>

        <div class="org-card" data-aos="fade-up" data-aos-delay="600">
          <div class="card-content">
            <img src="@/assets/images/actionkod-logo.svg" alt="Play Kod" />
            <h3>Play Kod</h3>
            <p>Новинка 2025 года! Интерактивный сенсорный пол, где можно бегать, прыгать, играть с друзьями или всей семьёй. Формат ярких мини-игр, от которых не оторваться.</p>
          </div>
          <a href="https://playkod.ru" class="btn-primary" target="_blank">Перейти на сайт</a>
        </div>

        <div class="org-card" data-aos="fade-up" data-aos-delay="700">
          <div class="card-content">
            <img src="@/assets/images/partykod-logo.svg" alt="Party Kod" />
            <h3>Party Kod</h3>
            <p>Уютные лофт-караоке комнаты с атмосферой праздника и качественным звуком.</p>
          </div>
          <a href="https://partykod.ru" class="btn-primary" target="_blank">Перейти на сайт</a>
        </div>
      </div>
    </div>
  </section>

  <section class="mission">
    <div class="container">
      <div class="mission-content" data-aos="zoom-in">
        <h2>Наша миссия</h2>
        <p>Мы развиваемся и расширяемся, но остаёмся верны своей идее делать лучшее, что только можно придумать для веселья, эмоций и настоящих приключений</p>
      </div>
    </div>
  </section>

  <section class="contacts">
    <div class="container">
      <h2 data-aos="fade-up">Контакты</h2>
      <div class="contacts-grid">
        <div class="contact-info" data-aos="fade-right">
          <h3>Адрес</h3>
          <p>г. Красноярск, ул. Вавилова, 1</p>
          
          <h3>График работы</h3>
          <p>Ежедневно с 10:00 до 22:00</p>
          
          <a href="tel:+73912000000" class="contact-link">
            <i class="fas fa-phone"></i>
            +7 (391) 200-00-00
          </a>
          <a href="mailto:info@chezakod.ru" class="contact-link">
            <i class="fas fa-envelope"></i>
            info@chezakod.ru
          </a>
        </div>
        
        <div class="contact-map" data-aos="fade-left">
          <Map></Map>
        </div>
      </div>
    </div>
  </section>

  <Footer></Footer>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Map from '@/components/Map.vue';
// import AOS from 'aos';
// import '../aos/dist/aos.css';
import { onMounted } from 'vue';

// onMounted(() => {
//   AOS.init({
//     duration: 1000,
//     once: true,
//     offset: 100
//   });
// });
</script>

<style scoped>
.about-us {
  padding: 80px 0;
  /* background-color: #fff; */
}

.about-content {
  display: flex;
  align-items: center;
  gap: 60px;
}

.about-text {
  flex: 1;
}

.about-us h1 {
  font-size: 48px;
  color: #CF1034;
  margin-bottom: 30px;
  text-align: center;
}

.about-text p {
  font-size: 18px;
  line-height: 1.6;
  color: #fff;
  margin-bottom: 20px;
}

.about-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-image img {
  max-width: 100%;
  height: auto;
}

/* Organizations Section */
.organizations {
  padding: 80px 0;
  /* background-color: #f8f8f8; */
}
.organizations h2{
  font-size: 48px;
  color: #CF1034;
  margin-bottom: 30px;
  text-align: center;

}

.section-intro {
  font-size: 20px;
  color: #fff;
  margin-bottom: 40px;
  text-align: center;
}

.org-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;
}

.org-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #000;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  height: 400px;
  overflow: hidden;
}

.org-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #CF1034, #000);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.org-card:hover::before {
  opacity: 0.1;
}

.org-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.card-content {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.org-card img {
  width: 150px;
  height: 50px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.org-card:hover img {
  transform: scale(1.1);
}

.org-card h3 {
  color: #fff;
  font-size: 24px;
  margin-bottom: 15px;
  transition: color 0.3s ease;
}

.org-card p {
  color: #fff;
  margin-bottom: 20px;
  line-height: 1.5;
  opacity: 0.8;
}

.btn-primary {
  position: relative;
  z-index: 2;
  display: inline-block;
  padding: 12px 24px;
  background-color: #CF1034;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s ease;
  border: 2px solid #CF1034;
}

.btn-primary:hover {
  background-color: transparent;
  color: #CF1034;
}

/* Mission Section */
.mission {
  padding: 100px 0;
  background: linear-gradient(45deg, #CF1034, #a00d29);
  color: #fff;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.mission::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/images/pattern.svg') repeat;
  opacity: 0.1;
  animation: slide 20s linear infinite;
}

@keyframes slide {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 100%;
  }
}

.mission-content {
  max-width: 800px;
  margin: 0 auto;
}

.mission h2 {
  font-size: 36px;
  margin-bottom: 30px;
}

.mission p {
  font-size: 24px;
  line-height: 1.6;
}

/* Contacts Section */
.contacts {
  padding: 80px 0;
  /* background-color: #fff; */
}

.contacts h2 {
  text-align: center;
  color: #CF1034;
  margin-bottom: 50px;
}

.contacts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
}

.contact-info h3 {
  color: #333;
  margin-bottom: 15px;
  font-size: 20px;
}

.contact-info p {
  color: #666;
  margin-bottom: 30px;
  font-size: 18px;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #CF1034;
  text-decoration: none;
  font-size: 18px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  padding: 10px;
  border-radius: 5px;
}

.contact-link:hover {
  background-color: #f8f8f8;
  transform: translateX(10px);
}

.contact-link i {
  font-size: 20px;
}

.contact-map {
  border-radius: 10px;
  overflow: hidden;
}

@media (max-width: 1200px) {
  .container {
    width: 90%;
    margin: 0 auto;
  }
  
  .org-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
    text-align: center;
  }

  .about-text h1 {
    font-size: 36px;
  }

  .about-text p {
    font-size: 16px;
  }

  .org-grid {
    grid-template-columns: 1fr;
  }

  .contacts-grid {
    grid-template-columns: 1fr;
  }

  .mission p {
    font-size: 20px;
  }

  .org-card {
    height: auto;
    min-height: 400px;
  }
  
  .contact-link:hover {
    transform: translateX(5px);
  }
}
</style> 