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
    <div v-if="showModal" class="modal" @click.self="showModal=false">
      <div class="modal-content">
        <div class="modal-title">
          <p>Виберіть вільний час для запису</p>
        </div>
        <div class="modal-button">
          <button class="button" v-for="item in items" :key="item.time" @click="choseTime(item.time)"
                  :disabled=attribute>
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
      api.get('http://65.109.235.33/api/v1/users/appointment/' + pickDate + '/' + docId, {})
          .then((res) => {

            console.log(res.data)
            this.items = res.data
            this.time = res.data.time
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
      api.get('http://65.109.235.33/api/v1/users/getdate/' + docId + '/' + date + '/' + time, {})

          .then(() => {

            console.log('localstorage removed')
            localStorage.removeItem('docId')
            localStorage.removeItem('date')
            localStorage.removeItem('time')
            this.$router.push({path: '/myAppointment'})


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
}

.modal {
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.39);
}

.modal-content {
  background-color: white;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
  justify-items: center;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
}
.modal-button button {
  width: 27%;
  max-width: 27%;
  margin-left: 3%;
  margin-right: 3%;
}
.modal-button {
  display: flex;
  flex-wrap: wrap;
  /*justify-content: space-between;*/
}
.modal-content div {
  order: 1;
  min-width: 100%;
  width: 100%;
  text-align: center;
}

.modal-content .button {
  width: calc(50%);
  display: flex;
  justify-content: center;
}

.calendar {
  margin-left: 100px;
  margin-right: 100px;
  flex-direction: row;
  align-content: center;
  width:80%;
}

</style>