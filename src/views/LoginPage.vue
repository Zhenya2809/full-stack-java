<template>
  <form class="form-2" @submit.prevent="onSubmit">
    <h1><span class="log-in">Войти</span> или <span class="sign-up">зарегистрироваться</span></h1>
    <p class="float">

      <n-input v-model:value="phone" type="text" placeholder="phone" name="phone" size="large" round/>
    </p>
    <p class="float">

      <n-input v-model:value="password"
               round
               placeholder="Password"
               type="password"
               show-password-on="mousedown"
               :minlength="8"
               :maxlength="16"/>
    </p>
    <p class="clearfix">
      <a href="/registration" class="registration">Зарегистрироваться</a>
      <input type="submit" name="submit" value="Войти">
    </p>
  </form>

</template>

<script>
import axios from "axios";
import {NInput} from 'naive-ui'
import jwt_decode from "jwt-decode";


export default {
  components: {
    NInput
  },
  name: "LoginHyi",

  data() {
    return {
      phone: '',
      password: '',
      token: '',
      role: '',

    }
  },

  methods: {

    onSubmit() {
      const data = {
        phone: this.phone,
        password: this.password,

      }
      console.log(data)
      axios.post('http://localhost:8085/api/v1/auth/login', data).then(response => {
        localStorage.setItem('phone', this.phone)
        this.token = response.data
        localStorage.setItem('token', this.token.token)
        const decoded = jwt_decode(this.token.token);
        console.log('decoded', decoded)
        this.role = decoded.roles
        localStorage.setItem('role', this.role[0])
        window.location.href = 'http://localhost:3000/';


      })

    },
  }
};
</script>

<style>
.n-input .n-input__input-el {
  color: black;
}

.n-base-icon {
  color: red;
}

.n-input {
  --n-color-focus: black;
  color: black;
  text-decoration-color: black;
  -webkit-tap-highlight-color: transparent;
  padding: 0px;
  margin: 0px;


  background-color: rgb(230, 238, 253);

  font-size: 14px;
  font-family: v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  line-height: 1.6;
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0s;
}
</style>