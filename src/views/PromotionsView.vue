<template>
  <Header></Header>
  <div class="promotions">
    <div class="promotions__container">

    <nav class="promotions__nav">
      <ul class="promotions__nav-list">
        <li><a href="#easy-thursday">Легкий четверг</a></li>
        <li><a href="#loyalty-program">Программа лояльности</a></li>
        <li><a href="#ticket">Билет</a></li>
        <li><a href="#birthday">Скидка в день рождения</a></li>
        <li><a href="#party-kod">Акции Party KOD</a></li>
        <li><a href="#zhmurki">Жмурки</a></li>
        <li><a href="#teachers">Классным руководителям</a></li>
      </ul>
    </nav>


      <div class="promotion-card" id="easy-thursday">
        <div class="promotion-card__image">
          <img src="@/assets/images/discount1.jpg" alt="Легкий четверг" class="promotion-card__img">
        </div>
        <div class="promotion-card__content">
          <div class="promotion-card__header">
            <h2 class="promotion-card__title">Легкий четверг</h2>
            <div class="promotion-card__price">2800 ₽</div>
          </div>
          <p class="promotion-card__description">
            Все квесты по четвергам по цене 2800 р.!<br>
            На команду от 2 до 4 человек.
          </p>
          <div class="promotion-card__details">
            <div class="promotion-card__promo">
              <span class="promo-label">Промокод</span>
              <span class="promo-code">"Легкий Четверг"</span>
            </div>
            <div class="promotion-card__conditions-wrapper">
              <h3 class="promotion-card__subtitle">Условия акции:</h3>
              <ul class="promotion-card__conditions">
                <li>Дополнительные участники оплачиваются отдельно.</li>
                <li>Не распространяется в праздничный день.</li>
                <li>Не распространяется на время позже 21:30</li>
                <li>Скидки и акции не суммируются.</li>
              </ul>
            </div>
            <p class="promotion-card__note">
              Акция не распространяется на экшн-игры Жмурки и ACTION:KOD
            </p>
            <div class="promotion-card__contact">
              <a href="tel:+73912699223" class="contact-button">
                <span class="contact-button__text">Забронировать</span>
                <span class="contact-button__phone">+7 (391) 269-92-23</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="promotion-card" id="loyalty-program">
        <div class="promotion-card__image">
          <img src="@/assets/images/discount2.jpg" alt="Программа лояльности" class="promotion-card__img">
        </div>
        <div class="promotion-card__content">
          <div class="promotion-card__header">
            <h2 class="promotion-card__title">Программа лояльности «Чеширский Код»</h2>
          </div>
          <p class="promotion-card__description">
            Во всех филиалах сети «Чеширский Код» действует единая программа лояльности для гостей.
            Посещая нас, вы копите баллы в своём аккаунте Telegram-бота. 1 балл = 1 рубль.
          </p>
          <div class="promotion-card__details">
            <div class="promotion-card__features-wrapper">
              <h3 class="promotion-card__subtitle">Наш бот – это удобный сервис для вас:</h3>
              <ul class="promotion-card__features">
                <li>Копить и тратить баллы, отслеживать свой баланс;</li>
                <li>Выбирать и бронировать услуги компании;</li>
                <li>Получать свои фотоснимки по итогам игр сразу в свой личный аккаунт.</li>
              </ul>
            </div>
            <div class="promotion-card__bonus">
              <h3 class="promotion-card__subtitle">При каждом посещении компании ваш бонусный баланс будет
                увеличиваться:</h3>
              <ul class="promotion-card__bonus-list">
                <li>+ 5% вернётся баллами от стоимости квестов, экшн-игр, заездов на картинге, лофт-караоке</li>
                <li>+ 1% - от стоимости любых других услуг – аренда залов, шоу-программы, дополнительные услуги и т.д.
                </li>
              </ul>
            </div>
            <div class="promotion-card__restrictions">
              <h3 class="promotion-card__subtitle">Ограничения:</h3>
              <ul class="promotion-card__restrictions-list">
                <li>Вывести баллы для оплаты товаров и услуг компаний, не принадлежащих корпорации «Чеширский Код», или
                  обналичить их нельзя;
                </li>
                <li>Списать баллы возможно при бронировании по телефону 2-333-999 и на сайте chezakod.ru;</li>
                <li>Баллы не суммируются с другими акциями.</li>
              </ul>
            </div>
            <a href="https://t.me/ChezakodBot" target="_blank" class="telegram-button">
              <span class="telegram-button__text">Перейти в Telegram-бот</span>
              <span class="telegram-button__bonus">+200 баллов при регистрации</span>
            </a>
          </div>
        </div>
      </div>

      <div class="promotion-card" id="ticket">
        <div class="promotion-card__image">
          <img src="@/assets/images/discount4.jpg" alt="Билет" class="promotion-card__img">
        </div>
        <div class="promotion-card__content">
          <div class="promotion-card__header">
            <h2 class="promotion-card__title">Билет</h2>
            <div class="promotion-card__price">3000 ₽</div>
          </div>
          <p class="promotion-card__description">
            Билет на квест-комнату по цене 3000 р.!<br>
            На команду от 2 до 4 человек.
          </p>
          <div class="promotion-card__details">
            <div class="promotion-card__promo">
              <span class="promo-label">Промокод</span>
              <span class="promo-code">"Билет"</span>
            </div>
            <div class="promotion-card__conditions-wrapper">
              <h3 class="promotion-card__subtitle">Условия акции:</h3>
              <ul class="promotion-card__conditions">
                <li>Дополнительные участники оплачиваются отдельно.</li>
                <li>Не распространяется в праздничный день.</li>
                <li>Не распространяется на время позже 21:30</li>
                <li>Скидки и акции не суммируются.</li>
              </ul>
            </div>
            <p class="promotion-card__note">
              Акция не распространяется на экшн-игры Жмурки и ACTION:KOD
            </p>
            <div class="promotion-card__contact">
              <a href="tel:+73912699223" class="contact-button">
                <span class="contact-button__text">Забронировать</span>
                <span class="contact-button__phone">+7 (391) 269-92-23</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="promotion-card" id="birthday">
        <div class="promotion-card__image">
          <img src="@/assets/images/discount3.jpg" alt="Скидка в день рождения" class="promotion-card__img">
        </div>
        <div class="promotion-card__content">
          <div class="promotion-card__header">
            <h2 class="promotion-card__title">Скидка в день рождения</h2>
            <div class="promotion-card__price">10%</div>
          </div>
          <p class="promotion-card__description">
            У вас День рождения? Дарим скидку 10% на любой квест!
          </p>
          <div class="promotion-card__details">
            <div class="promotion-card__conditions-wrapper">
              <h3 class="promotion-card__subtitle">Условия акции:</h3>
              <ul class="promotion-card__conditions">
                <li>Скидка действительна при условии предъявления паспорта или свидетельства о рождении администратору
                  на локации.
                </li>
                <li>Срок действия скидки – 3 дня до и 3 дня после дня рождения.</li>
                <li>Не распространяется на дополнительные услуги.</li>
                <li>Скидки и акции не суммируются.</li>
              </ul>
            </div>
            <p class="promotion-card__note">
              Акция не распространяется на экшн-игры Жмурки и ACTION:KOD
            </p>
            <div class="promotion-card__contact">
              <a href="tel:+73912699223" class="contact-button">
                <span class="contact-button__text">Забронировать</span>
                <span class="contact-button__phone">+7 (391) 269-92-23</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="promotion-card" id="party-kod">
        <div class="promotion-card__image">
          <img src="@/assets/images/discount5.jpg" alt="Party KOD" class="promotion-card__img">
        </div>
        <div class="promotion-card__content">
          <div class="promotion-card__header">
            <h2 class="promotion-card__title">Party KOD лофт-караоке</h2>
          </div>
          <p class="promotion-card__description">
            Во всех залах Party KOD действуют акции:
          </p>
          <div class="promotion-card__details">
            <div class="promotion-card__conditions-wrapper">
              <h3 class="promotion-card__subtitle">Акции:</h3>
              <ul class="promotion-card__conditions">
                <li>Пятый час в подарок.</li>
                <li>10% скидка имениннику. Действует 3 дня до и 3 дня после дня рождения, распространяется на аренду
                  залов.
                </li>
                <li>Для получения скидки необходимо предоставить подтверждающий документ.</li>
                <li>Акции и скидки не суммируются.</li>
              </ul>
            </div>
            <div class="promotion-card__contact">
              <a href="tel:+79311074636" class="contact-button">
                <span class="contact-button__text">Забронировать</span>
                <span class="contact-button__phone">+7 (931) 107-46-36</span>
              </a>
            </div>
            <p class="promotion-card__note">
              Адрес филиала: ул. Партизана Железняка, 26в.
            </p>
          </div>
        </div>
      </div>

      <div class="promotion-card" id="zhmurki">
        <div class="promotion-card__image">
          <img src="@/assets/images/discount6.jpg" alt="Жмурки" class="promotion-card__img">
        </div>
        <div class="promotion-card__content">
          <div class="promotion-card__header">
            <h2 class="promotion-card__title">Жмурки</h2>
          </div>
          <p class="promotion-card__description">
            У Вас День рождения? Именинник играет бесплатно!
          </p>
          <div class="promotion-card__details">
            <div class="promotion-card__conditions-wrapper">
              <h3 class="promotion-card__subtitle">Условия акции:</h3>
              <ul class="promotion-card__conditions">
                <li>Стоимость игры рассчитывается по количеству участников в команде, без учета именинника.</li>
                <li>Скидка действительна при условии предъявления паспорта или свидетельства о рождении администратору
                  на локации.
                </li>
                <li>Срок действия акции – 3 дня до и 3 дня после дня рождения.</li>
                <li>Скидка распространяется на команды от 5 игроков.</li>
                <li>Скидки и акции не суммируются.</li>
              </ul>
            </div>
            <div class="promotion-card__contact">
              <a href="tel:+73912699223" class="contact-button">
                <span class="contact-button__text">Забронировать</span>
                <span class="contact-button__phone">+7 (391) 269-92-23</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="promotion-card" id="teachers">
        <div class="promotion-card__image">
          <img src="@/assets/images/discount7.jpg" alt="Классным руководителям" class="promotion-card__img">
        </div>
        <div class="promotion-card__content">
          <div class="promotion-card__header">
            <h2 class="promotion-card__title">Классным руководителям и представителям родительского комитета</h2>
          </div>
          <p class="promotion-card__description">
            Ищите место, где организовать выпускной, школьный праздник или вечеринку для класса?
          </p>
          <div class="promotion-card__details">
            <div class="promotion-card__features-wrapper">
              <h3 class="promotion-card__subtitle">Наши возможности:</h3>
              <ul class="promotion-card__features">
                <li>Различные форматы игр, банкетные залы и все необходимое для Вашего мероприятия есть в любом из наших
                  филиалов: Алексеева, Мира, Робеспьера, Комсомолл на Белинского.
                </li>
                <li>Нужна активность на вашей территории? Ведущие, диджеи и фотографы Чеширского приедут к Вам со своей
                  программой.
                </li>
                <li>Для классов действуют специальные цены!</li>
              </ul>
            </div>
            <div class="promotion-card__contact">
              <a href="tel:+73912699223" class="contact-button">
                <span class="contact-button__text">Забронировать</span>
                <span class="contact-button__phone">+7 (391) 269-92-23</span>
              </a>
            </div>
            <p class="promotion-card__note">
              Подробности по телефону 2-333-999
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="promotions__note">
      <p>Скидки и акции не суммируются. Все сертификаты/купоны/флаера/прочие рекламные и скидочные инструменты действуют
        только при бронировании на официальном сайте chezakod.ru или по телефону +7 (391) 269-92-23</p>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
