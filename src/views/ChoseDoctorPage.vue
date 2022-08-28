<template>
  <h1>Chose Dr.</h1>

  <div v-if="hasRole('ROLE_USER')">
    <nav>
      <ul id="example-1">
        <a v-for="item in specialitys" :key="item.docSpeciality" @click="choseDoc()">
          <router-link :to="'/choseDoctor/'+item.docSpeciality">{{ item.docSpeciality }}</router-link>
        </a>
      </ul>

    </nav>
    <div v-if="id!==''" class="cards">

      <div v-for="item in findBySpeciality" :key="item.id"  class="card">
        <router-link :to="'/calendarAppointment/'+item.id" @click="saveDocId(item.id)"><p>{{ item.docSpeciality }}</p>

          <n-card :title=item.doctorFIO >

            <img class="image" v-bind:src="item.linkPhoto" alt="doctors photo">

            <div class="text">
              {{ item.about }}
            </div>
          </n-card>

        </router-link>
      </div>
    </div>
  </div>
</template>
<script>

import api from "@/interceptors/axios";

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
  components: {},
  name: "ChoseDoctorPage",

  data() {
    return {
      id: '',
      hideContent: false,
      message: '',
      req: '',
      role: '',
      docId: '',
      token: null,
      specialitys: [{
        docSpeciality: '',
      }],
      findBySpeciality: [{
        id: '',
        doctorFIO: '',
        speciality: '',
        about: '',
        linkPhoto: '',
      }],


    }
  },


  methods: {
    hasRole(role) {
      if (localStorage.getItem('role') === role) {
        return true
      }
    },
    saveDocId(id){
      localStorage.setItem('docId', id)
      console.log('docId='+id+' add to localStorage')
    },
    choseDoc() {
      console.log('doc speciality=', this.$route.params.speciality)

      api.get('http://localhost:8085/api/v1/users/choseDoc/' + this.$route.params.speciality, {

      }).then((res) => {
        this.findBySpeciality = res.data
        this.id = res.data.id
        console.log(res.data)
      }).catch((error) => console.error(error))
    },
    sendEmailReminder() {
      api.get('http://localhost:8085/api/v1/admin/sendEmailReminder', {
      }).catch((error) => console.error(error))

    },
    getAllDoctor() {

      api.get('http://localhost:8085/api/v1/users/doctors/search', {

      }).then((res) => {
        this.items = res.data
        console.log(res.data)
      }).catch((error) => console.error(error))
    },

    getSpeciality() {

      api.get('http://localhost:8085/api/v1/users/doctors/getSpeciality', {

      }).then((res) => {
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

/*.n-card {*/
/*  border-radius: 1px;*/
/*  color: white;*/
/*}*/

/*nav {*/
/*  margin: 27px auto 0;*/

/*  position: relative;*/
/*  width: 1190px;*/
/*  height: 50px;*/
/*  background-color: #34495e;*/
/*  border-radius: 8px;*/
/*  font-size: 0;*/
/*}*/

/*nav a {*/
/*  line-height: 50px;*/
/*  height: 100%;*/
/*  font-size: 12px;*/
/*  display: inline-block;*/
/*  position: relative;*/
/*  z-index: 1;*/
/*  text-decoration: none;*/
/*  text-transform: uppercase;*/
/*  text-align: center;*/
/*  color: white;*/
/*  cursor: pointer;*/
/*}*/

/*a {*/
/*  color: white;*/
/*  text-decoration-color: red ;*/

/*}*/

/*.n-card {*/
/*  background: #2f2f60 url('http://i.imgur.com/bT2gl.png') left top;*/
/*}*/
/*.n-card-header__main{*/
/*  color: red;*/
/*}*/
/*.n-card {*/
/*  color: #ffffff;*/
/*}*/

/*nav .animation {*/
/*  position: absolute;*/
/*  height: 100%;*/
/*  top: 0;*/
/*  z-index: 0;*/
/*  transition: all .5s ease 0s;*/
/*  border-radius: 8px;*/
/*}*/

/*a:nth-child(1) {*/
/*  width: 100px;*/
/*}*/

/*a:nth-child(2) {*/
/*  width: 110px;*/
/*}*/

/*a:nth-child(3) {*/
/*  width: 100px;*/
/*}*/

/*a:nth-child(4) {*/
/*  width: 160px;*/
/*}*/

/*a:nth-child(5) {*/
/*  width: 120px;*/
/*}*/


/*body {*/
/*  font-size: 12px;*/
/*  font-family: sans-serif;*/

/*}*/

/*h1 {*/
/*  text-align: center;*/
/*  margin: 40px 0 40px;*/
/*  font-size: 30px;*/
/*  color: #ecf0f1;*/
/*  text-shadow: 2px 2px 4px #000000;*/
/*  font-family: 'Cherry Swash', cursive;*/
/*}*/


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


}

.card {
  flex: 0 0 396px;
  margin: 1px;
  border: 123px;
  position: center;


}

.text {
  align-content: center;
  background: #2b2b2c;
  height: 200px;
  color: white;


}

.card img {
  max-width: 100%;

}


</style>