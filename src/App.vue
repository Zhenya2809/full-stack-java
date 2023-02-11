<template>
  <!--  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">-->
  <!--  <HeaderPage/>-->
  <div id="app" class="main-container">
    <div class="wrapper">
      <nav style="background-image: url(images/downFone.png);">
        <router-link v-if="hasRole('ROLE_USER')" to="/" exact>ГОЛОВНА</router-link>
        <router-link v-if="hasRole('ROLE_USER')" to="/myAppointment" exact>ЗАПИСИ</router-link>
        <router-link v-if="hasRole('ROLE_USER')" to="/choseDoctor">ЛІКАРІ</router-link>
        <router-link v-if="hasRole('ROLE_USER')" to="/about">ПРО НАС</router-link>
        <router-link v-if="hasRole('ROLE_USER')" to="/profile">МІЙ ПРОФІЛЬ</router-link>
        <router-link v-if="hasRole('ROLE_ADMIN')" to="/profile">ПРОФІЛІ</router-link>
        <router-link v-if="hasRole('ROLE_ADMIN')" to="/usersMenu">КОРИСТУВАЧІ</router-link>
        <router-link v-if="hasRole('ROLE_ADMIN')" to="/doctorsMenu">ЛІКАРІ</router-link>
        <router-link v-if="hasRole('ROLE_ADMIN')" to="/admin">АДМІНІСТРАТОРИ</router-link>
        <router-link v-if="hideContent" to="/login" class="login">Вхід</router-link>
        <router-link v-if="hasRole('ROLE_DOCTOR')" to="/appointments" exact>Appointments</router-link>
        <router-link to="/login" @click="logOut" class="logout">Вихід</router-link>
      </nav>
      <router-view></router-view>
    </div>
    <div class="content">

      <div class="main-header">

      </div>

      <div class="layers">
        <div class="layers__header">
          <div class="layers__caption">

          </div>
          <div class="layers__title"></div>
        </div>

        <div class="layer layers__base" style="background-image:url(images/middle.png);"></div>
        <div class="layer layers__middle" style="background-image:url(images/middle.png);"></div>
        <div class="layer layers__front" style="background-image:url(images/bottom.png);"></div>

      </div>


      <article class="main-article" style="background-image: url(images/downFone.png);">
        <div class="main-article__content">

          <h2 class="main-article__header"> TO BE CONTINUED</h2>
          <!--          <p>text text text text text text text text text text text text text text text text-->
          <!--            text text text text text text text text </p>-->
        </div>
        <!--        <div class="copy">низ первой страницы</div>-->
      </article>
      <FooterPage/>
    </div>
  </div>


  <!--  </n-config-provider>-->
</template>
<script>

// import axios from "axios";

// import HeaderPage from "@/views/HeaderPage";
import FooterPage from "@/views/FooterPage";
import {darkTheme} from 'naive-ui';

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
      hideContent: false,
      darkTheme,
      img: "https://ibb.co/MgPZrwX",
      themeOverrides: {
        common: {
          pressedColor: "rgba(234,2,2,0.82)",
          primaryColor: 'rgb(230,238,253)',
          placeholderColor: "rgb(5,5,5)",
          textColorBase: "#fff",
          textColor1: "rgb(250,0,0)",
          inputColor: "rgb(230,238,253)",
          clearColorPressed: "rgb(250,0,0)",
        },
        Button: {
          textColor: '#e6eefd'
        },
        Select: {
          peers: {
            InternalSelection: {
              textColor: 'rgb(43,43,44)'
            }
          }
        }

      }
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
      window.location.href = 'http://localhost:3000/login';
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
.n-data-table .n-data-table-th {
background-color: #49b0f0;
}

