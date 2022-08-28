<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <div id="app" class="main-container"><br><br><br><br><br><br>
      <HeaderPage/>
      <nav>
        <ul>
          <a v-if="hasRole('ROLE_USER')">
            <router-link to="/" exact>Home</router-link>
          </a>
          <a v-if="hasRole('ROLE_USER')">
            <router-link to="/choseDoctor">Chose Dr.</router-link>
          </a>
          <a v-if="hasRole('ROLE_USER')">
            <router-link to="/about">About</router-link>
          </a>
          <a v-if="hasRole('ROLE_USER')">
            <router-link to="/profile">My Profile</router-link>
          </a>
          <a v-if="hasRole('ROLE_ADMIN')">
            <router-link to="/profile">PROFILES</router-link>
          </a>
          <a v-if="hasRole('ROLE_ADMIN')">
            <router-link to="/usersMenu">USERS</router-link>
          </a>
          <a v-if="hasRole('ROLE_ADMIN')">
            <router-link to="/doctorsMenu">DOCTORS</router-link>
          </a>
          <a v-if="hasRole('ROLE_ADMIN')">
            <router-link to="/admin">ADMIN</router-link>
          </a>
          <a v-if="hideContent">
            <router-link to="/login">Log-in</router-link>
          </a>
          <a>
            <router-link to="/login" @click="logOut">Log-out</router-link>
          </a>
        </ul>
      </nav>
      <router-view></router-view>
      <FooterPage/>
    </div>
  </n-config-provider>
</template>
<script>

// import axios from "axios";

import HeaderPage from "@/views/HeaderPage";
import FooterPage from "@/views/FooterPage";
import {darkTheme} from 'naive-ui';

export default {

  mounted() {
    this.checkRole()
  },
  name: 'App',
  components: {
    HeaderPage,
    FooterPage,
  },


  data() {

    return {
      hideContent: false,
      darkTheme,
      themeOverrides: {
        common: {
          primaryColor: 'rgba(17,253,0,0.82)',
          placeholderColor: "rgb(43,43,44)",
          textColorBase: "#fff",
          textColor1: "rgba(255, 255, 255, 0.9)",
          inputColor: "rgba(255, 255, 255, 0.1)",
        },
        Button: {
          textColor: '#FF0000'
        },
        Select: {
          peers: {
            InternalSelection: {
              textColor: '#2b2b2c'
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
nav {
  margin: 27px auto 0;

  position: relative;
  width: 790px;
  height: 50px;
  background-color: rgb(64, 64, 70);
  border-radius: 8px;
  font-size: 0;
}

nav a {
  line-height: 50px;
  height: 100%;
  font-size: 15px;
  display: inline-block;
  position: relative;
  z-index: 1;
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  color: white;
  cursor: pointer;
}

a:nth-child(1) {
  width: 100px;
}

a:nth-child(2) {
  width: 110px;
}

a:nth-child(3) {
  width: 100px;
}

a:nth-child(4) {
  width: 160px;
}

a:nth-child(5) {
  width: 120px;
}


body {
  font-size: 12px;
  font-family: sans-serif;
  /*background: #2f2f60 url('http://i.imgur.com/bT2gl.png') left top;*/
  background: rgba(25, 25, 25, 0.93);
}

#app {

  /*background: #2f2f60 url('http://i.imgur.com/bT2gl.png') left top;*/
  font-family: Arial, Helvetica, sans-serif;
  width: 1000px;
  margin: 0 auto 18px;
  text-align: center;
  color: #ad9c18;

}


</style>
