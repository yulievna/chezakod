<template>
  <div class="timetable">
    <div class="container">
      <div v-for="questId in questIds" :key="questId" class="quest-schedule">
        <iframe
            :src="`${import.meta.env.VITE_HOST}/quest/${questId}/timetable/`"
            :style="{ height: '1820px' }"
            style="width: 100%; border: none;"
            @load="onIframeLoad"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  questIds: {
    type: Array,
    required: true
  }
});

const onIframeLoad = (event) => {
  // Adjust iframe height based on content
  const iframe = event.target;
  iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
};
</script>

<style scoped>
.timetable {
  padding: 40px 0;
  background: #1a1a1a;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.quest-schedule {
  margin-bottom: 40px;
}

.quest-schedule:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
}
</style> 