<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  :root {
   --body-sidespan: -10pt;
   }
  body{
    margin: 0;
  }

  #app{
    background-color: #f6f2f2;
  }
</style>
