<template>
  <h1>Меню користувачів </h1>
  <div v-if="hasRole('ROLE_ADMIN')">
    <div class="middle1">
      <UInput class="form-group" v-model="searchFio" placeholder="Пошук" @input="onSearch()"  />
    </div>
    <n-data-table class="table"
                  :columns="columns"
                  :data="items"
                  :pagination="pagination"
                  :bordered="false"
    />
    <div class="middle">
      <h1>Введіть id користувача для видалення </h1>
      <UInput class="even-row-color" v-model="id" placeholder="id"/>


      <UButton type="error" @click="deleteUsers">
        DELETE
      </UButton>
    </div>
  </div>
</template>

<script>

import UInput from "@/components/global/UInput.vue";
import UButton from "@/components/global/UButton.vue";
import api from "@/interceptors/axios";

const createColumns = () => {
  return [
    {
      title: "ID",
      key: "id"
    },
    {
      title: "Логін",
      key: "phone"
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
  components: {UButton, UInput},

  name: "AboutPages",

  data() {
    return {
      token: null,
      hideContent: true,
      id: null,
      searchFio: null,
      items: [{
        id: '',
        phone: '',
        email: '',
        firstName: '',
        lastName: ''
      }],

    };
  },

  methods: {
    getAllUser() {
      api.get('http://65.109.235.33/api/v1/admin/users/search', {}).then((res) => {
        this.items = res.data
        console.log(res.data)
      }).catch((error) => console.error(error))
    },

    hasRole(role) {
      if (localStorage.getItem('role') === role) {
        return true;
      }
    },
    onSearch() {
      console.log(this.searchFio)
      api.get('http://65.109.235.33/api/v1/admin/searchUser/' + this.searchFio, {}).then((res) => {
        this.items = res.data
        console.log(res.data)
      }).catch((error) => console.error(error))
    },
    deleteUsers() {
      api.get('http://65.109.235.33/api/v1/admin/users/delete/' + this.id, {
      }).then((res) => {
        this.id = res.data.id
        console.log(res.data.id)
        window.location.href = 'http://localhost:8080/usersMenu';
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



.table {

  padding: .25rem .5rem;
  font-size: .875rem;
  border-radius: .2rem;
  box-sizing: border-box;
  width: 90%;
  font-weight: bold;
  margin: 0 auto;
  border: 1px solid black;
}


</style>