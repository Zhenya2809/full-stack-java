<!--<script setup>-->
<!--import {computed, defineProps, watch, defineEmits,ref} from 'vue'-->
<!--let value = ref(modelValue)-->
<!--const emits = defineEmits(['update:modelValue'])-->
<!--watch(value, () =>{-->
<!--  emits('update:modelValue', value);-->
<!--})-->
<!--const {modelValue} = defineProps({-->
<!--  modelValue: Array,-->
<!--  label: String-->
<!--})-->

<!--const uploadFile = (e) => {-->
<!--  const [file] = e.target.files;-->
<!--  value = file;-->
<!--}-->
<!--const previewFilePath = computed(() => {-->
<!--  if (value?.type) {-->
<!--    return URL.createObjectURL(value)-->
<!--  }-->
<!--})-->
<!--</script>-->
<!--<template>-->
<!--  <div class="mb-3 mt-3">-->
<!--    <input-->
<!--        class="form-label"-->
<!--        type="file"-->
<!--        @change="uploadFile">-->
<!--    <img :src="previewFilePath" alt="" class="w-100 mt-2" >-->
<!--  </div>-->
<!--</template>-->


<!--<style scoped>-->

<!--</style>-->