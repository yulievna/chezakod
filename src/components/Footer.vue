<template>
  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-content">
        <div class="footer-item">
          <span class="footer-label">Город:</span> Красноярск
        </div>
        <div class="footer-item">
          <span class="footer-label">Телефон: </span>
          <a href="tel:+79998887766">+7 (999) 888-77-66</a>
        </div>
        <div class="footer-item">
          <router-link to="/privacy-policy" class="footer-link">Пользовательское соглашение</router-link>
        </div>
      </div>
      <div class="footer-copyright">
        © {{ new Date().getFullYear() }} Все права защищены
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
.footer {
  background-color: #000;
  color: #fff;
  padding: 20px 0;
  text-align: center;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.footer-item {
  font-size: 16px;
}

.footer-label {
  font-weight: bold;
}

.footer-item a {
  color: #CF1034;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-item a:hover {
  color: #d41a40;
}

.footer-link {
  color: #CF1034;
  text-decoration: none;
}

.footer-link:hover {
  text-decoration: underline;
}

.footer-copyright {
  margin-top: 15px;
  font-size: 14px;
  opacity: 0.8;
}
</style>