.table {

  padding: .25rem .5rem;
  font-size: .875rem;
  border-radius: .2rem;
  box-sizing: border-box;
  width: 90%;

  margin: 0 auto;
  border: 0px solid black;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1 {
  color: #8ea58d;
  text-shadow: 0 0 15px #9d822b;
  align-content: center;
  text-align: center;
}

:root {
  --index: calc(1vw + 1vh);
  --text: rgb(241, 241, 241);
  --transition: transform .75s cubic-bezier(.075, .5, 0, 1);
}

nav {
  margin: 27px auto 0;

  position: relative;
  width: 890px;
  height: 50px;
  background-color: rgb(64, 64, 70);
  border-radius: 8px;
  font-size: 0;
  align-content: center;
}


nav a {
  line-height: 50px;
  height: 100%;
  font-size: 15px;
  display: inline-block;
  position: relative;
  z-index: 10;
  text-decoration: none;
  /*text-transform: uppercase;*/
  text-align: center;
  color: #b3c598;
  text-shadow: 0 0 15px #9d822b;
  cursor: pointer;


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

.logout {
  color: red;
  font-style: oblique;
}

.login {
  color: #03f503;
  font-style: oblique;
}

ul {
  display: flex;
  justify-content: center;
  background: #050577 url('https://i.ibb.co/PZB0b1X/223223.png');
  background-repeat: no-repeat;
  background-size: cover;
}

@font-face {
  font-family: raleway_f ;
  src: url('~@/assets/fonts/raleway-black.woff2');
}

@font-face {
  font-family: raleway_f ;

  src: url('~@/assets/fonts/raleway-regular.woff2');
  font-weight: 900;
}

body {
  background: #050577 url('https://i.ibb.co/PZB0b1X/223223.png');
  background-repeat: no-repeat;
  background-size: cover;
  font-family: raleway_f, sans-serif;
  line-height: 1.55;
}

.main-header {

  position: relative;

}

.main-header::after {
  content: '';
  position: absolute;
  z-index: 9;
  width: 100%;
  height: calc(var(--index) * 10);
  /*background-image: url('~@/assets/ground.png');*/
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  bottom: calc(var(--index) * -39);

}

.layers {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  position: relative;
}

.layer {
  height: 100%;
  width: 100%;
  position: absolute;
  background-size: cover;
  background-position: center;
  will-change: transform;
  z-index: 2;
  transition: var(--transition);
}


.n-data-table .n-data-table-td {
  color: #f7f7fa;
}
.n-data-table .n-data-table-td:hover {
  color: #2b2b2c;

}

.n-data-table-td {
  flex-direction: column;
  position: relative;
  --n-merged-th-color: red;
  --n-merged-td-color: #001224;
  --n-merged-border-color: #b2d171;
  --n-merged-th-color-hover: yellow;
  --n-merged-td-color-hover: rgba(166, 196, 114, 0.82);
  --n-merged-td-color-striped: #f1f1f1;



}


.main-article {
  min-height: 100vh;
  background-size: cover;
  background-color: center;
  color: var(--text);
  display: flex;
  justify-content: center;
  align-items: center;

}

.layers__base {
  transform: translate3d(0, calc(var(--scrollTop) / 1.6), 0);
  z-index: 0;
}

.layers__middle {
  transform: translate3d(0, calc(var(--scrollTop) / 2.5), 0);
}

.layers__front {
  transform: translate3d(0, calc(var(--scrollTop) / 5.7), 0);
}

.layer__header {

  transform: translate3d(0, calc(var(--scrollTop) / 2), 0);
  transition: var(--transition);
  will-change: transform;
  /*text-transform: uppercase;*/
  /*font-weight: 900;*/
  color: var(--text);
  text-shadow: 0 0 15px #9d822b;
}

.layers__title {
  font-size: calc(var(--index) * 2.65);
  letter-spacing: calc(var(--index) / 2.25);
  margin-top: calc(var(--index) * -.75);
  z-index: 6;
}

.layers__caption {
  font-size: calc(var(--index) / 1.175);
  letter-spacing: calc(var(--index) / 19.5);
  margin-top: calc(var(--index) * -.75);
  z-index: 5;
}

.main-article {
  --main-article-transform: translate3d(0, calc(var(--scrollTop) / -7.5), 0);
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  color: var(--text);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
  /* Update: */
  top: -1px;
  z-index: 0;
}

.main-article__header {
  /*text-transform: uppercase;*/
  font-size: calc(var(--index) * 1.8);
  letter-spacing: calc(var(--index) / 7.5);
  transform: var(--main-article-transform);
  transition: var(--transition);
  will-change: transform;
  font-size: calc(var(--index) / 1.175);
  letter-spacing: calc(var(--index) / 19.5);
  margin-top: calc(var(--index) * -.75);
  transition: var(--transition);
  will-change: transform;
  text-transform: uppercase;
  font-weight: 900;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
  color: var(--text);
  text-shadow: 0 0 15px #23f802;
}

.main-article__paragraph {
  max-width: calc(var(--index) * 30);
  font-size: calc(var(--index) * .9);
  margin-top: calc(var(--index) / 1.25);
  transform: var(--main-article-transform);
  transition: var(--transition);
  will-change: transform;
}

.content {
  will-change: transform;
}

.copy {
  position: absolute;
  bottom: calc(var(--index) * 2.5);
  opacity: .45;
  font-size: calc(var(--index) * .75);
  letter-spacing: calc(var(--index) / 37.5);
}
</style>
