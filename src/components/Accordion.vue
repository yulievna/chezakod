<script setup>
import {onMounted, onServerPrefetch, ref} from 'vue'
import {Collapse} from 'vue-collapsed'
import axios, {HttpStatusCode} from "axios";

const questions = ref([]);

const loadFAQ = async () => {
  try {
    const resp = await axios.get(import.meta.env.VITE_API_URL + "/faq/");
    if (resp.status === HttpStatusCode.Ok && resp.data.status) {
      questions.value = resp.data.result.map((i) => ({
        title: i.question,
        answer: i.answer,
        isExpanded: false
      }));
    } else {
      throw new Error("Сервер вернул ошибку");
    }
  } catch (error) { console.error(`Ошибка во время получения часто задаваемых вопросов: ${error}`) }
}

onServerPrefetch(loadFAQ);
onMounted(loadFAQ);

function handleAccordion(selectedIndex) {
  questions.value.forEach((_, index) => {
    questions.value[index].isExpanded = index === selectedIndex ? !questions.value[index].isExpanded : false
  })
}

/**
 * For individual control you might use:
 *
 * function handleMultiple(index) {
 *   questions[index].isExpanded = !questions[index].isExpanded
 * }
 */
</script>

<template>
  <div class="accordion-container">
    <div class="accordion-column">
      <div class="accordion" v-for="(question, index) in questions.slice(0, Math.ceil(questions.length / 2))"
           :key="index">
        <button @click="handleAccordion(index)">
          {{ question.title }}
          <span class="arrow" :class="{ 'arrow-down': question.isExpanded }"></span>
        </button>
        <Collapse :when="question.isExpanded">
          <p v-html="question.answer"></p>
        </Collapse>
      </div>
    </div>
    <div class="accordion-column">
      <div class="accordion" v-for="(question, index) in questions.slice(Math.ceil(questions.length / 2))"
           :key="index + Math.ceil(questions.length / 2)">
        <button @click="handleAccordion(index + Math.ceil(questions.length / 2))">
          {{ question.title }}
          <span class="arrow" :class="{ 'arrow-down': question.isExpanded }"></span>
        </button>
        <Collapse :when="question.isExpanded">
          <p v-html="question.answer"></p>
        </Collapse>
      </div>
    </div>
  </div>
</template>

<style scoped>

*, *:after, *:before {
  box-sizing: border-box;
}

.accordion-container {
  margin-top: 30px;
  display: flex;
  gap: 20px;
}

.accordion-column {
  flex: 1;
}

button {
  width: 100%;
  height: 60px;
  border: none;
  background-color: #CF1034;
  margin-bottom: 10px;
  font-size: 20px;
  text-align: justify;
  word-break: break-word;
  word-wrap: break-word;
  overflow-wrap: break-word;
  border-radius: 5px;
  padding: 20px 25px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  line-height: 18px;
}

p {
  color: #000;
  padding: 25px;
  border-radius: 5px;
  margin-top: -10px;
  text-align: justify;

}

.arrow {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-right: 3px solid #fff;
  border-bottom: 3px solid #fff;
  transform: rotate(-45deg);
  transition: transform 0.3s ease;
}

.arrow-down {
  transform: rotate(45deg);
}
@media (max-width: 992px) {
  button {
    padding: 10px 18px;
    line-height: 1.2;
    font-size: 16px;

  }

}

@media (max-width: 768px) {
  .accordion-container {
    gap: 10px;
  }

  button {
    padding: 7px 18px;
    font-size: 14px;
    line-height: 1;

  }

  p {
    padding: 12px 20px;
  }
}

/* Мобильные устройства */
@media (max-width: 600px) {
  .accordion-container {
    flex-direction: column;
    gap: 0;
    margin-top: 20px;
  }

  button {
    height: 50px;
    padding: 12px 15px;
    margin-bottom: 5px;
  }

  p {
    padding: 12px 15px;
    margin: -5px 0 10px 0;
  }

  .arrow {
    width: 10px;
    height: 10px;
  }
}

/* Очень маленькие экраны */
@media (max-width: 400px) {
  button {
    padding: 5px 12px;
  }
}
</style>