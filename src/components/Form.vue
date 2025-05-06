<template>
  <div class="quiz-container">
    <transition name="fade" mode="out-in">
      <!-- Блок с вопросами -->
      <div v-if="currentQuestion < questions.length" :key="currentQuestion" class="question-card">
        <!-- Заголовок -->
        <div class="question-header">
          <div class="question-title">
            <h1>Создайте свой праздник</h1>
            <div class="question-counter">{{ currentQuestion + 1 }} / {{ questions.length }}</div>
          </div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: ((currentQuestion + 1) / questions.length) * 100 + '%' }"></div>
          </div>
        </div>

        <!-- Вопрос -->
        <h2>{{ questions[currentQuestion].question }}</h2>

        <!-- Варианты ответа (radio) -->
        <ul v-if="questions[currentQuestion].type === 'radio'" class="answer-list">
          <li v-for="(answer, index) in questions[currentQuestion].answers" 
              :key="index"
              :class="{ 'selected': selectedAnswers[currentQuestion] === answer }"
              @click="selectRadioAnswer(answer)">
            <input type="radio" 
                   :value="answer" 
                   v-model="selectedAnswers[currentQuestion]" 
                   @change="autoNext()"
                   :id="'radio-' + index" />
            <label :for="'radio-' + index">{{ answer }}</label>
          </li>
        </ul>

        <!-- Варианты ответа (checkbox) -->
        <ul v-if="questions[currentQuestion].type === 'checkbox'" class="answer-list">
          <li v-for="(answer, index) in questions[currentQuestion].answers" 
              :key="index"
              :class="{ 'selected': selectedAnswers[currentQuestion].includes(answer) }"
              @click="toggleCheckboxAnswer(answer)">
            <label class="custom-checkbox">
              <input type="checkbox" 
                     :value="answer" 
                     v-model="selectedAnswers[currentQuestion]"
                     :id="'checkbox-' + index" />
              <span class="checkmark"></span>
              {{ answer }}
            </label>
          </li>
        </ul>

        <!-- Ввод текста -->
        <div v-else-if="questions[currentQuestion].type === 'text'" class="text-input-wrapper">
          <input type="text" 
                 v-model="selectedAnswers[currentQuestion]" 
                 placeholder="Введите ваш ответ"
                 @keyup.enter="nextQuestion"
                 ref="textInput" />
          <div class="input-focus-effect"></div>
        </div>

        <!-- Ввод телефона с маской -->
        <div v-else-if="questions[currentQuestion].type === 'phone'" class="phone-input-wrapper">
          <input type="text"
              v-model="selectedAnswers[currentQuestion]"
              placeholder="+7 (___) ___-__-__"
                 @keyup.enter="nextQuestion"
                 ref="phoneInput" />
          <div class="input-focus-effect"></div>
        </div>

        <!-- Ввод даты -->
        <div v-else-if="questions[currentQuestion].type === 'date'" class="date-input-wrapper">
          <input type="date"
              v-model="selectedAnswers[currentQuestion]"
              @click="openDatePicker"
                 ref="dateInput" />
          <div class="input-focus-effect"></div>
        </div>

        <!-- Кнопки навигации -->
        <div class="navigation-buttons">
          <button v-if="currentQuestion > 0" 
                  @click="previousQuestion"
                  class="nav-btn prev-btn">
            <span class="btn-icon">←</span>
            Назад
          </button>
          <button v-if="!isLastQuestion" 
                  @click="nextQuestion"
                  class="nav-btn next-btn"
                  :disabled="!canProceed">
            Вперед
            <span class="btn-icon">→</span>
          </button>
          <button v-if="isLastQuestion" 
                  @click="submitForm"
                  class="nav-btn submit-btn"
                  :disabled="!canProceed">
            Завершить
          </button>
        </div>
      </div>

      <!-- Блок с благодарностью -->
      <div v-else class="thank-you-card">
        <div class="thank-you-icon">✓</div>
        <h1>Спасибо за вашу заявку!</h1>
        <p>Мы свяжемся с вами в ближайшее время.</p>
        <button class="close-btn" @click="$emit('close')">Закрыть</button>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      currentQuestion: 0,
      selectedAnswers: {}, // Храним ответы
      questions: [
        {
          question: "Укажите количество играющих гостей",
          type: "radio",
          answers: ["1-6 человек", "6-15 человек", "16 и более человек", "Не знаю"],
        },
        {
          question: "Укажите возраст игроков",
          type: "radio",
          answers: ["3-6 лет", "6-10 лет", "10-14 лет", "от 15 либо взрослые", "Сильный разброс"],
        },
        {
          question: "Какие активности вас интересуют?",
          type: "checkbox",
          answers: ["Картинг", "Экшн игры", "Квесты", "Детские квесты", "Лаундж зона", "День рождения", "Корпоратив", "Караоке", "Шоу программы"],
        },
        {
          question: "Желаемая длительность мероприятия",
          type: "radio",
          answers: ["1-2,5 часа", "2,5-3,5 часа", "4-6 часов"],
        },
        {
          question: "Желаемая дата мероприятия",
          type: "date",
        },
        {
          question: "Введите ваше имя",
          type: "text",
        },
        {
          question: "Введите ваш контактный номер",
          type: "phone", // Новый тип для телефона
        },
        {
          question: "Как с вами связаться?",
          type: "radio",
          answers: ["Звонок", "WhatsApp", "Telegram"],
        },
      ],
    };
  },
  computed: {
    isLastQuestion() {
      return this.currentQuestion === this.questions.length - 1;
    },
    canProceed() {
      const currentAnswer = this.selectedAnswers[this.currentQuestion];
      if (!currentAnswer) return false;
      
      if (Array.isArray(currentAnswer)) {
        return currentAnswer.length > 0;
      }
      
      return true;
    }
  },
  methods: {
    nextQuestion() {
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++;
      }
    },
    previousQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
      }
    },
    autoNext() {
      if (this.questions[this.currentQuestion].type === "radio") {
        setTimeout(() => {
          this.nextQuestion();
        }, 300);
      }
    },
    openDatePicker() {
      this.$refs.dateInput.showPicker(); // Открываем календарь
    },
    async submitForm() {
      try {
        console.log("Ответ успешно отправлен!", response.data);
        this.currentQuestion++; // Переход к блоку с благодарностью
      }
      catch (error) {
        console.error("Ошибка при отправке данных", error);
        alert("Ошибка при отправке формы!");
      }
    },
    selectRadioAnswer(answer) {
      this.selectedAnswers[this.currentQuestion] = answer;
      this.autoNext();
    },
    toggleCheckboxAnswer(answer) {
      const answers = this.selectedAnswers[this.currentQuestion];
      const index = answers.indexOf(answer);
      if (index === -1) {
        answers.push(answer);
      } else {
        answers.splice(index, 1);
      }
    },
    focusInput() {
      const currentInput = this.$refs[`${this.questions[this.currentQuestion].type}Input`];
      if (currentInput) {
        currentInput.focus();
      }
    }
  },
  created() {
    // Инициализируем `checkbox` как массив
    this.questions.forEach((q, index) => {
      if (q.type === "checkbox") {
        this.selectedAnswers[index] = [];
      }
    });
  },
  watch: {
    currentQuestion() {
      this.$nextTick(() => {
        this.focusInput();
      });
    }
  }
};
</script>

