<template>
      <nav>
        <n-avatar
            :size="110"
            :src="img1"
        />
        <router-link v-if="hasRole('ROLE_USER')" to="/" exact>Головна</router-link>

        <router-link v-if="hasRole('ROLE_USER')" to="/myAppointment" exact>Записи</router-link>
        <router-link v-if="hasRole('ROLE_USER')" to="/choseDoctor">Лікарі</router-link>
        <router-link v-if="hasRole('ROLE_USER')" to="/about">Про нас</router-link>
        <router-link v-if="hasRole('ROLE_USER')" to="/profile">Мій профіль</router-link>
        <router-link v-if="hasRole('ROLE_ADMIN')" to="/profile">Картки</router-link>
        <router-link v-if="hasRole('ROLE_ADMIN')" to="/usersMenu">Користувачі</router-link>
        <router-link v-if="hasRole('ROLE_ADMIN')" to="/doctorsMenu">Лікарі</router-link>
        <router-link v-if="hasRole('ROLE_ADMIN')" to="/admin">Нагадування</router-link>
        <router-link v-if="hideContent" to="/login" class="login">Вхід</router-link>
        <router-link v-if="hasRole('ROLE_DOCTOR')" to="/appointments" exact>Записи</router-link>
        <router-link v-if="hasRole('ROLE_DOCTOR')" to="/doctorProfilePage" exact>Мій профіль</router-link>
        <router-link v-if="hasRole('ROLE_DOCTOR')" to="/treatment" exact>Лікування</router-link>
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
nav {
  margin: 27px auto 0;
  position: relative;
  width: 1090px;
  height: 100px;
  border-radius: 8px;
  font-size: 0;
  align-content: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.router-link {
  flex: 1;
  text-align: center;
  padding: 10px;
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
  text-align: center;
  color: #605f5f;
  text-shadow: 0 0 15px #888888;
  cursor: pointer;
  font-weight: 600;


}

a:nth-child(1) {
  width: 11px;

}

a:nth-child(2) {
  width: 150px;

}

a:nth-child(3) {
  width: 180px;

}

a:nth-child(4) {
  width: 110px;

}

a:nth-child(5) {
  width: 166px;

}

a:nth-child(6) {
  width: 190px;

}

a:nth-child(7) {
  width: 140px;

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
.middle {
  padding-top: 50px;
  width: 400px;
  margin: 0 auto;
}
.middle1{
  float:right;
  padding-right: 127px;
}

</style>
