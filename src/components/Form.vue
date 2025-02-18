<template>
  <div class="quiz-container">
    <transition name="fade" mode="out-in">
      <div v-if="currentQuestion < questions.length" :key="currentQuestion" class="question-card">
        <!-- Заголовок -->
        <div class="question-header">
          <div class="question-title">
            <h1>Создайте свой праздник</h1>
            <div>{{ currentQuestion + 1 }} / {{ questions.length }}</div>
          </div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: ((currentQuestion + 1) / questions.length) * 100 + '%' }"></div>
          </div>
        </div>

        <!-- Вопрос -->
        <h2>{{ questions[currentQuestion].question }}</h2>

        <!-- Варианты ответа (radio) -->
        <ul v-if="questions[currentQuestion].type === 'radio'">
          <li v-for="(answer, index) in questions[currentQuestion].answers" :key="index">
              <input type="radio" :value="answer" v-model="selectedAnswers[currentQuestion]" @change="autoNext()" />
            <label> {{ answer }} </label>
          </li>
        </ul>

        <!-- Варианты ответа (checkbox) -->
        <ul v-if="questions[currentQuestion].type === 'checkbox'">
          <li v-for="(answer, index) in questions[currentQuestion].answers" :key="index">
            <label class="custom-checkbox">
              <input type="checkbox" :value="answer" v-model="selectedAnswers[currentQuestion]" />
              <span class="checkmark"></span> {{ answer }}
            </label>
          </li>
        </ul>

        <!-- Ввод текста -->
        <div v-else-if="questions[currentQuestion].type === 'text'">
          <input type="text" v-model="selectedAnswers[currentQuestion]" placeholder="Введите ваш ответ" />
        </div>

        <!-- Ввод даты -->
        <div v-else-if="questions[currentQuestion].type === 'date'">
          <input type="date" v-model="selectedAnswers[currentQuestion]" />
        </div>

        <!-- Кнопки навигации -->
        <div class="navigation-buttons">
          <button v-if="currentQuestion > 0" @click="previousQuestion">Назад</button>
          <button v-if="!isLastQuestion" @click="nextQuestion">Вперед</button>
          <button v-if="isLastQuestion" @click="submitForm">Завершить</button>
        </div>
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
          type: "text",
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
    async submitForm() {
      try {
        const response = await axios.post("https://your-backend.com/api/submit", this.selectedAnswers);
        console.log("Ответ успешно отправлен!", response.data);
        alert("Форма успешно отправлена!");
      } catch (error) {
        console.error("Ошибка при отправке данных", error);
        alert("Ошибка при отправке формы!");
      }
    },
  },
  created() {
    // Инициализируем `checkbox` как массив
    this.questions.forEach((q, index) => {
      if (q.type === "checkbox") {
        this.selectedAnswers[index] = [];
      }
    });
  },
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
  margin-top: 260px;
  color: #fff;
}

/* Карточка */
.question-card {
  background-color: #fff;
  color: #000;
  border-radius: 7.5px;
  padding: 20px;
  width: 792px;
  text-align: left;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
}

/* Заголовок */
.question-header {
  align-items: center;
  margin-bottom: 20px;
}

.question-title {
  display: flex;
  justify-content: space-between;
}

/* Прогресс-бар */
.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #ddd;
  border-radius: 5px;
  margin-top: 10px;
  position: relative;
}

.progress {
  height: 100%;
  background-color: #CF1034;
  border-radius: 5px;
}

/* Варианты ответа */
ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: left;
  margin-bottom: 3px;
}
label{
  margin-left: 10px;
}

input[type="radio"],
input[type="checkbox"]{
  border: 1px solid #ccc;
  border-radius: 20px;
  width: 15px;
}
input[type="text"],
input[type="date"] {
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  width: 100%;
}

/* Кнопки */
.navigation-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

button {
  background-color: #CF1034;
  color: white;
  border: none;
  padding: 7px 35px;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #000000;
}

button:hover {
  background-color: #D41A40;
}

/* Анимация перехода */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
