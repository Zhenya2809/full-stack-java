<template>
<footer>
  <p>
    {{footerText}}
  </p>
</footer>
</template>

<script>
export default {
  name: "FooterPage",
  data(){
    return{
      footerText: 'My footer'
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