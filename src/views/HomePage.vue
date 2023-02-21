<template>

  <h1>WELCOME CLINIC_NAME</h1>
  <n-carousel draggable>
    <img class="carousel" :src="img1"/>
    <img class="carousel" :src="img2"/>
    <img class="carousel" :src="img3"/>

  </n-carousel>

</template>
<script>
import api from "@/interceptors/axios";
import {ref} from 'vue';

import img1 from '@/assets/1.jpg';
import img2 from '@/assets/2.jpg';
import img3 from '@/assets/3.jpg';

export default {
  mounted() {
    this.sendEmailReminder();
  },

  data() {
    return {
      img1: ref(img1),
      img2: ref(img2),
      img3: ref(img3),
    };
  },

  methods: {
    hasRole(role) {
      if (localStorage.getItem('role') === role) {
        return true;
      }
    },

    sendEmailReminder() {
      api.get('http://65.109.235.33:8085/api/v1/admin/sendEmailReminder', {})
          .catch((error) => console.error(error));
    },
  },
};
</script>
<style scoped>

.carousel {
  margin: 2rem auto;
  display: flex;
  justify-content: center;

  width: 100%;
  height: 60vh;
  object-fit: cover;
}

h1 {
  display: flex;
  justify-content: center;

  padding-top: 1px;
  padding-bottom: 1px;
  font-size: 50px;
  font-weight: 600;
}

</style>