"use strict"
//Generate the MapBox
const mapbox_token="pk.eyJ1IjoiZGl2eWFuYXQyMDA5IiwiYSI6ImNrZ3NjZW9mbTBhdmMyd3J6OGp2czNiZnAifQ.MGN9qZ3Mku6-FSlgJqgbEQ";
mapboxgl.accessToken = mapbox_token;
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/dark-v10',
zoom:1.5,
});

//Initialize the function
function init(){
  populateCountries();
  submitForm();  
}
//Create a watch to prevent form submission
function submitForm(){
  $("#app-form").submit(e=>{  
  e.preventDefault();
  const userInput= $("#countryInput").val();  
  fetch(`https://api.covid19api.com/country/${userInput}/status/confirmed/live?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z`)
  .then (response => response.json())
  .then(response => {
    console.log(response[0].Lat, response[0].Lon);
    const mapbox_token="pk.eyJ1IjoiZGl2eWFuYXQyMDA5IiwiYSI6ImNrZ3NjZW9mbTBhdmMyd3J6OGp2czNiZnAifQ.MGN9qZ3Mku6-FSlgJqgbEQ";
mapboxgl.accessToken = mapbox_token;
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/dark-v10',
zoom:1.5,
});
    var marker = new mapboxgl.Marker()
.setLngLat([response[0].Lon, response[0].Lat])
.addTo(map);
  })
  getCasesResult(userInput);
  });  
}
function getRequest(url){
  
}
//Get list of countries
function populateCountries(){
  fetch("https://covid-193.p.rapidapi.com/countries", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "997b4b4b44mshffb7d7452a7563ap1d23d6jsn758cf6f706f3",
      "x-rapidapi-host": "covid-193.p.rapidapi.com"
    }
  })
  .then(response => response.json())
  .then(response =>
    {
    
    
      response.response.forEach((country)=> {
        $("#countryInput").append(`<option value='${country}'>${country}</option>` )
        })        
    }).catch(err =>alert(err)); 
}
//Get Cases Result
function getCasesResult(userInput){
const url=`https://rapidapi.p.rapidapi.com/statistics`;  

fetch(url, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "997b4b4b44mshffb7d7452a7563ap1d23d6jsn758cf6f706f3",
		"x-rapidapi-host": "covid-193.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(response =>
  {
    renderResult(response, userInput);
  })
.catch(err => {alert(err);
});
}

function renderResult(response, userInput)
{
  $("#results").html(``);
  $("#results").removeClass("hidden");
  let countryData = response.response.find(x=> x.country == userInput);    
  $("#results").append(`<h4>View Info: </h4>`);    
  Object.entries(countryData).forEach(([k,v])=> {
    if(k == "cases")
      {
       Object.entries(countryData.cases).forEach(([k,v])=> {
       $("#results").append(`<h5>${k} : ${v} </h5>`);
       });
      return;
      }
      else if(k == "deaths")
      {
        Object.entries(countryData.deaths).forEach(([k,v])=> {
        $("#results").append(`<h5>${k} : ${v} </h5>`);
        });
        return;
      }
      if(k == "tests")
      {
        Object.entries(countryData.tests).forEach(([k,v])=> {
        $("#results").append(`<h5>${k} : ${v} </h5>`);
        });
        return;
      }
      $("#results").append(`<h5>${k} : ${v} </h5>`);
    })    
}
$(init);        