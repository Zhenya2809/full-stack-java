<template>
  Hello

  <n-calendar class="text_1"
              v-model:value="value"
              #="{ year, month, date }"
              :is-date-disabled="isDateDisabled"
              @update:value="handleUpdateValue"
              @click="scroll()"
  >
    {{ year }}-{{ month }}-{{ date }}
  </n-calendar>
  <!--  <p>meeting Selected: {{ meeting ? meeting : 'No Meeting selected' }}</p>-->
  <div v-if="time!==''">
    <n-gradient-text gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)" v-if="time!==''" size="77">
      PICK THE FREE TIME
    </n-gradient-text>
    <div class="cards">
      <button class="button" v-for="item in items" :key="item.time" @click="choseTime(item.time)" :disabled=attribute>
        {{ item.time }}
      </button>
    </div>
  </div>
</template>


<script>
import {isYesterday, addDays} from "date-fns/esm";
import {ref} from "vue";
import api from "@/interceptors/axios";

export default {
  setup() {
    return {
      pagination: false
    };

  },
  mounted() {
    this.checkAuthorization()

  },

  name: "CalendarAppointmentPage",

  data() {
    return {
      id: '',

      req: '',
      role: '',
      token: null,
      attribute: false,
      time: '',
      items: [{
        times: '123',
      }],
      value: ref(addDays(Date.now(), 0).valueOf()),

      isDateDisabled(timestamp) {
        if (isYesterday(timestamp)) {
          return true;
        }

        return false;
      },

    }
  },

  methods: {
    hasRole(role) {
      if (localStorage.getItem('role') === role) {
        return true
      }
    },
    handleUpdateValue(_, {year, month, date}) {
      console.log(`${year}-${month}-${date}`)
      const pickDate = (`${year}-${month}-${date}`)
      const docId = localStorage.getItem('docId')
      localStorage.setItem('date', pickDate)
      localStorage.setItem('docId', this.$route.params.id)
      api.get('http://localhost:8085/api/v1/users/appointment/' + pickDate + '/' + docId, {})
          .then((res) => {

            console.log(res.data)
            this.items = res.data
            this.time = res.data.time
            scrollBy(1400, 1400)
          }).catch((error) => console.error(error))
    },

    checkAuthorization() {
      if (localStorage.getItem('token') == null && localStorage.getItem('role') === "admin") {
        this.hideContent = false
      }
    },

    choseTime(time) {
      console.log("localstorage time set =" + time)
      localStorage.setItem('time', time)
      const docId = localStorage.getItem('docId')
      const date = localStorage.getItem('date')
      this.attribute = true
      api.get('http://localhost:8085/api/v1/users/getdate/' + docId + '/' + date + '/' + time, {})

          .then(() => {

            console.log('localstorage removed')
            localStorage.removeItem('docId')
            localStorage.removeItem('date')
            localStorage.removeItem('time')
            this.$router.push({path: '/'})


          })
    }
  },

}
</script>
<style scoped>

/*.text_1 {*/
/*  background: #2f2f60 url('https://p0.pikist.com/photos/554/795/oak-grain-wood-trim-structure-pattern-texture-background-table.jpg') ;*/
/*  margin-top: 10px;*/
/*  color: red;*/
/*}*/
/*span {*/
/*  color: black;*/
/*}*/
.button {
  scroll-behavior: smooth;
  border: none;
  border-radius: 7px;

  background: #ff9900;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  font-size: 77px;
}

.n-calendar {

  /*flex-direction: row;*/
  /*align-content: center;*/
  /*width:80%;*/

}

.cards {
  display: flex;
  flex-flow: row wrap;
  gap: 8px 12px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;

}

</style>