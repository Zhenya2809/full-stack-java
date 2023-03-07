<template>
  <div class="modal" v-if="localShow">
    <div class="modal-content">
      <button class="close" @click="closeModal"> &times;</button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Modal Title'
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 300
    }
  },
  methods: {
    closeModal() {
      this.$emit('update:show', false);
    }
  },
  computed: {
    localShow: {
      get() {

        console.log('modal window is '+this.show)

        return this.show;
      },
      set(newValue) {
        this.$emit('update:show', newValue);
      }
    },
  },

}
</script>

<style>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 20px;
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
}

.modal.show {
  display: block;
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>