"use strict";
//Global Variable
const url = `https://rapidapi.p.rapidapi.com/statistics`;

//Generate the MapBox
const mapbox_token="pk.eyJ1IjoiZGl2eWFuYXQyMDA5IiwiYSI6ImNrZ3NjZW9mbTBhdmMyd3J6OGp2czNiZnAifQ.MGN9qZ3Mku6-FSlgJqgbEQ";
mapboxgl.accessToken = mapbox_token;
function generateMap(){
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/dark-v10',
zoom:1.5,
});
return map;
}
//Initialize the function
function init(){
  populateCountries();
  submitForm();   
  $("#results").hide();  
  generateMap();
}

//Create a watch to prevent form submission
function submitForm(){
  $("#app-form").submit(e=>{
  if(e.cancelable)    
  e.preventDefault();
  const userInput= $("#countryInput").val();  
  const lonLatURL = `https://api.covid19api.com/country/${userInput}/status/confirmed/live?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z`
  //Get longitude and latitude of countries from API   
  fetch(lonLatURL)
  .then (response => response.json())
  .then(response => {
  (response[0].Lat, response[0].Lon);   
  let map = generateMap();
  //Add marker on map
  const marker = new mapboxgl.Marker()
  .setLngLat([parseFloat(response[0].Lon), parseFloat(response[0].Lat)])
  .addTo(map);
  })
  getCasesResult(userInput);
  });  
}

function getRequest(url,cb){
  fetch(url, {
  "method": "GET",
  "headers": {
  "x-rapidapi-key": "997b4b4b44mshffb7d7452a7563ap1d23d6jsn758cf6f706f3",
  "x-rapidapi-host": "covid-193.p.rapidapi.com"
  }
  })
  .then(response => response.json())
  .then(response =>cb(response))    
}

//Get list of countries
function populateCountries(){
  const countriesURL = "https://covid-193.p.rapidapi.com/countries";
  getRequest(countriesURL, function(result){
  result.response.forEach((country)=> {
  $("#countryInput").append(`<option value='${country}'>${country}</option>`)
  })     
  }); 
}
//Get Cases Result
function getCasesResult(userInput){  
  fetch(url, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "997b4b4b44mshffb7d7452a7563ap1d23d6jsn758cf6f706f3",
		"x-rapidapi-host": "covid-193.p.rapidapi.com"
	}
  })
  .then(response => response.json())
  .then(response =>{
  renderResult(response, userInput);
  })
  .catch(err => {alert(err);
  });
}
//Render the results
function renderResult(response, userInput){
  $("#results-list").html(``);
  $("#results").show();
  let countryData = response.response.find(x=> x.country == userInput);    
  $("#results-ist").append(`<h4>View Info: </h4>`);    
  Object.entries(countryData).forEach(([k,v])=> {
    if(k == "cases"){
      Object.entries(countryData.cases).forEach(([k,v])=> {
      $("#results-list").append(`<h5>${k} : ${v} </h5>`);
      });
      return;
      }
      else if(k == "deaths"){
      Object.entries(countryData.deaths).forEach(([k,v])=> {
      $("#results-list").append(`<h5>${k} : ${v} </h5>`);
      });
      return;
      }
      if(k == "tests"){
      Object.entries(countryData.tests).forEach(([k,v])=> {
      $("#results-list").append(`<h5>${k} : ${v} </h5>`);
      });
      return;
      }
      $("#results-list").append(`<h5>${k} : ${v} </h5>`);
    })    
}
$(init);        