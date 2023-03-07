<template>

  <div class="center">
    {{ items.id }}
    <UCard
        :image="items.photo"
        :title="items.firstName + ' ' + items.lastName"
    >
      <button class="buttright" @click="showModal=true">EDIT</button>
    </UCard>
    <div class="about">
      {{ items.about }}
    </div>
  </div>
  <div>
    <UModal :show="showModal"
            @update:show="showModal = $event"
            @click.self="showModal=false">
      <h1>Редагування інформації про мене</h1>
      <p>Інформація буде перевірена адміністратором.</p>

      <UForm
          @submit.prevent="save(this.about)"
          form-title="Введіть інформацію про себе"
          formSubmitText="Прийняти зміни "
      >
        <p>
          <UInput
              v-model="about"
              modelValue="YYYY-MM-DD"
              type="text"
          />
        </p>

      </UForm>

    </UModal>
  </div>
</template>

<script>
import api from "@/interceptors/axios";
import UCard from "@/components/global/UCard.vue";
import {ref} from "vue";
import UModal from "@/components/global/UModal.vue";
import UForm from "@/components/global/UForm.vue";
import UInput from "@/components/global/UInput.vue";

export default {
  setup() {
    let showModal = ref(false);
    let about = ref("")
    return {
      showModal,
      about,
    };
  },
  mounted() {
    this.getProfileDoctor()
  },
  components: {UInput, UForm, UModal, UCard},
  name: "DoctorProfilePage",

  data() {
    return {

      items: [{
        id: null,
        fistName: null,
        lastName: null,
        speciality: null,
        about: null,
        photo: null,
      }],
    }
  },

  methods: {
    save(about){

      const data = {
        id: this.items.id,
        fistName: this.items.fistName,
        lastName: this.items.lastName,
        speciality: this.items.speciality,
        about:this.about,
        photo: this.items.photo,

      }
      console.log(about)
      console.log(data)
      api.post('http://65.109.235.33/api/v1/doctor/updateDrInformation',data,{}).then(response =>{
        this.req = response.data
        this.message = response.data.result
        window.location.href = 'http://localhost:8080/doctorProfilePage';
      })
    },
    edit() {
      console.log("sosi")
    },
    hasRole(role) {
      if (localStorage.getItem('role') === role) {
        return true;
      }
    },
    getProfileDoctor() {
      if (localStorage.getItem('role') === 'ROLE_DOCTOR') {
        api.get('http://65.109.235.33/api/v1/doctor/loadDoctorProfile', {}).then((res) => {
          this.items = res.data
          console.log(res.data)

        }).catch((error) => console.error(error))
      }
    },
  }
}
</script>

<style scoped>
.center {
  display: flex;
  justify-content: space-between;
  margin-left: 400px;
}

.buttright {
  background-color: #008cba;
  color: #fff;
  width: 250px;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.buttright:hover {
  transform: scale(1.1);
}

.buttright:focus {
  outline: none;
  transform: scale(1.2);
}

.center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.about {
  margin-left: 340px;
}
</style>