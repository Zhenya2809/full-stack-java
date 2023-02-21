<template>
  <h1> Всі лікарі </h1>

  <div v-if="hasRole('ROLE_ADMIN')">
    <n-data-table class="table"
                  :columns="columns"
                  :data="items"
                  :pagination="pagination"
                  :bordered="false"
    />
    <h1> Видалити лікаря </h1>
    <n-form-item path="id">
      <n-input class="even-row-color" v-model:value="id" placeholder="введіть id лікаря"/>
    </n-form-item>

    <div class="button">
    <n-button type="error" @click="deleteDoctors">
      DELETE
    </n-button>
    </div>
    <h1> Додавання лікаря </h1>
    <n-form-item >
      <n-input class="even-row-color" v-model:value="doctorFirstName" placeholder="Ім'я лікаря"/>
    </n-form-item>
    <n-form-item >
      <n-input class="even-row-color" v-model:value="doctorLastName" placeholder="Призвіще лікаря"/>
    </n-form-item>

    <n-form-item >
      <n-input class="even-row-color" v-model:value="about" placeholder="Інформація про лікаря"/>
    </n-form-item>
    <n-form-item >
      <n-input class="even-row-color" v-model:value="linkPhoto" placeholder="Ссилка на фото лікаря"/>
    </n-form-item>

    <n-form-item >
      <n-select class="even-row-color"  :options="selectOptions" v-model:value="speciality"/>
    </n-form-item>
    <h1> Створення акаунту для лікаря </h1>
    <n-form-item >
      <n-input class="even-row-color" v-model:value="login" placeholder="Логін"/>


      <n-input class="even-row-color" type="password" v-model:value="password" placeholder="Пароль"/>

      <n-input class="even-row-color" type="password" v-model:value="rePassword" placeholder="Повтор паролю"/>

      <n-input class="even-row-color" v-model:value="email" placeholder="Емейл"/>
    </n-form-item>
    <div class="button">
    <n-button type="success" @click="saveDoctor()">
      SAVE
    </n-button>
    </div>

  </div>
  <div v-if="hasRole('ROLE_USER')">Доступ запрещен-----> USER_ROLE иди нахуй</div>
</template>
<script>

import api from "@/interceptors/axios";
import {NButton, NInput} from "naive-ui";

const createColumns = () => {
  return [
    {
      title: "ID",
      key: "id",
      minWidth: '55px'
    },
    {
      title: "Ім'я",
      key: "doctorFirstName",
      minWidth: '100px'
    },
    {
      title: "Призвіще",
      key: "doctorLastName",
      minWidth: '100px'
    },
    {
      title: "Спеціальність",
      key: "speciality",
      minWidth: '100px'
    },
    {
      title: "Про лікаря",
      key: "about",
      minWidth: '100px'
    },
    // {
    //   title: "LinkPhoto",
    //   key: "linkPhoto",
    // }
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
    this.getAllDoctor()

  },
  components: {NButton, NInput},
  name: "LoginHyi",

  data() {
    return {
      hideContent: false,
      doctorFirstName: null,
      doctorLastName: null,
      speciality: null,
      about: null,
      linkPhoto: null,
      message: null,
      req: null,
      role: null,
      token: null,
      login: null,
      id:null,
      selectOptions: ([
        {
          label: "Терапевт",
          value: "Терапевт",
        },
        {
          label: "Хирург",
          value: "Хирург"
        },
        {
          label: "Уролог",
          value: "Уролог"
        },
        {
          label: "Гинеколог",
          value: "Гинеколог"
        },
        {
          label: "Онколог",
          value: "Онколог"
        },
        {
          label: "Проктолог",
          value: "Проктолог"
        },

      ]),
      password: null,
      rePassword: null,
      email: null,
      items: [{
        id: null,
        doctorFirstName: null,
        doctorLastName: null,
        speciality: null,
        about: null,
        linkPhoto: null,
      }]
    }
  },

  methods: {
    deleteDoctors() {

      api.delete('http://localhost:8085/api/v1/admin/doctors/delete/' + this.id, {}).then((res) => {
        this.id = res.data.id
        console.log(res.data.id)
        window.location.href = 'http://localhost:8080/doctorsMenu';
      }).catch((error) => console.error(error))

    },
    getAllDoctor() {
      api.get('http://localhost:8085/api/v1/admin/doctors/search', {}).then((res) => {
        this.items = res.data
        console.log(res.data)
      }).catch((error) => console.error(error))

    },
    saveDoctor() {
      const data = {
        doctorFirstName: this.doctorFirstName,
        doctorLastName: this.doctorLastName,
        speciality: this.speciality,
        about: this.about,
        linkPhoto: this.linkPhoto,
        login: this.login,
        password: this.password,
        rePassword: this.rePassword,
        email: this.email,


      }
      console.log(data)
      api.post('http://localhost:8085/api/v1/admin/saveDoctor', data, {}).then(response => {
        this.req = response.data
        window.location.href = 'http://localhost:8080/doctorsMenu';
        this.message = response.data.result

      })

    },
    hasRole(role) {
      if (localStorage.getItem('role') === role) {
        return true
      }
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
.table > tbody > tr > td:first-child {
  white-space: nowrap;
}

.button {
  display: flex;
  justify-content: center;
}

</style>