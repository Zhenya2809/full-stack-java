<template>
  <form @submit.prevent="onSubmit" class="login-form">
    <label for="phone" class="form-label">Телефон</label>
    <UInput
            id="phone"
            class="UInput"
            v-model="phone"
            placeholder="Phone number"></UInput>

    <label for="password" class="form-label">Пароль</label>
    <UInput type="password"
            id="password"
            class="UInput"
            v-model="password"
            placeholder="password"
            title="Пароль должен содержать как минимум одну заглавную букву, одну строчную букву, одну цифру и иметь длину не менее 8 символов.">
      >
    </UInput>
    <p class="clearfix">
      <a href="/registration" class="registration">Зареєструватись</a>

    </p>
    <button type="submit" class="form-button">Войти</button>
  </form>
</template>

<script>
import axios from "axios";

import jwt_decode from "jwt-decode";
import UInput from "@/components/global/UInput.vue";


export default {
  components: {
    UInput

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
      axios.post('http://65.109.235.33/api/v1/auth/login', data).then(response => {
        localStorage.setItem('phone', this.phone)
        this.token = response.data
        localStorage.setItem('token', this.token.token)
        const decoded = jwt_decode(this.token.token);
        console.log('decoded', decoded)
        this.role = decoded.roles
        localStorage.setItem('role', this.role[0])
        window.location.href = 'http://localhost:8080/';


      })

    },
  }
};
</script>

<style>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 23px;
}

.form-label {
  font-size: 1rem;
  display: block;
  margin-bottom: 0.5rem;
}

.form-button {
  width: 70%;
  font-size: 1.2rem;
  padding: 0.75rem;
  color: #fff;
  background-color: #08ff00;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.form-button:hover,
.form-button:focus {
  background-color: #0ecc00;
}

.UInput {
  /* остальные стили... */
  width: 70%
}
</style>