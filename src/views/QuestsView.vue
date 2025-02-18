<template>
    <Header></Header>
    <section class="quests">
      <div class="container">
        <h1 class="title">Квесты</h1>
        <ul class="quests__list">
          <li class="quests__el" style="background-image: url('src/assets/quest__1.jpg');"></li>
          <li class="quests__el" style="background-image: url('src/assets/quest__2.jpg');"></li>
          <li class="quests__el" style="background-image: url('src/assets/quest__3.jpg');"></li>
          <li class="quests__el" style="background-image: url('src/assets/quest__4.gif');"></li>
          <li class="quests__el" style="background-image: url('src/assets/quest__5.jpg');"></li>
          <li class="quests__el" style="background-image: url('src/assets/quest__6.jpg');"></li>
          <li class="quests__el" style="background-image: url('src/assets/quest__7.jpg');"></li>
          <li class="quests__el" style="background-image: url('src/assets/quest__8.jpg');"></li>
          <li class="quests__el" style="background-image: url('src/assets/quest__9.jpg');"></li>
        </ul>
      </div>
    </section>

    <section class="schedule">
      <div class="container">
        <h1 class="title">Расписание</h1>
        <iframe src="https://chezakod.ru/quest/11519850/timetable/" width="100%" height="1820" style="border: none;" ref="iframeRef" scrolling="no" @load="onIframeLoad" ></iframe>
      </div>
    </section>

    <section class="lounge">
      <div class="container">
        <h1 class="title">Лаундж зоны</h1>
        <ul class="lounge__list">
          <li class="lounge__el" style="background-image: url('src/assets/lounge__1.jpg');"></li>
          <li class="lounge__el" style="background-image: url('src/assets/lounge__2.jpg');"></li>
          <li class="lounge__el" style="background-image: url('src/assets/lounge__3.jpg');"></li>
          <li class="lounge__el" style="background-image: url('src/assets/lounge__4.jpg');"></li>
          <li class="lounge__el" style="background-image: url('src/assets/lounge__5.jpg');"></li>
          <li class="lounge__el" style="background-image: url('src/assets/lounge__6.jpg');"></li>
        </ul>
      </div>
    </section>

        <!-- MAP SECTION -->
    <section class="map">
      <Map></Map>
    </section>

    <!-- FOOTER SECTION -->
    <Footer></Footer>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Map from '@/components/Map.vue';
// import { ref } from 'vue';

// const iframeRef = ref(null);

// const onIframeLoad = () => {
//   const iframe = iframeRef.value;
//   const iframeWindow = iframe.contentWindow;
//   contentWindow.scrollTo(50, 1000);
// };
</script>

<style scoped>
.title{
    margin: 60px auto;
    width: fit-content;
    font-size: 32px;
    color: #fff;
}
.quests__list{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  /* margin: 60px auto; */
}
.quests__el{
  background-color: #CF1034;
  color: #000;
  min-height: 500px;
  font-size: 36px;
  border-radius: 40px;
  transition: 0.5s ease;
  /* background-image: url('../assets/lounge__1.jpg'); */
  background-size: cover;
  background-position: center;
}
.quests__el:hover{
  /* transform: scale(1.15); */
  opacity: 0.4;
}
.lounge__list{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.lounge__el{
  background-color: #CF1034;
  color: #000;
  min-height: 300px;
  font-size: 36px;
  border-radius: 40px;
  /* transition: transform 0.5s ease; */
  transition: 0.5s ease; 
  background-size: cover;
  background-position: center;
}
.lounge__el:hover{
  opacity: 0.4;
}
</style>