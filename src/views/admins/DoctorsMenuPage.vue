<template>
  <h1> Всі лікарі </h1>

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
    <h1> Видалити лікаря </h1>
    <div v-if="hasRole('ROLE_USER')">Доступ запрещен-----> USER_ROLE иди нахуй</div>


    <UInput class="even-row-color" v-model="id" placeholder="введіть id лікаря"/>


    <UButton type="error" @click="deleteDoctors">
      DELETE
    </UButton>

    <div class="left">
      <h1> Додавання лікаря </h1>

      <UInput v-model="firstName" placeholder="Ім'я лікаря"/>


      <UInput v-model="lastName" placeholder="Призвіще лікаря"/>


      <UInput v-model="about" placeholder="Інформація про лікаря"/>


      <UInput v-model="photo" placeholder="Ссилка на фото лікаря"/>


      <UInput :options="selectOptions" v-model="speciality" type="options">Виберіть спеціалізацію лікаря
      </UInput>
    </div>
    <div class="right">
      <h1> Створення акаунту для лікаря </h1>
      <lable>Phone</lable>
      <UInput type="tel" v-model="login" placeholder="Логін"/>

      <lable>Password</lable>
      <UInput type="password" v-model="password" placeholder="Пароль"/>
      <lable>Re-Password</lable>
      <UInput type="password" v-model="rePassword" placeholder="Повтор паролю"/>
      <lable>Email</lable>
      <UInput type="email" v-model="email" placeholder="Емейл"/>


      <UButton type="success" @click="saveDoctor()">
        SAVE
      </UButton>

    </div>
  </div>
    </div>
</template>
<script>

import api from "@/interceptors/axios";
import UInput from "@/components/global/UInput.vue";
import UButton from "@/components/global/UButton.vue";

const createColumns = () => {
  return [
    {
      title: "ID",
      key: "id",
      minWidth: '55px'
    },
    {
      title: "Ім'я",
      key: "firstName",
      minWidth: '130px'
    },
    {
      title: "Призвіще",
      key: "lastName",
      minWidth: '150px'
    },
    {
      title: "Спеціальність",
      key: "speciality",
      minWidth: '150px'
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
  components: {UButton, UInput},
  name: "LoginHyi",

  data() {
    return {
      hideContent: false,
      firstName: null,
      lastName: null,
      speciality: null,
      searchFio: null,
      about: null,
      photo: null,
      message: null,
      req: null,
      role: null,
      token: null,
      login: null,
      id: null,
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
        firstName: null,
        lastName: null,
        speciality: null,
        about: null,
        photo: null,
      }]
    }
  },

  methods: {
    deleteDoctors() {

      api.delete('http://65.109.235.33/api/v1/admin/doctors/delete/' + this.id, {}).then((res) => {
        this.id = res.data.id
        console.log(res.data.id)
        window.location.href = 'http://localhost:8080/doctorsMenu';
      }).catch((error) => console.error(error))

    },
    getAllDoctor() {
      api.get('http://65.109.235.33/api/v1/admin/doctors/search', {}).then((res) => {
        this.items = res.data
        console.log(res.data)
      }).catch((error) => console.error(error))

    },
    saveDoctor() {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        speciality: this.speciality,
        about: this.about,
        photo: this.photo,
        login: this.login,
        password: this.password,
        rePassword: this.rePassword,
        email: this.email,


      }
      console.log(data)
      api.post('http://65.109.235.33/api/v1/admin/saveDoctor', data, {}).then(response => {
        this.req = response.data
        window.location.href = 'http://localhost:8080/doctorsMenu';
        this.message = response.data.result

      })

    },
    onSearch() {
      console.log(this.searchFio)
      api.get('http://65.109.235.33/api/v1/admin/searchDoctor/' + this.searchFio, {}).then((res) => {
        this.items = res.data
        console.log(res.data)
      }).catch((error) => console.error(error))
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

.table > tbody > tr > td:first-child {
  white-space: nowrap;
}

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

.button {
  display: flex;
  justify-content: center;
}

/*.left {*/
/*  float: left;*/
/*}*/

/*.right {*/
/*  float: right;*/
/*}*/
.middle{
  padding-top: 50px;
  width: 400px;
  margin: 0 auto;
}
</style>