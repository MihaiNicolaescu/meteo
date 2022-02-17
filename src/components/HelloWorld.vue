<template>
  <div class="MeteoMe">
    <div class="container">
      <h1 style="color: white; font-family:Merriweather">Meteo Me</h1>
      <h3 style="color: white; font-family:Merriweather">Today forecast<br>{{this.location_name}} </h3>
      <p style="color: white;" v-if="gradeType === 0" class="grades">{{kelvin_celsius()}}°C</p>
      <p style="color: white;" v-else class="grades">{{kelvin_fahranheit()}}°F</p>
      <img v-bind:src="require('../assets/' +this.weather_id + '.gif')"><br>
      <button v-on:click="change_grades_type()" class="btn btn-success button-toggle">{{this.button_name}}</button>
    </div>
  </div>
</template>

<script>

import axios from "axios"

export default {
  name: 'MeteoMe',
  props: {
    msg: String
  },
  data: function(){
    return{
      button_name: "Fahranheit",
      gradeType: 0,
      longitude: null,
      latitude: null,
      temperature: null,
      location_name: null,
      weather_id: null,
    }
  },
  methods:{
    kelvin_celsius: function (){
      return Math.ceil(this.temperature - 273);
    },
    kelvin_fahranheit: function(){
      let celsius = this.kelvin_celsius();
      return Math.ceil(9/5 * celsius + 32);
    },
    change_grades_type: function(){
      if(this.gradeType === 0){
        this.gradeType = 1;
        this.button_name = "Celsius";
      }else{
        this.gradeType = 0;
        this.button_name = "Fahrenheit";
      }
    }
  },
  created: function(){
    console.log("Trimit request pentru a prelua datele meteo...");

    const success = (position) =>{
       console.log(position.coords.latitude);
       this.latitude = position.coords.latitude;
       console.log(position.coords.longitude);
       this.longitude = position.coords.longitude;

       //axios.get("api.openweathermap.org/data/2.5/weather?lat=" + this.latitude + "&lon="+ this.longitude + "&appid=e9e3f5fb8b79c3b1f55a4c48b8e028bf")
        axios.get("http://api.openweathermap.org/data/2.5/weather?lat=" + this.latitude + "&lon="+ this.longitude +"&appid=e9e3f5fb8b79c3b1f55a4c48b8e028bf")
       .then((response) =>{
         console.log(response.data);
         this.temperature = response.data.main.temp;
         this.location_name = response.data.name;
         this.weather_id = response.data.weather[0].main;
       }).catch((err) => {
         console.log(err);
       })
    }

    const error = (err) => {
      console.log(err);
    }

    navigator.geolocation.getCurrentPosition(success,error);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.grades{
  font-size: 70px;
  margin-bottom: -20px;
  font-weight: bold;
  font-family: Merriweather;
}
.button-toggle{
  width: 103px;
}

@font-face {
  font-family: Merriweather;
  src: url("../assets/Merriweather-BoldItalic.ttf");
}
</style>
