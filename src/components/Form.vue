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

        <!-- Сообщение об ошибке -->
        <div v-if="errors[currentQuestion]" class="error-message">
          {{ errors[currentQuestion] }}
        </div>

        <!-- Варианты ответа (radio) -->
        <ul v-if="questions[currentQuestion].type === 'radio'" class="answer-list">
          <li v-for="(answer, index) in questions[currentQuestion].answers" 
              :key="index"
              :class="{ 
                'selected': selectedAnswers[currentQuestion] === answer,
                'error': errors[currentQuestion] && !selectedAnswers[currentQuestion]
              }">
            <input type="radio" 
                   :value="answer" 
                   v-model="selectedAnswers[currentQuestion]" 
                   @change="validateAndNext"
                   :id="'radio-' + index" />
            <label :for="'radio-' + index">{{ answer }}</label>
          </li>
        </ul>

        <!-- Варианты ответа (checkbox) -->
        <ul v-if="questions[currentQuestion].type === 'checkbox'" class="answer-list">
          <li v-for="(answer, index) in questions[currentQuestion].answers" 
              :key="index"
              :class="{ 
                'selected': selectedAnswers[currentQuestion].includes(answer),
                'error': errors[currentQuestion] && (!selectedAnswers[currentQuestion] || selectedAnswers[currentQuestion].length === 0)
              }"
              @click="toggleCheckboxAnswer(answer)">
            <label class="custom-checkbox">
              <input type="checkbox" 
                     :value="answer" 
                     v-model="selectedAnswers[currentQuestion]"
                     @change="validateField"
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
                 :placeholder="questions[currentQuestion].placeholder || 'Введите ваш ответ'"
                 @input="validateField"
                 @keyup.enter="validateAndNext"
                 :class="{ 'error': errors[currentQuestion] }"
                 ref="textInput" />
          <div class="input-focus-effect"></div>
        </div>

        <!-- Ввод телефона с маской -->
        <div v-else-if="questions[currentQuestion].type === 'phone'" class="phone-input-wrapper">
          <input type="text"
                 v-model="selectedAnswers[currentQuestion]"
                 v-mask="'+7 (###) ###-##-##'"
                 placeholder="+7 (___) ___-__-__"
                 @input="validateField"
                 @keyup.enter="validateAndNext"
                 :class="{ 'error': errors[currentQuestion] }"
                 ref="phoneInput" />
          <div class="input-focus-effect"></div>
        </div>

        <!-- Ввод даты -->
        <div v-else-if="questions[currentQuestion].type === 'date'" class="date-input-wrapper">
          <input type="date"
                 v-model="selectedAnswers[currentQuestion]"
                 :min="minDate"
                 @change="validateField"
                 :class="{ 'error': errors[currentQuestion] }"
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
                  @click="validateAndNext"
                  class="nav-btn next-btn"
                  :disabled="!canProceed">
            Вперед
            <span class="btn-icon">→</span>
          </button>
          <button v-if="isLastQuestion" 
                  @click="submitForm"
                  class="nav-btn submit-btn"
                  :disabled="!canProceed || isSubmitting">
            {{ isSubmitting ? 'Отправка...' : 'Завершить' }}
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
import { mask } from 'vue-the-mask';

