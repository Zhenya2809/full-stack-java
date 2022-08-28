<template>
  <h1 >About Page</h1>
  <div v-if="hasRole('ROLE_USER')" class="background">
    <n-card class="n-card" title="CLINIC_NAME — это частная клиника в Киеве для всей семьи.">
      <template #cover>
        <img src="https://archixod.ru/sites/default/files/styles/1920x1080/public/resepshn_variant_no2_oblozhka_proekta.jpg?itok=wn1mIjjN">
      </template>

      <h3 class="background">Мы позаботимся как о новорожденном ребенке, так и о людях почтенного возраста.
      Мы предоставляем медицинские услуги с выездом на дом, в клинике и онлайн,
      чтобы всегда держать под контролем ваше хорошее самочувствие.

      <p class="background"> Найти нас очень просто!</p>
      <p class="background"> Киев, ул. Вацлава Гавела 9а
      или позвонить нам 📞 +38(077)-777-77-77</p></h3>

    </n-card>
    <iframe class="map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5081.480686027478!2d30.425587000000004!3d50.445937!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb340c7a660b369ad!2zNTDCsDI2JzQ1LjQiTiAzMMKwMjUnMzIuMSJF!5e0!3m2!1sru!2sua!4v1659601629725!5m2!1sru!2sua" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
</template>

<script>


import {NCard} from 'naive-ui'

export default {
  mounted() {
    this.checkAuthorization()
  },
  components: {
  NCard
  },

  name: "AboutPages",

  data() {
    return {
      token: null,
      hideContent: true,
      id: '',
      username: '',
      firstName: '',
      lastName: '',
      email: '',

    };
  },

  methods: {
    hasRole(role){
      if(localStorage.getItem('role')===role){
        return true;
      }
    },


    checkAuthorization() {
      if (localStorage.getItem('token') == null&& localStorage.getItem('role')==="admin") {
        this.hideContent = false
      }
    } 
  },
}
</script>

<style scoped>

.background{

  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
}
/*.card {*/
/*  display: block;*/
/*  margin-left: auto;*/
/*  margin-right: auto;*/
/*  width: 60%;*/
/*}*/
.map{
  width: 100%;
  height: 700px ;
}

</style>