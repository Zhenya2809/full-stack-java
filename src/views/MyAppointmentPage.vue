<template>
  <h1>Appointment Page</h1>
  <div v-if="hasRole('ROLE_USER')" >
    <n-data-table class="table"
                  :columns="columns"
                  :data="items"
                  :pagination="pagination"
                  :bordered="false"
    />
  </div>
</template>

<script>

import api from "@/interceptors/axios";

const createColumns = () => {
  return [
    {
      title: "Speciality",
      key: "doctorSpeciality",
      className: 'doctorSpeciality'
    },
    {
      title: "FirstName",
      key: "doctorFirstName",
      className: 'doctorFirstName'
    },
    {
      title: "LastName",
      key: "doctorLastName",
      minWidth: '100px'
    },
    {
      title: "Date",
      key: "date",
      className: 'date'
    },
    {
      title: "Time",
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
        doctorSpeciality: null,
        doctorFirstName: null,
        doctorLastName: null,
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
      api.get('http://localhost:8085/api/v1/users/getAppointment', {}).then((res) => {
        this.items = res.data
        console.log(res.data)
      }).catch((error) => console.error(error))
    },
  },
}
</script>

<style scoped>

</style>