export default {
  directives: { mask },
  data() {
    return {
      currentQuestion: 0,
      selectedAnswers: {},
      errors: {},
      isSubmitting: false,
      minDate: new Date().toISOString().split('T')[0], // Сегодняшняя дата
      questions: [
        {
          question: "Укажите количество играющих гостей",
          type: "radio",
          answers: ["1-6 человек", "6-15 человек", "16 и более человек", "Не знаю"],
          required: true
        },
        {
          question: "Укажите возраст игроков",
          type: "radio",
          answers: ["3-6 лет", "6-10 лет", "10-14 лет", "от 15 либо взрослые", "Сильный разброс"],
          required: true
        },
        {
          question: "Какие активности вас интересуют?",
          type: "checkbox",
          answers: ["Картинг", "Экшн игры", "Квесты", "Детские квесты", "Лаундж зона", "День рождения", "Корпоратив", "Караоке", "Шоу программы"],
          required: true,
          minSelections: 1
        },
        {
          question: "Желаемая длительность мероприятия",
          type: "radio",
          answers: ["1-2,5 часа", "2,5-3,5 часа", "4-6 часов"],
          required: true
        },
        {
          question: "Желаемая дата мероприятия",
          type: "date",
          required: true
        },
        {
          question: "Введите ваше имя",
          type: "text",
          required: true,
          placeholder: "Введите ваше имя",
          minLength: 2
        },
        {
          question: "Введите ваш контактный номер",
          type: "phone",
          required: true
        },
        {
          question: "Как с вами связаться?",
          type: "radio",
          answers: ["Звонок", "WhatsApp", "Telegram"],
          required: true
        }
      ]
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
    validateField() {
      const question = this.questions[this.currentQuestion];
      const answer = this.selectedAnswers[this.currentQuestion];
      this.errors[this.currentQuestion] = '';

      console.log('Validating field:', {
        questionIndex: this.currentQuestion,
        questionType: question.type,
        answer: answer
      });

      if (question.required && !answer) {
        this.errors[this.currentQuestion] = 'Это поле обязательно для заполнения';
        return false;
      }

      if (question.type === 'text' && question.minLength && answer.length < question.minLength) {
        this.errors[this.currentQuestion] = `Минимальная длина ${question.minLength} символа`;
        return false;
      }

      if (question.type === 'checkbox' && question.minSelections) {
        if (!Array.isArray(answer)) {
          console.error('Checkbox answer is not an array:', answer);
          this.selectedAnswers[this.currentQuestion] = [];
          return false;
        }
        if (answer.length < question.minSelections) {
          this.errors[this.currentQuestion] = `Выберите минимум ${question.minSelections} вариант`;
          return false;
        }
      }

      if (question.type === 'phone' && answer) {
        const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        if (!phoneRegex.test(answer)) {
          this.errors[this.currentQuestion] = 'Введите корректный номер телефона';
          return false;
        }
      }

      if (question.type === 'date' && answer) {
        const selectedDate = new Date(answer);
        const today = new Date();
        if (selectedDate < today) {
          this.errors[this.currentQuestion] = 'Дата не может быть в прошлом';
          return false;
        }
      }

      return true;
    },
    scrollToCenter() {
      const element = document.querySelector('.question-card');
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    },
    validateAndNext() {
      if (this.validateField()) {
        this.nextQuestion();
      }
    },
    nextQuestion() {
      console.log('Moving to next question:', {
        current: this.currentQuestion,
        next: this.currentQuestion + 1,
        total: this.questions.length
      });

      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++;
        this.$nextTick(() => {
          this.focusInput();
          this.scrollToCenter();
        });
      }
      
    },
    previousQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
        this.$nextTick(() => {
          this.focusInput();
          this.scrollToCenter();
        });
      }
    },
    selectRadioAnswer(answer) {
      this.selectedAnswers[this.currentQuestion] = answer;
    },
    toggleCheckboxAnswer(answer) {
      console.log('Toggling checkbox:', {
        answer,
        currentAnswers: this.selectedAnswers[this.currentQuestion]
      });

      if (!Array.isArray(this.selectedAnswers[this.currentQuestion])) {
        this.selectedAnswers[this.currentQuestion] = [];
      }

      const answers = this.selectedAnswers[this.currentQuestion];
      const index = answers.indexOf(answer);
      
      if (index === -1) {
        answers.push(answer);
      } else {
        answers.splice(index, 1);
      }

      console.log('Updated answers:', this.selectedAnswers[this.currentQuestion]);
      this.validateField();
    },
    focusInput() {
      const currentInput = this.$refs[`${this.questions[this.currentQuestion].type}Input`];
      if (currentInput) {
        currentInput.focus();
      }
    },
    async submitForm() {
      if (!this.validateField()) return;

      this.isSubmitting = true;
      try {
        const formData = new FormData();
        Object.entries(this.selectedAnswers).forEach(([index, value]) => {
          const question = this.questions[index];
          formData.append(question.question, Array.isArray(value) ? value.join(', ') : value);
        });

        // const response = await axios.post('https://chezakod.ru/child/form.php', formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
        // });

        if (response.data.success) {
          this.currentQuestion++;
        } else {
          throw new Error(response.data.message || 'Ошибка при отправке формы');
        }
      } catch (error) {
        console.error('Ошибка при отправке данных:', error);
        alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
      } finally {
        this.isSubmitting = false;
      }
    }
  },
  created() {
    this.questions.forEach((q, index) => {
      if (q.type === 'checkbox') {
        this.selectedAnswers[index] = [];
      }
      this.errors[index] = '';
    });
  }
};
</script>

