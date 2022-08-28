<template>
<footer>
  <H5>
    {{footerText}}
  </H5>
</footer>
</template>

<script>
export default {
  name: "FooterPage",
  data(){
    return{
      footerText: 'ClinicName  | 2022 Kyiv'
    }
  }
}
</script>

<style scoped>
footer{

  text-align: center;
  font-weight: bold;
  line-height: 115px;
  font-family: Arial, Helvetica, sans-serif;
  margin: 0 auto 8px;

}
</style>