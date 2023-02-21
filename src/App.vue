<template>
      <nav>
        <n-avatar
            :size="50"
            :src="img1"
        />
        <router-link v-if="hasRole('ROLE_USER')" to="/" exact>Головна</router-link>
        <router-link v-if="hasRole('ROLE_USER')" to="/myAppointment" exact>Записи</router-link>
        <router-link v-if="hasRole('ROLE_USER')" to="/choseDoctor">Лікарі</router-link>
        <router-link v-if="hasRole('ROLE_USER')" to="/about">Про нас</router-link>
        <router-link v-if="hasRole('ROLE_USER')" to="/profile">Мій профіль</router-link>
        <router-link v-if="hasRole('ROLE_ADMIN')" to="/profile">Профілі</router-link>
        <router-link v-if="hasRole('ROLE_ADMIN')" to="/usersMenu">Користувачі</router-link>
        <router-link v-if="hasRole('ROLE_ADMIN')" to="/doctorsMenu">Лікарі</router-link>
        <router-link v-if="hasRole('ROLE_ADMIN')" to="/admin">Адміністратори</router-link>
        <router-link v-if="hideContent" to="/login" class="login">Вхід</router-link>
        <router-link v-if="hasRole('ROLE_DOCTOR')" to="/appointments" exact>Appointments</router-link>
        <router-link v-if="hasRole('ROLE_ADMIN')||hasRole('ROLE_USER')||hasRole('ROLE_DOCTOR')" to="/login" @click="logOut" class="logout">Вихід</router-link>
      </nav>
      <router-view></router-view>
      <FooterPage/>
</template>
<script>

// import axios from "axios";

// import HeaderPage from "@/views/HeaderPage";
import FooterPage from "@/views/FooterPage";
// import {darkTheme} from 'naive-ui';
import img1 from '@/assets/logo1.jpg';
import {ref} from "vue";
export default {

  mounted() {
    this.checkRole()
    window.addEventListener('scroll', () => {
      document.body.style.cssText = `--scrollTop:${scrollY}px`
    })

  },
  name: 'App',
  components: {
    // HeaderPage,
    FooterPage,
  },


  data() {

    return {
      img1: ref(img1),
      hideContent: false,
      // darkTheme,
      // img: "https://ibb.co/MgPZrwX",
      // themeOverrides: {
      //   common: {
      //     pressedColor: "rgba(234,2,2,0.82)",
      //     primaryColor: 'rgb(230,238,253)',
      //     placeholderColor: "rgb(5,5,5)",
      //     textColorBase: "#fff",
      //     textColor1: "rgb(250,0,0)",
      //     inputColor: "rgb(230,238,253)",
      //     clearColorPressed: "rgb(250,0,0)",
      //   },
      //   Button: {
      //     textColor: '#e6eefd'
      //   },
      //   Select: {
      //     peers: {
      //       InternalSelection: {
      //         textColor: 'rgb(43,43,44)'
      //       }
      //     }
      //   }
      //
      // }
    }
  },
  methods: {
    checkRole() {
      if (localStorage.getItem('role') == null) {
        this.hideContent = true;
      }
      if (localStorage.getItem('role') != null) {
        this.hideContent = false;
      }
    },
    logOut() {
      localStorage.removeItem('username')
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      window.location.href = 'http://localhost:8080/login';
    },



    hasRole(role) {
      if (localStorage.getItem('role') === role) {
        return true;
      }
    },

  }
}

</script>

<style>
/*.n-data-table .n-data-table-th {*/
/*background-color: #49b0f0;*/
/*}*/


/** {*/
/*  margin: 0;*/
/*  padding: 0;*/
/*  box-sizing: border-box;*/
/*}*/

/*h1 {*/
/*  color: #8ea58d;*/
/*  text-shadow: 0 0 15px #9d822b;*/
/*  align-content: center;*/
/*  text-align: center;*/
/*}*/

/*:root {*/
/*  --index: calc(1vw + 1vh);*/
/*  --text: rgb(241, 241, 241);*/
/*  --transition: transform .75s cubic-bezier(.075, .5, 0, 1);*/
/*}*/

nav {
  margin: 27px auto 0;

  position: relative;
  width: 890px;
  height: 100px;
  /*background-color: rgb(64, 64, 70);*/
  border-radius: 8px;
  font-size: 0;
  align-content: center;
}
h1{
  display: flex;
  justify-content: center;
}

