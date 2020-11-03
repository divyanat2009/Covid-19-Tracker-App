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
  getCasesResult(userInput);
  });  
}
//Get list of countries
function populateCountries(){
  countryList.forEach((country)=> {
  $("#countryInput").append(`<option value='${country}'>${country}</option>` )
  })
}

// Get Cases Result
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
.catch(err => {
	console.error(err);
});


}

function renderResult(response, userInput)
{
  $("#results").html(``);
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