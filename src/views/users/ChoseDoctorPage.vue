<template>
  <h1>Виберіть лікаря</h1>

  <div v-if="hasRole('ROLE_USER')">
    <nav class="navigation">
      <ul>
        <a v-for="item in specialitys" :key="item.docSpeciality" @click="choseDoc()">
          <router-link :to="'/choseDoctor/'+item.docSpeciality">{{ item.docSpeciality }}</router-link>
        </a>
      </ul>

    </nav>
    <div v-if="id!==''" class="cards">

      <div v-for="item in findBySpeciality" :key="item.id">
        <router-link :to="'/calendarAppointment/'+item.id" @click="saveDocId(item.id)"><p>{{ item.docSpeciality }}</p>
          <UCard :post-link="'/calendarAppointment/'+item.id"
                 :image="item.photo"
                 :title="item.firstName + ' ' +item.lastName"
                 :text="item.about"
          >

          </UCard>
        </router-link>

      </div>
    </div>
  </div>
</template>
<script>

import api from "@/interceptors/axios";
import UCard from "@/components/global/UCard.vue";

export default {
  setup() {

    return {
      pagination: false
    };

  },
  mounted() {
    this.getSpeciality()

    this.checkAuthorization()
  },
  components: {UCard},
  name: "ChoseDoctorPage",

  data() {
    return {
      id: '',
      hideContent: false,
      message: '',
      req: '',
      role: '',
      space: ' ',
      docId: '',
      token: null,
      specialitys: [{
        docSpeciality: '',
      }],
      findBySpeciality: [{
        id: '',
        firstName: '',
        lastName: '',
        speciality: '',
        about: '',
        photo: '',
      }],


    }
  },


  methods: {
    hasRole(role) {
      if (localStorage.getItem('role') === role) {
        return true
      }
    },
    saveDocId(id) {
      localStorage.setItem('docId', id)
      console.log('docId=' + id + ' add to localStorage')
    },
    choseDoc() {
      console.log('doc speciality=', this.$route.params.speciality)

      api.get('http://65.109.235.33/api/v1/users/choseDoc/' + this.$route.params.speciality, {}).then((res) => {
        this.findBySpeciality = res.data
        this.id = res.data.id
        console.log(res.data)
      }).catch((error) => console.error(error))
    },
    sendEmailReminder() {
      api.get('http://65.109.235.33/api/v1/admin/sendEmailReminder', {}).catch((error) => console.error(error))

    },
    getAllDoctor() {

      api.get('http://65.109.235.33/api/v1/users/doctors/search', {}).then((res) => {
        this.items = res.data
        console.log(res.data)
      }).catch((error) => console.error(error))
    },

    getSpeciality() {

      api.get('http://65.109.235.33/api/v1/users/doctors/getSpeciality', {}).then((res) => {
        this.specialitys = res.data
        console.log(res.data)
      }).catch((error) => console.error(error))

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
.navigation {
  display: flex;
  justify-content: center;
}

.table {

  padding: .25rem .5rem;
  font-size: .875rem;
  border-radius: .2rem;
  box-sizing: border-box;
  width: 90%;

  margin: 0 auto;
  border: 1px solid black;
}

.n-card {
  background: whitesmoke;
  border-radius: 30px;
}

.doctor-img:hover {
  /*filter: grayscale(0);*/
  transform: scale(1.1);
}


.flex-container > div {

  margin: 10px;
  padding: 20px;
  font-size: 30px;

}

.cards {

  display: flex;
  flex-wrap: wrap;
  height: 100%;
  align-items: stretch;
  margin: 0 auto;
  justify-content: center;
  word-break: break-all;


}


nav a {
  line-height: 50px;
  height: 100%;
  font-size: 15px;
  display: inline-block;
  position: relative;
  z-index: 10;
  text-align: center;
  color: #3d3d3d;
  cursor: pointer;


}


a:nth-child(1) {
  width: 110px;

}


a:nth-child(2) {
  width: 100px;

}

a:nth-child(3) {
  width: 100px;

}

a:nth-child(4) {
  width: 100px;

}

a:nth-child(5) {
  width: 110px;

}

a:nth-child(6) {
  width: 100px;

}

h2 {
  display: flex;
  justify-content: center;
  text-decoration: none;
}

a {
  text-decoration: none;
}


</style>