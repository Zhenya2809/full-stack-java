<template>

  <div v-if="hasRole('ROLE_ADMIN')">
    <div class="middle">
      <h3>Відправити нагадування клієнтам на почту</h3>
      <UButton type="success" @click="sendEmailReminder()">
        Send --->Email
      </UButton>
    </div>

  </div>
  <div v-if="hasRole('ROLE_USER')">Хуйня яку бачить тільки роль USER_ROLE</div>
</template>
<script>

import api from "@/interceptors/axios";
import UButton from "@/components/global/UButton.vue";

export default {
  mounted() {
    this.checkAuthorization()
  },
  components: {UButton},
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

      api.get('http://65.109.235.33/api/v1/admin/sendEmailReminder', {}).catch((error) => console.error(error))

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

.button {
  display: flex;
  justify-content: center;
}

.textdiv {
  color: red;
}
</style>