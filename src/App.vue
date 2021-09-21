<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  :root {
   --body-sidespan: -10pt; 
   }
  body{
    margin: 0;
  }

  #app {
    width: 100%;
    height: 100%;
    background-color: rgb(220, 220, 220);
    margin: 0;
  }
</style>
