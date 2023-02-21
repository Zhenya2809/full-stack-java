<template>
  <div class="calendar">
  <n-calendar class="text_1"
              @click="showModal = true"
              v-model:value="value"
              #="{ year, month, date }"
              :is-date-disabled="isDateDisabled"
              @update:value="handleUpdateValue"
  >
    {{ year }}-{{ month }}-{{ date }}
  </n-calendar>
  </div>
  <div v-if="time!==''">


      <div>
        <div v-if="showModal" class="modal" @click.self="showModal=false">

          <div class="modal-content">
            <div>
              <p>Виберіть вільний час для запису</p>
            </div>

            <button class="button" v-for="item in items" :key="item.time" @click="choseTime(item.time)" :disabled=attribute>
              {{ item.time }}
            </button>
          </div>
        </div>
      </div>

  </div>

</template>


<script>
import {addDays} from "date-fns/esm";
import {ref} from "vue";
import api from "@/interceptors/axios";

export default {
  setup() {
    const showModal = ref(false);
    return {
      showModal,
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
        const selectedDate = new Date(timestamp);
        const today = new Date();
        today.setDate(today.getDate() - 1);
        return selectedDate < today;

      }

    }
  },

  methods: {
    hasRole(role) {
      if (localStorage.getItem('role') === role) {
        return true
      }
    },
    scroll() {
      setTimeout(() => {
        var dialog = document.querySelector('dialog');
        document.querySelector('#openDialog').onclick = function () {
          dialog.show();
        }
        document.querySelector('#closeDialog').onclick = function () {
          dialog.close();
        }
      }, 150)
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
            // scrollBy(0, 823)
            // window.location.href = '#id2';
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


.text {
  display: flex;
  justify-content: center;
}

.text_1 {
  color: #070707;
}

.button {
  scroll-behavior: smooth;
  border: none;
  border-radius: 7px;
  display: block;
  margin-bottom: 10px;
  background: #888888;
  cursor: pointer;
  font-weight: bold;
  color: white;
  font-size: 40px;


  display: flex;
  margin-bottom: 10px;
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
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: white;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  justify-items: center;
}
.closeButton{
  position: absolute;
  bottom: 600px;
  left: 50%;
  transform: translateX(-50%);
}
.calendar{
  margin-left: 650px;
  margin-right: 650px;
}

</style>