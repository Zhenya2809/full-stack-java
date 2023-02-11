<template>
  <h1>Home Page</h1>


</template>
<script>

import api from "@/interceptors/axios";


export default {
  setup() {
  },
  mounted() {
  },
  components: {},


  data() {
    return {}
  },

  methods: {
    hasRole(role) {
      if (localStorage.getItem('role') === role) {
        return true
      }
    },

    sendEmailReminder() {
      api.get('http://localhost:8085/api/v1/admin/sendEmailReminder', {}).catch((error) => console.error(error))

    },
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

:deep(.doctorSpeciality) {
  color: rgb(230, 238, 253) !important;
}

:deep(.doctorFIO) {
  color: rgb(230, 238, 253) !important;
}

:deep(.date) {
  color: rgb(230, 238, 253) !important;
}

:deep(.time) {
  color: rgb(230, 238, 253) !important;
}
</style>