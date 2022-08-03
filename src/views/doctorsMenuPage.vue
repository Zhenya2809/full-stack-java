<template>
  <h1>Doctors MENU </h1>

  <div v-if="hasRole('ROLE_ADMIN')">
    <n-data-table class="table"
                  :columns="columns"
                  :data="items"
                  :pagination="pagination"
                  :bordered="false"
    />
    <n-form-item class="form-control" path="id">
      <n-input class="even-row-color" v-model:value="id" placeholder="id"/>
    </n-form-item>
    <n-button type="error" @click="deleteDoctors">
      DELETE
    </n-button>
    <n-form-item class="form-control" path="id">
      <n-input class="even-row-color" v-model:value="doctorFIO" placeholder="doctor fio"/>
    </n-form-item>
    <n-form-item class="form-control" path="id">
      <n-input class="even-row-color" v-model:value="speciality" placeholder="speciality"/>
    </n-form-item>
    <n-form-item class="form-control" path="id">
      <n-input class="even-row-color" v-model:value="about" placeholder="about"/>
    </n-form-item>
    <n-form-item class="form-control" path="id">
      <n-input class="even-row-color" v-model:value="linkPhoto" placeholder="link to photo"/>
    </n-form-item>
    <n-button type="success" @click="saveDoctor()">
      SAVE
    </n-button>


  </div>
  <div v-if="hasRole('ROLE_USER')">Доступ запрещен-----> USER_ROLE иди нахуй</div>
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
      title: "Doctors FIO",
      key: "doctorFIO"
    },
    {
      title: "Speciality",
      key: "speciality"
    },
    {
      title: "About",
      key: "about"
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
      doctorFIO: '',
      speciality: '',
      about: '',
      linkPhoto: '',
      message: '',
      req: '',
      role: '',
      token: null,
      items: [{
        id: '',
        doctorFIO: '',
        speciality: '',
        about: '',
        linkPhoto: '',
      }]
    }
  },

  methods: {
    deleteDoctors() {
      const token = localStorage.getItem('token')
      axios.get('http://localhost:8085/api/v1/admin/doctors/delete/' + this.id, {
        headers: {
          'Authorization': `Bearer_${token}`
        }
      }).then((res) => {
        this.id = res.data.id
        console.log(res.data.id)
        window.location.href = 'http://localhost:3000/doctorsMenu';
      }).catch((error) => console.error(error))

    },
    getAllDoctor() {
      const token = localStorage.getItem('token')
      axios.get('http://localhost:8085/api/v1/admin/doctors/search', {
        headers: {
          'Authorization': `Bearer_${token}`
        }
      }).then((res) => {
        this.items = res.data
        console.log(res.data)
      }).catch((error) => console.error(error))

    },
    saveDoctor() {
      const data = {
        doctorFIO: this.doctorFIO,
        speciality: this.speciality,
        about: this.about,
        linkPhoto: this.linkPhoto

      }
      console.log(data)
      const token = localStorage.getItem('token')
      axios.post('http://localhost:8085/api/v1/admin/saveDoctor', data, {
        headers: {
          'Authorization': `Bearer_${token}`
        }
      }).then(response => {
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
  background-color: #FFFFFF32;
}
.table > tbody > tr > td:first-child { white-space: nowrap; }

.even-row-color {
  width: 30%;
  height: 30px;
  display: block;

  margin: 0 auto;
  border: 1px solid black;
  background-color: #FFFFFF32;

}

</style>