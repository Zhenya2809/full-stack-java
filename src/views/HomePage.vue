<template>
  <h1>Home Page</h1>
  <div v-if="hasRole('ROLE_ADMIN')">Отправить уведомления клиентам
    <n-button type="success" @click="sendEmailReminder()">
      Send reminder
    </n-button>


  </div>
  <div v-if="hasRole('ROLE_USER')">Хуйня яку бачить тільки роль USER_ROLE</div>
</template>
<script>

import {NButton} from "naive-ui";
import axios from "axios";

export default {
  mounted() {
    this.checkAuthorization()
  },
  components: {NButton},
  name: "LoginHyi",

  data() {
    return {
      hideContent: false,

    }
  },

  methods: {
    hasRole(role) {
      if (localStorage.getItem('role') === role) {
        return true
      }
    },

    sendEmailReminder() {
      const token = localStorage.getItem('token')
      axios.get('http://localhost:8085/api/v1/admin/sendEmailReminder', {
        headers: {
          'Authorization': `Bearer_${token}`
        }
      }).catch((error) => console.error(error))

    },
    checkAuthorization() {
      if (localStorage.getItem('token') == null && localStorage.getItem('role') === "admin") {
        this.hideContent = false
      }
    }
  },
}
</script>
<style scoped>
footer {

  text-align: center;
  font-weight: bold;
  float: right;
  line-height: 115px;
  font-family: Arial, Helvetica, sans-serif;
  width: 981px;
  margin: 0 auto 8px;
  text-shadow: 0 1px 0 #fff;
  background-color: #ffb347;

}
</style>