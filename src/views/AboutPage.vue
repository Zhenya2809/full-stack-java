<template>
  <h1 >About Page</h1>
  <div v-if="hasRole('ROLE_USER')">
    <div class="row">
      <div class="col">{{ id }}
      </div>
      <div class="col">{{ username }}
      </div>
      <div class="col">{{ firstName }}
      </div>
      <div class="col">{{ lastName }}
      </div>
      <div class="col">{{ email }}
      </div>
    </div>
    <n-form-item label="username" path="username">
      <n-input v-model:value="id" placeholder="id"/>
    </n-form-item>
    <n-button type="info" @click="getUsers">
      GET
    </n-button>
  </div>




</template>

<script>

import axios from "axios";
import {NButton, NInput } from 'naive-ui'

export default {
  mounted() {
    this.checkAuthorization()
  },
  components: {
    NButton, NInput
  },

  name: "AboutPages",

  data() {
    return {
      token: null,
      hideContent: true,
      id: '',
      username: '',
      firstName: '',
      lastName: '',
      email: '',

    };
  },

  methods: {
    hasRole(role){
      if(localStorage.getItem('role')===role){
        return true;
      }
    },

    getUsers() {
      const token = localStorage.getItem('token')
      axios.get('http://localhost:8085/api/v1/users/' + this.id, {
        headers: {
          'Authorization': `Bearer_${token}`
        }
      }).then((res) => {
        this.id = res.data.id
        this.username = res.data.username
        this.firstName = res.data.firstName
        this.lastName = res.data.lastName
        this.email = res.data.email
        console.log(res.data)
      }).catch((error) => console.error(error))

    },

    checkAuthorization() {
      if (localStorage.getItem('token') == null&& localStorage.getItem('role')==="admin") {
        this.hideContent = false
      }
    } 
  },
}
</script>

<style scoped>
:deep(.desc) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px;
  padding: 8px;
}
:deep(.n-data-table-td) {
  padding: 10px;
}
:deep(.date) {
  max-width: 100px !important;
  padding: 8px;
}
:deep(.title) {
  max-width: 160px;
}
.textHide {
  font-size: 22px;
  max-width: 300px;
  text-align: center;
  padding: 40px;
  display: block;
}
.hideItems {
  text-align: center;
}
.col{
  font-size: 18px;
  text-align: center;
  padding: 10px;
  display: block;
}
.visibleItems{
  text-align: center;
  padding: 20px;
}
</style>