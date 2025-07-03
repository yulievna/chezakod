<template>
  <div class="timetable-embed">
    <div id="timetable" :data-quests="questIds.join(';')"></div>
  </div>
</template>

<script setup>
import {onMounted, watch} from 'vue';

const props = defineProps({
  questIds: {
    type: Array,
    required: true
  }
});

const loadTimetableScript = () => {
  // Remove existing script if any
  const existingScript = document.querySelector(`script[src="${import.meta.env.VITE_HOST}/f/build/embed.js"]`);
  if (existingScript) {
    existingScript.remove();
  }

  // Create and append new script
  const script = document.createElement('script');
  script.src = `${import.meta.env.VITE_HOST}/f/build/embed.js`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
};

onMounted(() => {
  // console.log("component mount");
  // loadTimetableScript();
});

// Reload script when questIds change
watch(() => props.questIds, () => {
  console.log("quest ids");
  loadTimetableScript();
});
</script>

<style scoped>
.timetable-embed {
  width: 100%;
  min-height: 100px;

}

.timetable {
  border-radius: 10px;
}
</style> 