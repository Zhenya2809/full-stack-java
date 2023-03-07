<template>

  <div v-if="hasRole('ROLE_ADMIN')">
    <h1>Картки клієнтів </h1>
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
      <n-form-item class="form" path="id">
        <n-input class="form-group" v-model:value="id" placeholder="id"/>
      </n-form-item>
      <div class="button">
        <n-button type="error" @click="deletePatientCard">
          DELETE
        </n-button>
      </div>
    </div>
  </div>
  <div v-if="hasRole('ROLE_USER')">
    <h1>Мій профіль </h1>
    <n-data-table class="background"
                  :columns="columns"
                  :data="items"
                  :pagination="pagination"
                  :bordered="false"
    />
    <div class="middle">
      <UForm form-title="Тут ви можете редагувати свій профіль"
             @submit.prevent="onSubmit"
             formSubmitText="Update"


      >


        <label><i class="icon-lock"></i></label>
        <n-date-picker v-model:value="birthday" value=""/>
        <label><i class="icon-lock"></i> </label>
        <n-input v-model:value="placeOfResidence" type="text" name="placeOfResidence" placeholder="Місце народження"
                 size="large"
                 round/>
        <label><i class="icon-lock"></i> </label>
        <n-input v-model:value="fio" type="text" name="fio" placeholder="ПІБ"
                 size="large"
                 round/>
        <label><i class="icon-lock"></i> </label>
        <n-input v-model:value="email" type="text" name="email" placeholder="email"
                 size="large"
                 round/>
        <label><i class="icon-lock"></i> </label>
        <n-input v-model:value="insurancePolicy" type="text" name="insurancePolicy" placeholder="Страховий поліс"
                 size="large"
                 round/>
        <label><i class="icon-lock"></i> </label>
        <n-input v-model:value="phoneNumber" type="text" name="phoneNumber" placeholder="Номер телефону" size="large"
                 round/>
        <label><i class="icon-lock"></i> </label>
        <n-select :style="{ width: '100%' }" :options="selectOptions" v-model:value="sex"/>


      </UForm>
    </div>
  </div>

</template>

<script>
import api from "@/interceptors/axios";
import {NInput} from 'naive-ui'
import axios from "axios";
import UForm from "@/components/global/UForm.vue";
import UInput from "@/components/global/UInput.vue";

const createColumns = () => {
  return [
    {
      title: "ID",
      key: "id",
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
    // this.getProfileAdmin()
    this.onSearch()
    this.getProfileUser()
  },
  components: {
    UInput,
    UForm,
    NInput
  },
  name: "UserProfile",

  data() {
    return {
      selectOptions: ([
        {
          label: "Чоловіча",
          value: "Чоловіча",
        },
        {
          label: "Жіноча",
          value: "жіноча"
        },

      ]),
      search: false,
      searchFio: null,
      birthday: null,
      test: "text",
      insurancePolicy: null,
      placeOfResidence: null,
      sex: 'Вкажіть свою стать',
      phoneNumber: null,
      id: null,
      email: null,
      fio: null,
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
        api.get('http://65.109.235.33/api/v1/admin/myProfile', {}).then((res) => {
          this.items = res.data
          console.log(res.data)
        }).catch((error) => console.error(error))
      }
    },
    getProfileUser() {
      if (localStorage.getItem('role') === 'ROLE_USER') {
        api.get('http://65.109.235.33/api/v1/users/myProfile', {}).then((res) => {
          this.items = res.data
          console.log(res.data)
        }).catch((error) => console.error(error))
      }
    },
    deletePatientCard() {
      const token = localStorage.getItem('token')
      axios.get('http://65.109.235.33/api/v1/admin/patientCard/delete/' + this.id, {
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
        fio: this.fio,
      }
      console.log(data)

      api.post('http://65.109.235.33/api/v1/users/update', data, {}).then(() => {

        if (this.phoneNumber) {
          localStorage.removeItem('username')
          localStorage.removeItem('token')
          localStorage.removeItem('role')
          window.location.href = 'http://localhost:8080/login';
        } else {
          window.location.reload()
        }
      }).catch((error) => console.error(error))
    },
    onSearch() {
      console.log(this.searchFio)
      api.get('http://65.109.235.33/api/v1/admin/searchPatient/' + this.searchFio, {}).then((res) => {
        this.items = res.data
        console.log(res.data)
      }).catch((error) => console.error(error))
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
  font-weight: bold;
  margin: 0 auto;
  border: 1px solid black;
}

.background {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  border: 1px solid black;
  background-size: cover;
}

</style>