nav a {
  line-height: 50px;
  height: 100%;
  font-size: 25px;
  display: inline-block;
  position: relative;
  z-index: 10;
  text-decoration: none;
  /*text-transform: uppercase;*/
  text-align: center;
  color: #605f5f;
  text-shadow: 0 0 15px #888888;
  cursor: pointer;
  font-weight: 600;


}

a:nth-child(1) {
  width: 100px;

}

a:nth-child(2) {
  width: 150px;

}

a:nth-child(3) {
  width: 100px;

}

a:nth-child(4) {
  width: 144px;

}

a:nth-child(5) {
  width: 140px;

}

a:nth-child(6) {
  width: 200px;

}

a:nth-child(7) {
  width: 100px;

}

a:nth-child(8) {
  width: 100px;
}

a:nth-child(9) {
  width: 100px;
}

a:nth-child(10) {
  width: 100px;
}

/*.logout {*/
/*  color: red;*/
/*  font-style: oblique;*/
/*}*/

/*.login {*/
/*  color: #03f503;*/
/*  font-style: oblique;*/
/*}*/

/*ul {*/
/*  display: flex;*/
/*  justify-content: center;*/
/*  background: #050577 url('https://i.ibb.co/PZB0b1X/223223.png');*/
/*  background-repeat: no-repeat;*/
/*  background-size: cover;*/
/*}*/

/*body {*/
/*  background: #050577 url('https://i.ibb.co/PZB0b1X/223223.png');*/
/*  background-repeat: no-repeat;*/
/*  background-size: cover;*/
/*  font-family: raleway_f, sans-serif;*/
/*  line-height: 1.55;*/
/*}*/

/*.main-header {*/

/*  position: relative;*/

/*}*/

/*.main-header::after {*/
/*  content: '';*/
/*  position: absolute;*/
/*  z-index: 9;*/
/*  width: 100%;*/
/*  height: calc(var(--index) * 10);*/
/*  !*background-image: url('~@/assets/ground.png');*!*/
/*  background-size: cover;*/
/*  background-repeat: no-repeat;*/
/*  background-position: center;*/
/*  bottom: calc(var(--index) * -39);*/

/*}*/

/*.layers {*/
/*  height: 100vh;*/
/*  display: flex;*/
/*  align-items: center;*/
/*  justify-content: center;*/
/*  text-align: center;*/
/*  overflow: hidden;*/
/*  position: relative;*/
/*}*/




/*.n-data-table .n-data-table-td {*/
/*  color: #f7f7fa;*/
/*}*/
/*.n-data-table .n-data-table-td:hover {*/
/*  color: #2b2b2c;*/

/*}*/


/*.layers__title {*/
/*  font-size: calc(var(--index) * 2.65);*/
/*  letter-spacing: calc(var(--index) / 2.25);*/
/*  margin-top: calc(var(--index) * -.75);*/
/*  z-index: 6;*/
/*}*/

/*.layers__caption {*/
/*  font-size: calc(var(--index) / 1.175);*/
/*  letter-spacing: calc(var(--index) / 19.5);*/
/*  margin-top: calc(var(--index) * -.75);*/
/*  z-index: 5;*/
/*}*/



/*.main-article__header {*/
/*  !*text-transform: uppercase;*!*/
/*  font-size: calc(var(--index) * 1.8);*/
/*  letter-spacing: calc(var(--index) / 7.5);*/
/*  transform: var(--main-article-transform);*/
/*  transition: var(--transition);*/
/*  will-change: transform;*/
/*  font-size: calc(var(--index) / 1.175);*/
/*  letter-spacing: calc(var(--index) / 19.5);*/
/*  margin-top: calc(var(--index) * -.75);*/
/*  transition: var(--transition);*/
/*  will-change: transform;*/
/*  text-transform: uppercase;*/
/*  font-weight: 900;*/
/*  justify-content: center;*/
/*  align-items: center;*/
/*  position: relative;*/
/*  text-align: center;*/
/*  color: var(--text);*/
/*  text-shadow: 0 0 15px #23f802;*/
/*}*/


/*.content {*/
/*  will-change: transform;*/
/*}*/

</style>