<style scoped>
.custom-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  position: relative;
  margin: 0;
}

/* Скрываем стандартный чекбокс */
.custom-checkbox input {
  display: none;
}

/* Кастомная кнопка чекбокса */
.custom-checkbox .checkmark {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border: 2px solid #CF1034;
  border-radius: 5px;
  display: inline-block;
  transition: background-color 0.3s ease, border 0.3s ease;
}

/* Когда чекбокс активен */
.custom-checkbox input:checked + .checkmark {
  background-color: #CF1034;
  border-color: #CF1034;
  position: relative;
}

/* Добавляем галочку при выборе */
.custom-checkbox input:checked + .checkmark::after {
  content: "✔";
  color: white;
  font-size: 14px;
  font-weight: bold;
  position: absolute;
  left: 3px;
  top: -3px;
}

/* Контейнер */
.quiz-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  height: 100%;
  padding: 20px;
}

/* Карточка */
.question-card {
  background-color: #fff;
  color: #000;
  border-radius: 15px;
  padding: 30px;
  width: 100%;
  text-align: left;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
}

.question-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

/* Заголовок */
.question-header {
  align-items: center;
  margin-bottom: 30px;
}

.question-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.question-title h1 {
  font-size: 24px;
  color: #000;
  margin: 0;
}

/* Прогресс-бар */
.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #eee;
  border-radius: 4px;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #CF1034;
  border-radius: 4px;
  transition: width 0.5s ease;
}

/* Вопрос */
h2 {
  font-size: 20px;
  margin-bottom: 25px;
  color: #333;
}

/* Варианты ответа */
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

li:hover {
  transform: translateX(5px);
}

label {
  margin-left: 10px;
  cursor: pointer;
  transition: color 0.3s ease;
}

input[type="radio"],
input[type="checkbox"] {
  border: 2px solid #CF1034;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
}

input[type="radio"]:checked,
input[type="checkbox"]:checked {
  background-color: #CF1034;
  box-shadow: inset 0 0 0 4px #fff;
}

input[type="text"],
input[type="date"] {
  margin-right: 10px;
  padding: 12px 20px;
  border: 2px solid #eee;
  border-radius: 25px;
  font-size: 16px;
  width: 100%;
  transition: all 0.3s ease;
}

