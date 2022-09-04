<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <div id="app" class="main-container"><br><br><br><br><br><br>
      <HeaderPage/>
      <nav>


        <router-link v-if="hasRole('ROLE_USER')" to="/" exact>Home</router-link>


        <router-link v-if="hasRole('ROLE_USER')" to="/myAppointment" exact>Appointments</router-link>


        <router-link v-if="hasRole('ROLE_USER')" to="/choseDoctor">Chose Dr.</router-link>


        <router-link v-if="hasRole('ROLE_USER')" to="/about">About</router-link>


        <router-link v-if="hasRole('ROLE_USER')" to="/profile">My Profile</router-link>


        <router-link v-if="hasRole('ROLE_ADMIN')" to="/profile">PROFILES</router-link>


        <router-link v-if="hasRole('ROLE_ADMIN')" to="/usersMenu">USERS</router-link>


        <router-link v-if="hasRole('ROLE_ADMIN')" to="/doctorsMenu">DOCTORS</router-link>


        <router-link v-if="hasRole('ROLE_ADMIN')" to="/admin">ADMIN</router-link>


        <router-link v-if="hideContent" to="/login" class="login">Log-in</router-link>

        <router-link v-if="hasRole('ROLE_DOCTOR')" to="/appointments" exact>Appointments</router-link>

        <router-link to="/login" @click="logOut" class="logout">Log-out</router-link>


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
  width: 150px;

}

a:nth-child(3) {
  width: 100px;

}

a:nth-child(4) {
  width: 100px;

}

a:nth-child(5) {
  width: 100px;

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

body {
  font-size: 12px;
  font-family: sans-serif;
  /*background: #2f2f60 url('http://i.imgur.com/bT2gl.png') left top;*/
  background: rgba(25, 25, 25, 0.93);
}

.logout {
  color: red;
  font-style: oblique;
}

.login {
  color: #03f503;
  font-style: oblique;
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
