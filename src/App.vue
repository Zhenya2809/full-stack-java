<template>

  <div id="app">
    <HeaderPage/>

    <div id="nav">

      <n-button type="info" @click="routeAbout">About</n-button>
      <n-button type="info" @click="routeAdmin">Admin</n-button>
      <n-button type="info" @click="routeDoctorMenu">DOCTOR menu</n-button>
      <n-button type="info" @click="routeHome">Home</n-button>

      <n-button v-if="hideContent" type="success" @click="routeLogin">Log-In</n-button>

      <n-button  type="error" @click="logOut">Log-Out</n-button>
    </div>
    <router-view/>
    <FooterPage/>
  </div>
</template>
<script>

// import axios from "axios";

import {NButton} from "naive-ui";
import HeaderPage from "@/views/headerPage";
import FooterPage from "@/views/footerPage";
export default {
  mounted() {
    this.checkRole()
  },
  name: 'App',
  components: {
    NButton,
    HeaderPage,
    FooterPage
  },


  data() {
    return {
      hideContent: false
    }
  },
  methods: {
    checkRole() {
      if (localStorage.getItem('role') == null) {
        this.hideContent = true;
      }
    },
    logOut() {
      localStorage.removeItem('username')
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      window.location.href = 'http://localhost:3000/';
    },
    routeHome() {
      window.location.href = 'http://localhost:3000/';
    },
    routeAbout() {
      window.location.href = 'http://localhost:3000/about';
    },
    routeLogin() {
      window.location.href = 'http://localhost:3000/login';
    },
    routeAdmin() {
      window.location.href = 'http://localhost:3000/admin';
    },
    routeDoctorMenu(){
      window.location.href='http://localhost:3000/doctorsMenu';
    },
  }
}
</script>

<style>
#app {

  background: #2f2f60 url('http://i.imgur.com/bT2gl.png') left top;

  font-family: Arial, Helvetica, sans-serif;
  width: 1581px;
  margin: 0 auto 18px;
  text-align: center;
  color: #ad9c18;


}


</style>
