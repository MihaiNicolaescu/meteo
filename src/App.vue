<template>
  <div id="app">
    <MeteoMe/>
  </div>
</template>

<script>
import MeteoMe from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    MeteoMe
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
