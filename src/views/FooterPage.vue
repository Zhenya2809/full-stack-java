<template>
<footer >
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
  font-size: calc(var(--index) / 1.175);
  letter-spacing: calc(var(--index) / 19.5);
  margin-top: calc(var(--index) * -.75);
  transition: var(--transition);
  will-change: transform;
  text-transform: uppercase;
  font-weight: 900;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
  color: var(--text);
  text-shadow: 0 0 15px #f80202;

}
</style>