<template>
  <div class="certificate-form" v-if="isOpen">
    <div class="certificate-form__overlay" @click="closeForm"></div>
    <div class="certificate-form__content">
      <button class="certificate-form__close" @click="closeForm">×</button>
      
      <h2 class="certificate-form__title">Заявка на сертификат</h2>
      
      <form @submit.prevent="submitForm" class="certificate-form__form">
        <div class="form-group">
          <label for="name">Ваше имя</label>
          <input 
            type="text" 
            id="name" 
            v-model="formData.name" 
            required
            placeholder="Введите ваше имя"
          >
        </div>

        <div class="form-group">
          <label for="phone">Телефон</label>
          <input 
            type="tel" 
            id="phone" 
            v-model="formData.phone" 
            required
            placeholder="+7 (___) ___-__-__"
          >
        </div>

        <div class="form-group">
          <label for="nominal">Номинал сертификата</label>
          <select 
            id="nominal" 
            v-model="formData.nominal" 
            required
          >
            <option value="">Выберите номинал</option>
            <option value="1000">1 000 ₽</option>
            <option value="2000">2 000 ₽</option>
            <option value="3000">3 000 ₽</option>
            <option value="5000">5 000 ₽</option>
            <option value="10000">10 000 ₽</option>
          </select>
        </div>

        <div class="form-group">
          <label for="comment">Комментарий</label>
          <textarea 
            id="comment" 
            v-model="formData.comment"
            placeholder="Дополнительная информация"
            rows="4"
          ></textarea>
        </div>

        <button type="submit" class="certificate-form__submit">
          Отправить заявку
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  selectedCertificate: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close', 'submit'])

const formData = ref({
  name: '',
  phone: '',
  nominal: '',
  comment: ''
})

const closeForm = () => {
  emit('close')
}

const submitForm = () => {
  emit('submit', formData.value)
  formData.value = {
    name: '',
    phone: '',
    nominal: '',
    comment: ''
  }
}
</script>

<style scoped>
.certificate-form {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.certificate-form__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.certificate-form__content {
  position: relative;
  background: white;
  padding: 40px;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  margin: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.certificate-form__close {
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

.certificate-form__close:hover {
  color: #CF1034;
}

.certificate-form__title {
  font-size: 24px;
  color: #CF1034;
  margin-bottom: 30px;
  text-align: center;
}

.certificate-form__form {
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

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #CF1034;
  outline: none;
}

.certificate-form__submit {
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

.certificate-form__submit:hover {
  background: #a00d29;
}

@media (max-width: 768px) {
  .certificate-form__content {
    padding: 30px 20px;
    margin: 15px;
  }

  .certificate-form__title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 10px;
    font-size: 14px;
  }

  .certificate-form__submit {
    padding: 12px;
    font-size: 16px;
  }
}
</style> 