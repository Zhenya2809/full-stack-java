<template>
  <button type="submit" class="form-button">
    <slot></slot>
  </button>
</template>


<script>
export default {
}
</script>


<style scoped>
button {
  width: 100%;
  font-size: 1.2rem;
  padding: 0.75rem;
  color: #fff;
  background-color: #007aff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
}

.form-button:hover,
.form-button:focus {
  background-color: #0062cc;
}
</style>