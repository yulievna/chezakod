<template>
  <Header/>
  <div class="certificates">
    <section class="certificates-hero">
      <div class="container">
        <h1 class="title">Подарочные сертификаты</h1>
        <div class="certificates-grid">
          <div
              class="certificate-card"
              :class="{ 'selected': selectedCertificate === 2500 }"
              @click="selectCertificate(2500)"
          >
            <img loading="lazy" src="@/assets/images/sert3.jpg" alt="Сертификат на 6 человек" class="certificate-image">
          </div>
          <div
              class="certificate-card"
              :class="{ 'selected': selectedCertificate === 3000 }"
              @click="selectCertificate(3000)"
          >
            <img loading="lazy" src="@/assets/images/sert1.jpg" alt="Сертификат на 2 человека" class="certificate-image">
          </div>
          <div
              class="certificate-card"
              :class="{ 'selected': selectedCertificate === 3500 }"
              @click="selectCertificate(3500)"
          >
            <img loading="lazy" src="@/assets/images/sert2.jpg" alt="Сертификат на 4 человека" class="certificate-image">
          </div>

        </div>
      </div>
      <button class="btn btn-primary" @click="openForm">Заказать сертификат</button>

    </section>

    <section class="delivery-methods">
      <div class="container">
        <h2 class="section-title">Способы получения</h2>
        <div class="methods-grid">
          <div class="method-card">
            <h3>Самовывоз</h3>
            <p>Вы можете приобрести подарочный сертификат на квесты на любой из локаций Чеширского Кода на ресепшене у
              администратора</p>
          </div>
          <div class="method-card">
            <h3>Доставка</h3>
            <p>Вы можете заказать сертификат на квест с доставкой до дома или работы. Стоимость доставки сертификата в
              черте города — 200 рублей</p>
          </div>
          <div class="method-card">
            <h3>Электронный сертификат</h3>
            <p>Вы можете приобрести электронный сертификат, воспользоваться им можно распечатав или показав сертификат
              администратору на ресепшене</p>
          </div>
        </div>
      </div>
    </section>

    <section class="usage-conditions">
      <div class="container">
        <h2 class="section-title">Условия использования</h2>
        <div class="conditions-list">
          <div class="condition-item">
            <p>Получатель сертификата может сам выбрать день, время и приключение для себя и своей команды</p>
          </div>
          <div class="condition-item">
            <p>Сертификат рассчитан на команду из 2, 4 и 6 человек</p>
          </div>
          <div class="condition-item">
            <p>Стоимость сертификатов соответствует стоимости выбранного квеста</p>
          </div>
          <div class="condition-item">
            <p>Если приобретен сертификат меньшей стоимости, чем забронированная игра, есть возможность доплатить
              разницу администратору локации</p>
          </div>
          <div class="condition-item">
            <p>Срок действия сертификатов: 6 месяцев с момента покупки</p>
          </div>
        </div>
      </div>
    </section>

    <section class="gift-ideas">
      <div class="container">
        <h2 class="section-title">Кому можно подарить?</h2>
        <div class="gift-grid">
          <div class="gift-card">
            <img loading="lazy" src="@/assets/images/child.png" alt="Детям" class="gift-icon">
            <h3>Сыну или дочке!</h3>
            <p>Подарите настоящее приключение своему ребенку и его друзьям! Наши квесты подходят для детей благодаря
              присутствию аниматора, который помогает юным игрокам справиться с поставленными задачами!</p>
          </div>
          <div class="gift-card">
            <img loading="lazy" src="@/assets/images/friends.png" alt="Друзьям" class="gift-icon">
            <h3>Компании друзей!</h3>
            <p>У вас большая компания? Подарите сертификат в квест всей команде и отправляйтесь все вместе в
              приключение, которое вы никогда не забудете!</p>
          </div>
          <div class="gift-card">
            <img loading="lazy" src="@/assets/images/family.png" alt="Родителям" class="gift-icon">
            <h3>Папе с мамой!</h3>
            <p>Оригинальный подарок для всей семьи! Подарите родным отличный досуг в квестах в реальности!</p>
          </div>
          <div class="gift-card">
            <img loading="lazy" src="@/assets/images/boss.png" alt="Руководителю" class="gift-icon">
            <h3>Руководителю!</h3>
            <p>Что подарить начальнику на день рождения или его профессиональный праздник? Подарите любое из 10
              уникальных приключений, в которые он сможет отправиться со своими близкими и отдохнуть от рабочей
              рутины!</p>
          </div>
          <div class="gift-card">
            <img loading="lazy" src="@/assets/images/couple.png" alt="Любимому" class="gift-icon">
            <h3>Любимому человеку!</h3>
            <p>Сертификат в квест — подарок для вас двоих, приключение, в котором он покажет себя героем, она ощутит
              себя нужной, а вместе вы будете крепкой командой!</p>
          </div>
          <div class="gift-card">
            <img loading="lazy" src="@/assets/images/best-friend.png" alt="Лучшему другу" class="gift-icon">
            <h3>Лучшему другу!</h3>
            <p>Интересный подарок лучшему другу или подруге — чтобы потом вместе сыграть в квест!</p>
          </div>
        </div>
      </div>
    </section>

    <section class="universal-gift">
      <div class="container">
        <div class="universal-content">
          <h2>Универсальный подарок для всех поводов!</h2>
          <p>Подарок кому угодно! — сертификаты универсальны для любого возраста и для любой профессии!</p>
          <p class="age-info">В квесты можно играть, начиная с 5 лет и верхняя планка не ограничена!</p>
          <button class="btn btn-secondary" @click="openForm">Заказать сертификат</button>
        </div>
      </div>
    </section>
  </div>
  <Footer/>

  <CertificateForm
      :is-open="isFormOpen"
      :selected-certificate="selectedCertificate"
      @close="closeForm"
  />
