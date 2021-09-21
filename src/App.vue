<template>
  <div id="app">
<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </div>-->
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
