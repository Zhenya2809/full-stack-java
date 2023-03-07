<template>
  <div class="textMessage">
    <span>{{ message }}</span>
  </div>


  <form class="login-form" @submit.prevent="onRegistration">
    <label><i class="form-label"></i>Номер телефону</label>
    <UInput v-model="username"
            :type="login"
            placeholder="Номер телефону"
            autocomplete="name"
            class="UInput" required/>


    <label><i class="orm-label"></i>Email</label>
    <UInput v-model="email"
            type="email"
            placeholder="email"
            class="UInput" required/>


    <label><i class="orm-label"></i>Ім'я</label>
    <UInput v-model="firstName"
            :type="firstName"
            placeholder="Ім'я"
            autocomplete="family-name"
            class="UInput" required/>


    <label><i class="orm-label"></i>Призвіще</label>
    <UInput v-model="lastName"
            :type="lastName"
            placeholder="Призвіще"
            class="UInput" />


    <label><i class="orm-label"></i>Пароль</label>
    <UInput v-model="password"
            type="password"
            placeholder="Пароль"
            class="UInput"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            required/>


    <label><i class="orm-label"></i>Re-Пароль</label>
    <UInput v-model="rePassword"
            type="password"
            placeholder="re-пароль"
            class="UInput"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            required/>

    <p class="clearfix">
      <button type="submit" class="form-button">Зареєструватись</button>
    </p>
  </form>
</template>

<script>


import axios from "axios";
import UInput from "@/components/global/UInput.vue";

export default {
  components: {
    UInput
  },
  name: "RegistrationPage",
  data() {
    return {
      login: null,
      username: null,
      password: null,
      rePassword: null,
      firstName: null,
      lastName: null,
      email: null,
      req: null,
      role: null,
      message: null,
    }
  },

  methods: {
    onRegistration() {
      const data = {
        username: this.username,
        password: this.password,
        rePassword: this.rePassword,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email

      }
      console.log(data)
      axios.post('http://65.109.235.33/api/v1/users/registration', data).then(response => {
        this.req = response.data
        window.location.href = 'http://localhost:8080/login';
        this.message = response.data.result

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
  width: 100%;
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

  width: 70%
}

</style>