input[type="text"]:focus,
input[type="date"]:focus {
  border-color: #CF1034;
  outline: none;
  box-shadow: 0 0 0 3px rgba(207, 16, 52, 0.1);
}

/* Кнопки */
.navigation-buttons {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.form-btn {
  background-color: #cf1034;
  color: #fff;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.form-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.6),
    transparent
  );
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-btn:hover::before {
  left: 100%;
}

.form-btn:hover {
  background-color: #a00d2a;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(207, 16, 52, 0.3);
}

/* Анимация перехода */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Адаптивность */
@media (max-width: 768px) {
  .quiz-container {
    padding: 10px;
    height: 100%;
    overflow-y: auto;
  }

  .question-card {
    padding: 20px;
    margin: 10px;
    height: auto;
    min-height: 100%;
  }

  .question-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .question-title h1 {
    font-size: 20px;
  }

  h2 {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .progress-bar {
    height: 6px;
  }

  li {
    margin-bottom: 12px;
  }

  label {
    font-size: 14px;
  }

  input[type="radio"],
  input[type="checkbox"] {
    width: 16px;
    height: 16px;
  }

  input[type="text"],
  input[type="date"] {
    padding: 10px 15px;
    font-size: 14px;
  }

  .navigation-buttons {
    margin-top: 20px;
    flex-direction: column;
    gap: 10px;
  }

  button {
    width: 100%;
    padding: 12px 20px;
    font-size: 14px;
  }

  .thank-you-card {
    padding: 30px 20px;
    margin: 10px;
  }

  .thank-you-card h1 {
    font-size: 24px;
    margin-bottom: 15px;
  }

  .thank-you-card p {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .question-card {
    padding: 15px;
    margin: 5px;
  }

  .question-title h1 {
    font-size: 18px;
  }

  h2 {
    font-size: 16px;
  }

  .custom-checkbox .checkmark {
    width: 16px;
    height: 16px;
  }

  .custom-checkbox input:checked + .checkmark::after {
    font-size: 12px;
    left: 2px;
    top: -2px;
  }

  button {
    padding: 10px 15px;
  }
}

/* Добавляем поддержку ландшафтной ориентации */
@media (max-height: 600px) and (orientation: landscape) {
  .quiz-container {
    padding: 5px;
  }

  .question-card {
    padding: 15px;
  }

  .question-title h1 {
    font-size: 18px;
  }

  h2 {
    font-size: 16px;
    margin-bottom: 15px;
  }

  .navigation-buttons {
    margin-top: 15px;
  }

  button {
    padding: 8px 15px;
  }
}

.answer-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.answer-list li {
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  padding: 12px 20px;
  background: #f8f8f8;
}

.answer-list li:hover {
  transform: translateX(5px);
  background: #f0f0f0;
}

.answer-list li.selected {
  background: #cf1034;
  color: white;
}

.answer-list li.selected label {
  color: white;
}

.custom-checkbox {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
}

.text-input-wrapper,
.phone-input-wrapper,
.date-input-wrapper {
  position: relative;
  margin: 20px 0;
}

.input-focus-effect {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #cf1034;
  transition: width 0.3s ease;
}

input:focus + .input-focus-effect {
  width: 100%;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-icon {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.prev-btn:hover .btn-icon {
  transform: translateX(-3px);
}

.next-btn:hover .btn-icon {
  transform: translateX(3px);
}

.submit-btn {
  background: #28a745;
}

.submit-btn:hover {
  background: #218838;
}

.thank-you-card {
  text-align: center;
  padding: 40px 20px;
}

.thank-you-icon {
  width: 80px;
  height: 80px;
  background: #28a745;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin: 0 auto 20px;
  animation: scaleIn 0.5s ease;
}

.close-btn {
  margin-top: 20px;
  background: #6c757d;
}

.close-btn:hover {
  background: #5a6268;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Улучшенная адаптивность */
@media (max-width: 768px) {
  .answer-list li {
    padding: 10px 15px;
  }

  .nav-btn {
    padding: 10px 20px;
    font-size: 14px;
  }

  .thank-you-icon {
    width: 60px;
    height: 60px;
    font-size: 30px;
  }
}

/* Добавляем поддержку тёмной темы */
@media (prefers-color-scheme: dark) {
  .answer-list li {
    background: #2a2a2a;
  }

  .answer-list li:hover {
    background: #3a3a3a;
  }

  input[type="text"],
  input[type="date"] {
    background: #2a2a2a;
    color: white;
  }

  .input-focus-effect {
    background: #28a745;
  }
}

/* Улучшаем доступность */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

.form-btn--secondary {
  background-color: #000;
  color: #fff;
}

.form-btn--secondary::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
}

.form-btn--secondary:hover {
  background-color: #000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}
</style>
