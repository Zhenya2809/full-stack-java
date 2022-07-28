<template>
  <h1>Home Page</h1>
  <div v-if="hasRole('ROLE_ADMIN')">Хуйня яку бачить тільки роль ADMIN_ROLE</div>
  <div v-if="hasRole('ROLE_USER')">Хуйня яку бачить тільки роль USER_ROLE</div>
</template>
<script>

export default {
  mounted() {

  },
  components: {},
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
  }
};
</script>