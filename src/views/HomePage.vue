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
      api.get('http://localhost:8085/api/v1/admin/sendEmailReminder', {})
          .catch((error) => console.error(error));
    },
  },
};
</script>
<style scoped>
.carousel-item {
  background-size: cover;
  height: 80vh;
}

.carousel {
  margin: 2rem auto;
  display: flex;
  justify-content: center;

  width: 100%;
  height: 60vh;
  object-fit: cover;
}

@media only screen and (max-width: 2000px) {
  .carousel {
    margin: 1rem auto;
    height: 40vh;
  }
}

@media only screen and (max-width: 2000px) {
  .carousel {
    margin: 0.5rem auto;
    height: 20vh;
  }
}

h1 {
  display: flex;
  justify-content: center;

  padding-top: 1px;
  padding-bottom: 1px;
  font-size: 50px;
  font-weight: 600;
}

/*carousel-img {*/
/*  width: 100%;*/
/*  height: 240px;*/
/*  object-fit: cover;*/
/*}*/
</style>