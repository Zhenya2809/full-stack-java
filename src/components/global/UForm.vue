<template>
  <div class="form-container">
    <h2>{{ formTitle }}</h2>
    <form @submit.prevent="submitForm">
      <slot></slot>
      <button type="submit">{{ formSubmitText }}</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    formTitle: {
      type: String,
      required: true
    },
    formSubmitText: {
      type: String,
      default: 'Submit'
    }
  },
  methods: {
    submitForm() {
      // handle form submission logic
      console.log('click submit button -->')
    }
  }
}
</script>

<style>
.form-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 10px;
}

input[type="text"], textarea {
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
}

button[type="submit"] {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  background-color: #6c757d;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #0c6ed5;
}
button:hover {
  background-color: #555d66;
}

button:focus {
  outline: none;
}

button:active {
  background-color: #343a40;
  transform: scale(0.95);
  transition-duration: 0.1s;
}
</style>