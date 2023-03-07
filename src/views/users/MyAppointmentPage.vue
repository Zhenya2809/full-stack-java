<template>
  <h1>Мої записи до лікаря</h1>
  <div v-if="hasRole('ROLE_USER')" class="background">
    <n-data-table class="table"
                  :columns="columns"
                  :data="items"
                  :pagination="pagination"
                  :bordered="false"
                  :striped="true"
    />
  </div>
</template>

<script>

import api from "@/interceptors/axios";

const createColumns = () => {
  return [
    {
      title: "Спеціальність",
      key: "doctorSpeciality",
      className: 'doctorSpeciality'
    },
    {
      title: "Ім'я",
      key: "doctorFirstName",
      className: 'doctorFirstName'
    },
    {
      title: "Призвіще",
      key: "doctorLastName",
      minWidth: '100px'
    },
    {
      title: "Дата",
      key: "date",
      className: 'date'
    },
    {
      title: "Час",
      key: "time",
      className: 'time',

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
    this.getAppointment()

  },
  components: {},
  name: "MyAppointmentPage",
  data() {
    return {
      items: [{
        date: null,
        time: null,
        speciality: null,
        firstName: null,
        lastName: null,
      }],
    }
  },
  methods: {
    hasRole(role) {
      if (localStorage.getItem('role') === role) {
        return true
      }
    },

    getAppointment() {
      api.get('http://65.109.235.33/api/v1/users/getAppointment', {}).then((res) => {
        this.items = res.data
        console.log(res.data)
      }).catch((error) => console.error(error))
    },
  },
}
</script>

<style scoped>
.background {

  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  background-color: #605f5f;
}

.table{
  border-collapse: collapse;
  width: 100%;
  /*font-weight: bold;*/
  font-weight: bolder;
  font-size: .875rem;
  border-radius: .2rem;
  box-sizing: border-box;

  margin: 0 auto;
  border: 1px solid black;

}
</style>