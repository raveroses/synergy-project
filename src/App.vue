<template>
  <div class="flex relative">
    <Sidebar />
    <!-- <router-view></router-view> -->

    <div>
      <Header />
      <FirstSection />
    </div>
  </div>
</template>

<script setup>
import Sidebar from "./components/sidebar/Sidebar.vue";
import Header from "./components/header/Header.vue";
import FirstSection from "./components/firstSection/firstSection.vue";
</script>