import {onMounted, watch} from 'vue';
import {useRoute} from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import {useHead} from "@unhead/vue";
useHead({
  title: "Акции"
});

const route = useRoute();

const scrollToPromotion = (hash) => {
  if (hash) {
    const element = document.getElementById(hash.slice(1));
    if (element) {
      const headerHeight = 200;
      const y = element.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
};

onMounted(() => {
  scrollToPromotion(route.hash);

  document.querySelectorAll('.promotions__nav-list a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = 200;
        const y = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // Отслеживание активной секции
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('.promotions__nav-list a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.promotion-card').forEach(card => {
    observer.observe(card);
  });
});

watch(() => route.hash, (newHash) => {
  scrollToPromotion(newHash);
});
</script>

<style scoped>
.promotions__nav {
  width: 100%;
  max-width: 1200px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px;
  position: fixed;
  top: 130px;
  margin: 0 auto;
  text-align: center;
  z-index: 2;
  border-radius: 10px;
}

.promotions__nav-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.promotions__nav-list li a {
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.promotions__nav-list li a:hover,
.promotions__nav-list li a.active {
  background: #cf1034;
  color: #fff;
}

.promotions {
  padding-top: 120px;
  max-width: 1200px;
  margin: 0 auto;
}

.promotions__hero {
  text-align: center;
  margin-bottom: 40px;
}

.promotions__title {
  font-size: 2.5rem;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.promotions__container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.promotion-card {
  background: rgba(0, 0, 0, 0.9);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  scroll-margin-top: 100px; /* Отступ для фиксированного хедера */
}

.promotion-card:hover {
  transform: translateY(-5px);
}

.promotion-card__image {
  width: 100%;
  overflow: hidden;
}

.promotion-card__img {

  object-fit: contain;
  transition: transform 0.3s ease;
}

.promotion-card:hover .promotion-card__img {
  transform: scale(1.05);
}

.promotion-card__content {
  padding: 30px;
}

.promotion-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.promotion-card__title {
  color: #fff;
  margin: 0;
  font-size: 1.8rem;
  flex: 1;
}

.promotion-card__price {
  background: #cf1034;
  color: #fff;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: bold;
}

.promotion-card__description {
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 25px;
  line-height: 1.6;
}

.promotion-card__details {
  color: #fff;
}

.promotion-card__promo {
  background: rgba(207, 16, 52, 0.2);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.promo-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.promo-code {
  font-size: 1.2rem;
  font-weight: bold;
  color: #cf1034;
}

.promotion-card__subtitle {
  color: #fff;
  font-size: 1.3rem;
  margin: 25px 0 15px;
  position: relative;
  padding-left: 15px;
}

.promotion-card__subtitle::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 20px;
  background: #cf1034;
  border-radius: 3px;
}

.promotion-card__conditions,
.promotion-card__features,
.promotion-card__bonus-list,
.promotion-card__restrictions-list {
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 20px;
}

.promotion-card__conditions li,
.promotion-card__features li,
.promotion-card__bonus-list li,
.promotion-card__restrictions-list li {
  margin-bottom: 12px;
  line-height: 1.5;
  padding-left: 25px;
  position: relative;
}

.promotion-card__conditions li::before,
.promotion-card__features li::before,
.promotion-card__bonus-list li::before,
.promotion-card__restrictions-list li::before {
  content: '•';
  color: #cf1034;
  position: absolute;
  left: 0;
  font-size: 1.5rem;
  line-height: 1;
}

.promotion-card__note {
  color: #fff;
  margin: 25px 0;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  line-height: 1.5;
}

.contact-button,
.telegram-button {
  display: block;
  text-decoration: none;
  text-align: center;
  padding: 15px;
  border-radius: 10px;
  margin-top: 25px;
  transition: all 0.3s ease;
}

.contact-button {
  background: #cf1034;
  color: #fff;
}

.telegram-button {
  background: #0088cc;
  color: #fff;
}

.contact-button:hover,
.telegram-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.contact-button__text,
.telegram-button__text {
  display: block;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.contact-button__phone,
.telegram-button__bonus {
  display: block;
  font-size: 0.9rem;
  opacity: 0.9;
}

.promotions__note {
  margin: 40px 0;
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  text-align: center;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .promotions {
    padding: 0;
  }

  .promotions__nav {
    display: none;
  }

  .promotions__container {
    padding: 10px;
  }

  .promotion-card {
    flex-direction: column;
    margin-bottom: 20px;
  }

  .promotion-card__image {
    width: 100%;
  }

  .promotion-card__img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }

  .promotion-card__content {
    padding: 10px;
  }

  .promotion-card__title {
    font-size: 18px;
  }

  .promotion-card__price {
    font-size: 16px;
  }

  .promotion-card__description,
  .promotion-card__subtitle,
  .promotion-card__note {
    font-size: 14px;
  }

  .promotion-card__conditions,
  .promotion-card__features,
  .promotion-card__bonus-list,
  .promotion-card__restrictions-list {
    padding-left: 20px;
    font-size: 14px;
  }

  .contact-button {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 5px;
  }

  .contact-button__text,
  .contact-button__phone {
    font-size: 16px;
  }

  .telegram-button {
    flex-direction: column;
    text-align: center;
    padding: 10px;
    font-size: 16px;
  }

  .promotions__note {
    padding: 15px;
    margin: 0 10px;
    font-size: 12px;
    text-align: center;
  }
}

</style> 