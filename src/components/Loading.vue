<template>
  <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="loading-icon" preserveAspectRatio="xMidYMid meet">
    <g id="white1" class="rotate-clockwise" fill="none" stroke-width="8">
      <path d="M 50 15 A 35 35 0 0 1 85 50" stroke-linecap="round"/>
    </g>
    <g id="white2" class="rotate-clockwise" fill="none" stroke-width="8">
      <path d="M 50 85 A 35 35 0 0 1 15 50" stroke-linecap="round"/>
    </g>
    <g id="red1" class="rotate-counterclockwise" fill="none" stroke-width="8">
      <path d="M 50 30 A 20 20 0 0 1 70 50" stroke-linecap="round"/>
    </g>
    <g id="red2" class="rotate-counterclockwise" fill="none" stroke-width="8">
      <path d="M 50 70 A 20 20 0 0 1 30 50" stroke-linecap="round"/>
    </g>
  </svg>
</template>
<script>
export default {
  name: 'Loading'
}
</script>

<style scoped>
.loading-icon {
  width: 100px;
  height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
}

.rotate-clockwise {
  transform-origin: 50px 50px;
  animation: rotate-clockwise 2s linear infinite;
  stroke: #000; /* Изменено с #fff на #000 (белый на черный) */
}

.rotate-counterclockwise {
  transform-origin: 50px 50px;
  animation: rotate-counterclockwise 2s linear infinite;
  stroke: #CF1034; /* Оставляем красный цвет */
}

@keyframes rotate-clockwise {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes rotate-counterclockwise {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
</style>