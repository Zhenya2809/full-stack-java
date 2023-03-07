<template>
  <h1>Appointments MENU </h1>
  <div v-if="hasRole('ROLE_DOCTOR')">
    <n-data-table class="table"
                  :columns="columns"
                  :data="items"
                  :pagination="pagination"
                  :bordered="false"
    />
  </div>


    <UModal :show="showModal"
            @update:show="showModal = $event"
            @click.self="showModal=false">
      <h1>Картка пацієнта</h1>

      <div class="middle">
      <UForm
          @submit.prevent="save(this.id,this.clientID,this.doctorID)"
          form-title="Заповніть картку пацієнта"
          formSubmitText="Прийняти зміни "
      >
        <h4> Діагноз
          <UInput
              v-model="diagnosis"
              modelValue="diagnosis"
              type="textarea"
          />
        </h4>
        <h4> Рекомендації
          <UInput
              v-model="recommendations"
              modelValue="recommendations"
              type="textarea"
          />
        </h4>
        <h4> Симптоми
          <UInput
              v-model="symptoms"
              modelValue="symptoms"
              type="textarea"
          />
        </h4>
        <h4> Лікування
          <UInput
              v-model="treatment"
              modelValue="treatment"
              type="textarea"
          />
        </h4>

      </UForm>
      </div>
    </UModal>


</template>

<script>
import {NButton, NDataTable} from "naive-ui";
import api from "@/interceptors/axios";
import {h, ref} from "vue";
import UForm from "@/components/global/UForm.vue";
import UModal from "@/components/global/UModal.vue";
import UInput from "@/components/global/UInput.vue";

const createColumns = ({
                         onSubmit,
                       }) => {
  return [

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

    {
      title: "ФІО пацієнта",
      key: "patientFIO",
      className: 'patientFIO',
    },

    {
      title: "Edit",
      key: "edit",
      render(row) {
        return h(
            NButton,
            {
              size: "small",
              onClick: () => {
                onSubmit(row)
              }
            },
            {default: () => "Edit"}
        );
      }
    },
  ];
};

export default {
  name: "AppointmentsUserForDoctorPage",
  components: {
    UInput,
    UModal,
    UForm,
    NDataTable,
  },
  setup() {
    let showModal = ref(false);
    let id = ref("")
    let doctorID = ref("")
    let clientID = ref("")
    let diagnosis = ref("")
    let recommendations = ref("")
    let symptoms = ref("")
    let treatment = ref("")


    return {
      // Додати .... до об'єкту, який повертається
      showModal,
      id,
      diagnosis,
      recommendations,
      symptoms,
      treatment,
      doctorID,
      clientID,
      columns: createColumns({
        onSubmit(rowData) {
          showModal.value = true;
          id.value = rowData.doctorAppointmentsID;
          clientID.value = rowData.clientID;
          doctorID.value = rowData.doctorID;
          console.log('appointment id=' + id.value);
          console.log('client id=' + clientID.value)
          console.log('doctor id=' + doctorID.value)
          // console.log('data,time ='+date.value, time.value);
        },
      }),
      pagination: false
    };
  },
  mounted() {
    this.checkAuthorization()
    this.getAppointment()
  },


  data() {
    return {
      items: [{
        date: null,
        time: null,
        doctorSpeciality: null,
        doctorFirstName: null,
        doctorLastName: null,
        doctorAppointmentsID: null,
        clientID: null,
        doctorID: null,
        patientFIO: null,

      }],
    }
  },

  methods: {
    save(id, clientID, doctorID) {
      console.log(id);
      console.log(clientID);
      console.log(doctorID);
      const data = {
        diagnosis:this.diagnosis,
        recommendations:this.recommendations,
        symptoms:this.symptoms,
        treatment:this.treatment,
        clientID: this.clientID,
        doctorID:this.doctorID,
      }
      console.log(data)
      api.post('http://65.109.235.33/api/v1/doctor/treatment', data, {}).then(response => {

        this.message = response.data.result
        window.location.href = 'http://localhost:8080/treatment';
      })
    },
    hasRole(role) {
      if (localStorage.getItem('role') === role) {
        return true;
      }
    },
    checkAuthorization() {
      if (localStorage.getItem('token') == null && localStorage.getItem('role') === "admin") {
        this.hideContent = false
      }
    },
    getAppointment() {
      api.get('http://65.109.235.33/api/v1/doctor/appointments', {}).then((res) => {
        this.items = res.data
        console.log(res.data)

      }).catch((error) => console.error(error))
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

  margin: 0 auto;
  border: 1px solid black;
}
.middle {
   padding-top: 50px;
   width: 800px;
   margin: 0 auto;
 }

</style>