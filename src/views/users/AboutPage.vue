<template>
  <h1 >Про нас</h1>
  <div v-if="hasRole('ROLE_USER')" class="background">
    <n-card class="n-card" title="Наша клініка - це сучасний медичний заклад, де ми пропонуємо широкий спектр послуг з діагностики, лікування та профілактики різноманітних захворювань.">
      <template #cover>
        <img src="https://archixod.ru/sites/default/files/styles/1920x1080/public/resepshn_variant_no2_oblozhka_proekta.jpg?itok=wn1mIjjN">
      </template>

      <h3 class="background">
        У нашій команді працюють досвідчені лікарі та медичні фахівці, які використовують найсучасніші методи лікування та обладнання.
        Ми надаємо індивідуальний підхід до кожного пацієнта та забезпечуємо якісну та своєчасну допомогу, щоб кожен наш клієнт міг повністю покластися на нас у питаннях свого здоров'я.
        Наша мета - зробити все можливе, щоб наші пацієнти відчували себе комфортно та отримували найкращі результати лікування.

      <p class="background"> Знайти нас дуже легко!</p>
      <p class="background"> Київ, вул. Вацлава Гавела 9а
      📞 +38(077)-777-77-77</p></h3>

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