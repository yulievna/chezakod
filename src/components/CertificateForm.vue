<template> <!-- TODO: пофиксить форму сертификатов -->
  <div class="certificate-form" v-if="isOpen">
    <div class="certificate-form__overlay" @click="closeForm"></div>
    <div class="certificate-form__content">
      <button class="certificate-form__close" @click="closeForm">×</button>

      <h2 class="certificate-form__title">Заявка на сертификат</h2>

      <div v-if="!isSubmitted" class="certificate-form__form">
        <div class="form-group">
          <label for="name">Ваше имя</label>
          <div class="input-wrapper">
            <input
                type="text"
                id="name"
                v-model="formData.name"
                required
                placeholder="Введите ваше имя"
                @input="validateField('name')"
                @blur="validateField('name')"
                :class="{ 'error': errors.name }"
            >
            <div class="input-focus-effect"></div>
          </div>
          <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
        </div>
        <div class="form-group">
          <label for="phone">Телефон</label>
          <div class="input-wrapper">
            <input
                type="tel"
                id="phone"
                v-model="formData.phone"
                v-mask="'+7 (###) ###-##-##'"
                required
                placeholder="+7 (___) ___-__-__"
                @input="handlePhoneInput"
                @blur="validateField('phone')"
                @keyup.enter="submitForm"
                :class="{ 'error': errors.phone }"
                ref="phoneInput"
            >
            <div class="input-focus-effect"></div>
          </div>
          <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
        </div>
        <div class="form-group">
          <label>Номинал сертификата</label>
          <div class="nominal-selector">
            <div class="nominal-options">
              <button
                  v-for="nominal in availableNominals"
                  :key="nominal"
                  @click="formData.nominal = nominal"
                  :class="{
                  'selected': formData.nominal === nominal,
                  'error': errors.nominal
                }"
                  class="nominal-option"
              >
                {{ nominal }} ₽
              </button>
            </div>
          </div>
          <span v-if="errors.nominal" class="error-message">{{ errors.nominal }}</span>
        </div>

        <button
            type="submit"
            class="certificate-form__submit"
            @click="submitForm"
            :disabled="isSubmitting || !isFormValid"
        >
          {{ isSubmitting ? 'Отправка...' : 'Заказать сертификат' }}
        </button>
      </div>
      <div v-else class="success-message">
        <div class="success-icon">✓</div>
        <h3>Заявка отправлена!</h3>
        <p>Мы свяжемся с вами в ближайшее время.</p>
        <button class="close-btn" @click="closeForm">Закрыть</button>
      </div>
      <span v-if="errors.submit" class="error-message">{{ errors.submit }}</span>
    </div>
  </div>
</template>

<script setup>
import {computed, ref, watch} from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  selectedCertificate: {
    type: Number
  }
})

const emit = defineEmits(['close', 'submit'])

const formData = ref({
  name: '',
  phone: '',
  nominal: props.selectedCertificate
})

const errors = ref({
  name: '',
  phone: '',
  nominal: '',
  submit: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const phoneInput = ref(null)

const availableNominals = [2500, 3000, 3500]

const isFormValid = computed(() => {
  return formData.value.name.trim() &&
      isValidPhone(formData.value.phone) &&
      formData.value.nominal
})

const handlePhoneInput = () => {
  let digits = formData.value.phone.replace(/\D/g, '');

  if (digits.startsWith('8') && digits.length > 0) {
    digits = '7' + digits.slice(1);
  }
  else if (!digits.startsWith('7') && digits.length > 0) {
    digits = '7' + digits;
  }

  digits = digits.slice(0, 11);

  let formatted = '+7';
  if (digits.length > 1) {
    formatted += ` (${digits.slice(1, 4)}`;
  }
  if (digits.length > 4) {
    formatted += `) ${digits.slice(4, 7)}`;
  }
  if (digits.length > 7) {
    formatted += `-${digits.slice(7, 9)}`;
  }
  if (digits.length > 9) {
    formatted += `-${digits.slice(9, 11)}`;
  }

  formData.value.phone = formatted;
  validateField('phone');
}
const isValidPhone = (phone) => {
  const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
  return phoneRegex.test(phone)
}

const validateField = (field) => {
  errors.value[field] = ''

  if (field === 'name') {
    if (!formData.value.name.trim()) {
      errors.value.name = 'Введите ваше имя'
    } else if (formData.value.name.trim().length < 2) {
      errors.value.name = 'Имя слишком короткое'
    }
  }

  if (field === 'phone') {
    if (!formData.value.phone) {
      errors.value.phone = 'Введите номер телефона'
    } else if (!isValidPhone(formData.value.phone)) {
      errors.value.phone = 'Введите корректный номер'
    }
  }

  if (field === 'nominal') {
    if (!formData.value.nominal) {
      errors.value.nominal = 'Выберите номинал'
    }
  }
}
watch(() => props.selectedCertificate, (newValue) => {
  formData.value.nominal = newValue
})

const closeForm = () => {
  emit('close')
  resetForm()
}

const resetForm = () => {
  formData.value = {
    name: '',
    phone: '',
    nominal: props.selectedCertificate
  }
  errors.value = {
    name: '',
    phone: '',
    nominal: '',
    submit: ''
  }
  isSubmitted.value = false
}

const submitForm = async () => {
  validateField('name')
  validateField('phone')
  validateField('nominal')

  if (Object.values(errors.value).some(error => error)) return

  isSubmitting.value = true

  try {
    const submitData = {
      ...formData.value,
      phone: formData.value.phone.replace(/\D/g, '')
    }

    const formDataToSend = new FormData()
    formDataToSend.append('name', submitData.name)
    formDataToSend.append('phone', submitData.phone)
    formDataToSend.append('nominal', submitData.nominal)

    const response = await fetch(import.meta.env.VITE_HOST + '/api/v1/sert', {
      method: 'POST',
      body: formDataToSend
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Ошибка при отправке формы')
    }

    const result = await response.json()
    emit('submit', result)
    isSubmitted.value = true
  } catch (error) {
    console.error('Ошибка при отправке:', error)
    errors.value.submit = error.message || 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.'
  } finally {
    isSubmitting.value = false
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
.form-group select {
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  width: 100%;
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

.nominal-selector {
  margin-top: 8px;
}

.nominal-options {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.nominal-option {
  padding: 12px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nominal-option:hover {
  border-color: #CF1034;
  background: #fff5f6;
  transform: translateY(-2px);
}

.nominal-option.selected {
  border-color: #CF1034;
  background: #CF1034;
  color: white;
}

.error-message {
  color: #ff4444;
  font-size: 14px;
  margin-top: 4px;
}

input.error {
  border-color: #ff4444;
}

.success-message {
  text-align: center;
  padding: 20px 0;
}

.success-icon {
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

.success-message h3 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

.success-message p {
  color: #666;
  margin-bottom: 20px;
}

.close-btn {
  background: #CF1034;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

@media (max-width: 480px) {
  .certificate-form__content {
    padding: 20px;
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

  .nominal-options {
    gap: 8px;
  }

  .nominal-option {
    padding: 10px 15px;
    font-size: 14px;
  }
}
</style>