</template>

<script setup>
import {defineAsyncComponent, ref} from 'vue';
import {useHead} from "@unhead/vue";

useHead({
  title: "Сертификаты"
});

const Header = defineAsyncComponent(() => import('@/components/Header.vue'));
const Footer = defineAsyncComponent(() => import('@/components/Footer.vue'));
const CertificateForm = defineAsyncComponent(() => import('@/components/CertificateForm.vue'));

const isFormOpen = ref(false)
const selectedCertificate = ref(null)

const selectCertificate = (price) => {
  selectedCertificate.value = price
}

const openForm = () => {
  isFormOpen.value = true
}

const closeForm = () => {
  isFormOpen.value = false
}
</script>

<style scoped>
.certificates {
  color: #fff;
  margin-top: 10px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.title, .section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 500;
  color: #CF1034;
}

section {
  margin-bottom: 60px;
}

.certificates-grid {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 4rem;
  perspective: 1000px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  min-height: 200px;
}

.certificate-card {
  position: relative;
  background: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 500px;
  transform-style: preserve-3d;
  opacity: 0.7;
  transform: scale(0.9);
}

.certificate-card:hover {
  transform: scale(1.05);
  z-index: 2;
  opacity: 0.9;
}

.certificate-card.selected {
  transform: scale(1.1);
  z-index: 3;
  opacity: 1;
}

.certificate-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.certificate-card:hover .certificate-image,
.certificate-card.selected .certificate-image {
  transform: scale(1.05);
}

.certificate-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  transform: translateZ(20px);
}

.certificate-content h3 {
  margin: 0;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* Delivery Methods */
.methods-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
}

.method-card {
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.method-card h3 {
  margin-bottom: 1rem;
  color: #fff;
  font-size: 24px;
}

.method-card p {
  color: #fff;
}

/* Usage Conditions */
.conditions-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.condition-item {
  position: relative;
  background: #1a1a1a;
  padding: 1.5rem 1.5rem 1.5rem 3rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.condition-item::before {
  content: "✓";
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #CF1034;
  font-size: 1.2rem;
  font-weight: bold;
}

.condition-item p {
  margin: 0;
  line-height: 1.5;
  color: #fff;
}

/* Gift Ideas */
.gift-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.gift-card {
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.gift-icon {
  margin-bottom: 1rem;
}

.gift-card h3 {
  margin-bottom: 1rem;
  color: #fff;
}

.gift-card p {
  color: #fff;
}

/* Universal Gift */
.universal-gift {
  background: #CF1034;
  padding: 4rem 0;
  margin-bottom: 0;
}

.universal-content {
  text-align: center;
  color: #fff;
}

.universal-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.universal-content p {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.age-info {
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

/* Buttons */
.btn {
  padding: 0.8rem 2rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin: 0 auto;
  display: block;
}

.btn-primary {
  background: #CF1034;
  color: #fff;
}

.btn-primary:hover {
  background: #b00e2d;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(207, 16, 52, 0.3);
}

.btn-secondary {
  background: #000;
  color: #fff;
  margin-top: 24px;
}

.btn-secondary:hover {
  box-shadow: 0 4px 15px rgba(49, 5, 13, 0.3);
  transform: translateY(-2px);
}

/* Responsive Styles */
@media (max-width: 1200px) {
  .container{
    padding: 0 1rem;
  }
  .certificates-grid {
    gap: 1.5rem;
  }

  .certificate-card {
    width: 450px;
  }

  .methods-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 992px) {
  .certificates-grid {
    gap: 1rem;
    margin-bottom: 40px;
  }

  .certificate-card {
    width: 400px;
  }
}

@media (max-width: 768px) {
  .certificates-grid {
    flex-direction: column;
    gap: 2rem;
    min-height: auto;
  }

  .certificate-card {
    max-width: 400px;
    opacity: 1;
    transform: scale(1);
  }

  .certificate-card:hover {
    transform: scale(1.02);
  }

  .certificate-card.selected {
    transform: scale(1.15);
  }
  .title, .section-title {
    font-size: 1.8rem;
  }
  .methods-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .method-card {
    padding: 1.5rem;
  }

  .method-card h3 {
    font-size: 20px;
  }

  .condition-item {
    padding: 1.2rem 1.2rem 1.2rem 2.5rem;
  }
}

@media (max-width: 480px) {
  .certificate-card {
    max-width: 100%;
  }

  .certificate-card {
    max-width: 250px;
    opacity: 1;
    transform: scale(1);
  }
  .certificate-content h3 {
    font-size: 18px;
  }

  .method-card {
    padding: 1.2rem;
  }

  .method-card h3 {
    font-size: 18px;
  }

  .condition-item {
    padding: 1rem 1rem 1rem 2rem;
  }
}
</style>