<style scoped>
.quiz-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.question-card {
  background: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.question-header {
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
  color: #333;
  margin: 0;
}

.question-counter {
  font-size: 14px;
  color: #666;
}

.progress-bar {
  height: 4px;
  background: #eee;
  border-radius: 2px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #CF1034;
  transition: width 0.3s ease;
}

h2 {
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
}

.answer-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.answer-list li {
  margin-bottom: 12px;
  padding: 15px;
  border: 2px solid #eee;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fff;
}

.answer-list li:hover {
  border-color: #CF1034;
  background: #fff5f6;
  transform: translateY(-2px);
}

.answer-list li.selected {
  border-color: #CF1034;
  background: #fff5f6;
  box-shadow: 0 2px 8px rgba(207, 16, 52, 0.1);
}

.answer-list li.error {
  border-color: #ff4444;
  background: #fff5f5;
}

.answer-list input[type="radio"],
.answer-list input[type="checkbox"] {
  display: none;
}

.answer-list label {
  display: block;
  cursor: pointer;
  font-size: 16px;
  color: #333;
}

.custom-checkbox {
  display: flex;
  align-items: center;
  gap: 15px;
  width: fit-content;
  padding: 5px;
  cursor: pointer;
}

.checkmark {
  display: none;
  min-width: 24px;
  width: 24px;
  height: 24px;
  border: 2px solid #ddd;
  border-radius: 6px;
  position: relative;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.custom-checkbox input:checked + .checkmark {
  background: #CF1034;
  border-color: #CF1034;
}

.custom-checkbox input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 16px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.text-input-wrapper,
.phone-input-wrapper,
.date-input-wrapper {
  position: relative;
  margin-bottom: 20px;
}

input[type="text"],
input[type="date"] {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
}

input[type="text"]:focus,
input[type="date"]:focus {
  border-color: #CF1034;
  outline: none;
  box-shadow: 0 0 0 3px rgba(207, 16, 52, 0.1);
}

input.error {
  border-color: #ff4444;
}

.error-message {
  color: #ff4444;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 15px;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.nav-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.prev-btn {
  background: #f5f5f5;
  color: #666;
}

.next-btn,
.submit-btn {
  background: #CF1034;
  color: white;
}

.nav-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.thank-you-card {
  text-align: center;
  padding: 40px;
}

.thank-you-icon {
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

.close-btn {
  margin-top: 20px;
  padding: 12px 30px;
  background: #CF1034;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 480px) {
  .quiz-container {
    padding: 15px;
  }

  .question-card {
    padding: 20px;
  }

  .question-title h1 {
    font-size: 20px;
  }

  .answer-list li {
    padding: 10px;
  }

  .nav-btn {
    padding: 10px 20px;
    font-size: 14px;
  }
}
</style>
