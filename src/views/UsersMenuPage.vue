<template>
  <h1>Меню користувачів </h1>
  <div v-if="hasRole('ROLE_ADMIN')">
    <n-data-table class="table"
                  :columns="columns"
                  :data="items"
                  :pagination="pagination"
                  :bordered="false"
    />

    <h1>Введіть id користувача для видалення </h1>
    <n-form-item class="form-control" path="id">
      <n-input class="even-row-color" v-model:value="id" placeholder="id"/>
    </n-form-item>
    <div class="button">
      <n-button type="error" @click="deleteUsers">
        DELETE
      </n-button>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import {NButton, NInput} from "naive-ui";

const createColumns = () => {
  return [
    {
      title: "ID",
      key: "id"
    },
    {
      title: "Логін",
      key: "username"
    },
    {
      title: "Ім'я",
      key: "firstName"
    },
    {
      title: "Призвіще",
      key: "lastName",
    },
    {
      title: "email",
      key: "email",
    }
  ];
};


export default {
  setup() {
    return {
      columns: createColumns({}),
      pagination: false
    };
  },
  mounted() {
    this.checkAuthorization()
    this.getAllUser()
  },
  components: {NButton, NInput},

  name: "AboutPages",

  data() {
    return {
      token: null,
      hideContent: true,
      id: null,

      items: [{
        id: '',
        username: '',
        email: '',
        firstName: '',
        lastName: ''
      }],

    };
  },

  methods: {
    getAllUser() {
      const token = localStorage.getItem('token')
      axios.get('http://65.109.235.33:8085/api/v1/admin/users/search', {
        headers: {
          'Authorization': `Bearer_${token}`
        }
      }).then((res) => {
        this.items = res.data
        console.log(res.data)
      }).catch((error) => console.error(error))
    },

    hasRole(role) {
      if (localStorage.getItem('role') === role) {
        return true;
      }
    },
    getUsers() {
      const token = localStorage.getItem('token')
      axios.get('http://65.109.235.33:8085/api/v1/users/' + this.id, {
        headers: {
          'Authorization': `Bearer_${token}`
        }
      }).then((res) => {

        console.log(res.data)
      }).catch((error) => console.error(error))

    },
    deleteUsers() {
      const token = localStorage.getItem('token')
      axios.get('http://65.109.235.33:8085/api/v1/admin/users/delete/' + this.id, {
        headers: {
          'Authorization': `Bearer_${token}`
        }
      }).then((res) => {
        this.id = res.data.id
        console.log(res.data.id)
        window.location.href = 'http://localhost:3000/admin';
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

.even-row-color {
  width: 30%;
  height: 30px;
  display: block;
  margin: 0 auto;
  border: 1px solid black;


}
.button {
  display: flex;
  justify-content: center;
}


</style>