<template>

  <div v-if="hasRole('ROLE_ADMIN')">
    <h1>Картки клієнтів </h1>

    <n-data-table class="table"
                  :columns="columns"
                  :data="items"
                  :pagination="pagination"
                  :bordered="false"
    />

    <n-form-item class="form" path="id">
      <n-input class="form-group" v-model:value="id" placeholder="id"/>
    </n-form-item>
    <div class="button">
      <n-button type="error" @click="deletePatientCard" >
        DELETE
      </n-button>
    </div>
  </div>
  <div v-if="hasRole('ROLE_USER')">
    <h1>MY PROFILE MENU </h1>
    <n-data-table class="background"
                  :columns="columns"
                  :data="items"
                  :pagination="pagination"
                  :bordered="false"
    />
    <form class="form-2" @submit.prevent="onSubmit">
      <n-gradient-text gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)" size="20">
        COMPLETE YOUR PROFILE
        <div>___________________________</div>
      </n-gradient-text>

      <n-gradient-text gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)" size="20">
        <label><i class="icon-lock"></i></label>
        <n-date-picker v-model:value="birthday" value=""/>
        <label><i class="icon-lock"></i> </label>
        <n-input v-model:value="placeOfResidence" type="text" name="username" placeholder="placeOfResidence"
                 size="large"
                 round/>
        <label><i class="icon-lock"></i> </label>
        <n-input v-model:value="insurancePolicy" type="text" name="username" placeholder="insurancePolicy" size="large"
                 round/>
        <label><i class="icon-lock"></i> </label>
        <n-input v-model:value="phoneNumber" type="text" name="username" placeholder="phoneNumber" size="large" round/>
        <label><i class="icon-lock"></i> </label>
        <n-select :style="{ width: '100%' }" :options="selectOptions" v-model:value="sex"/>
        <div>___________________________</div>
      </n-gradient-text>
      <p class="clearfix">
        <a href="/myAppointment" class="registration">APPOINTMENTS</a>
        <input type="submit" name="submit" value="SAVE" @click="reload()">

      </p>
    </form>
  </div>

</template>

<script>
import api from "@/interceptors/axios";
import {NInput} from 'naive-ui'
import axios from "axios";

const createColumns = () => {
  return [
    {
      title: "ID",
      key: "id"
    },
    {
      title: "ПІБ",
      key: "fio"
    },
    {
      title: "Стать",
      key: "sex"
    },
    {
      title: "Місце народження",
      key: "placeOfResidence"
    },
    {
      title: "Страховий поліс",
      key: "insurancePolicy",
    },
    {
      title: "Email",
      key: "email",
    },
    {
      title: "Дата народження",
      key: "birthday",
    },
    {
      title: "Номер телефону",
      key: "phoneNumber",
    },
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
    this.getProfileAdmin()
    this.getProfileUser()
  },
  components: {
    NInput
  },
  name: "UserProfile",

  data() {
    return {
      selectOptions: ([
        {
          label: "male",
          value: "male",
        },
        {
          label: "female",
          value: "female"
        },

      ]),
      birthday: null,
      test: "text",
      insurancePolicy: null,
      placeOfResidence: null,
      sex: 'male',
      phoneNumber: null,
      id: null,
      items: [{
        id: null,
        birthday: null,
        insurancePolicy: null,
        placeOfResidence: null,
        sex: null,
        phoneNumber: null,
        fio: null,
        email: null,
      }],
    }
  },

  methods: {
    getProfileAdmin() {
      if (localStorage.getItem('role') === 'ROLE_ADMIN') {
        api.get('http://localhost:8085/api/v1/admin/myProfile', {}).then((res) => {
          this.items = res.data
          console.log(res.data)
        }).catch((error) => console.error(error))
      }
    },
    getProfileUser() {
      if (localStorage.getItem('role') === 'ROLE_USER') {
        api.get('http://localhost:8085/api/v1/users/myProfile', {}).then((res) => {
          this.items = res.data
          console.log(res.data)
        }).catch((error) => console.error(error))
      }
    },
    deletePatientCard() {
      const token = localStorage.getItem('token')
      axios.get('http://localhost:8085/api/v1/admin/patientCard/delete/' + this.id, {
        headers: {
          'Authorization': `Bearer_${token}`
        }
      }).then(() => {
        window.location.href = 'http://localhost:3000/profile';
      }).catch((error) => console.error(error))

    },
    reload() {
      window.location.reload()
    },
    onSubmit() {
      const data = {
        sex: this.sex,
        birthday: this.birthday,
        placeOfResidence: this.placeOfResidence,
        insurancePolicy: this.insurancePolicy,
        email: this.email,
        phoneNumber: this.phoneNumber,
      }
      console.log(data)

      api.post('http://localhost:8085/api/v1/users/update', data, {})

    },

    checkAuthorization() {
      if (localStorage.getItem('token') == null && localStorage.getItem('role') === "admin") {
        this.hideContent = false
      }

    },
    handleUpdateValue({year, month, date}) {
      console.log(`${year}-${month}-${date}`)
    },


    hasRole(role) {
      if (localStorage.getItem('role') === role) {
        return true;
      }
    },
  }
}
</script>

<style scoped>
.table {

  padding: .25rem .5rem;
  font-size: .875rem;
  border-radius: .2rem;
  box-sizing: border-box;
  width: 90%;

  margin: 0 auto;
  border: 0px solid black;
}

.form-2 {


}

/*.even-row-color {*/
/*  width: 30%;*/
/*  height: 30px;*/
/*  display: block;*/
/*  margin: 0 auto;*/
/*  border: 1px solid black;*/
/*  --n-color-focus: red;*/


/*}*/

.background {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  border: 1px solid black;
  background: #f5f5f5 url('https://i.ibb.co/PZB0b1X/223223.png');
  background-repeat: no-repeat;
  background-size: cover;
}

.button {
  display: flex;
  justify-content: center;
}

</style>