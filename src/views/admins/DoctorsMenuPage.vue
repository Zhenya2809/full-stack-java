<template>
  <h1>Doctors MENU </h1>

  <div v-if="hasRole('ROLE_ADMIN')">
    <n-data-table class="table"
                  :columns="columns"
                  :data="items"
                  :pagination="pagination"
                  :bordered="false"
    />
    <n-form-item path="id">
      <n-input class="even-row-color" v-model:value="id" placeholder="id"/>
    </n-form-item>
    <n-button type="error" @click="deleteDoctors">
      DELETE
    </n-button>
    <n-form-item path="id">
      <n-input class="even-row-color" v-model:value="doctorFirstName" placeholder="doctor firstName"/>
    </n-form-item>
    <n-form-item path="id">
      <n-input class="even-row-color" v-model:value="doctorLastName" placeholder="doctor lastName"/>
    </n-form-item>

    <n-form-item path="id">
      <n-input class="even-row-color" v-model:value="about" placeholder="about"/>
    </n-form-item>
    <n-form-item path="id">
      <n-input class="even-row-color" v-model:value="linkPhoto" placeholder="link to photo"/>
    </n-form-item>

    <n-form-item path="id">
      <n-select class="even-row-color"  :options="selectOptions" v-model:value="speciality"/>
    </n-form-item>
    <n-form-item path="id">
      <n-input class="even-row-color" v-model:value="login" placeholder="username"/>


      <n-input class="even-row-color" type="password" v-model:value="password" placeholder="password"/>

      <n-input class="even-row-color" type="password" v-model:value="rePassword" placeholder="rePassword"/>

      <n-input class="even-row-color" v-model:value="email" placeholder="email"/>
    </n-form-item>
    <n-button type="success" @click="saveDoctor()">
      SAVE
    </n-button>


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
      title: "FirstName",
      key: "doctorFirstName",
      minWidth: '100px'
    },
    {
      title: "LastName",
      key: "doctorLastName",
      minWidth: '100px'
    },
    {
      title: "Speciality",
      key: "speciality",
      minWidth: '100px'
    },
    {
      title: "About",
      key: "about",
      minWidth: '100px'
    },
    {
      title: "LinkPhoto",
      key: "linkPhoto",
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
        window.location.href = 'http://localhost:3000/doctorsMenu';
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
        window.location.href = 'http://localhost:3000/doctorsMenu';
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
.table {

  padding: .25rem .5rem;
  font-size: .875rem;
  border-radius: .2rem;
  box-sizing: border-box;
  width: 100%;

  margin: 0 auto;
  border: 1px solid black;

}

.table > tbody > tr > td:first-child {
  white-space: nowrap;
}

.even-row-color {
  width: 30%;
  height: 30px;
  display: block;
  margin: 0 auto;
  border: 1px solid rgb(43, 43, 44);


}

</style>