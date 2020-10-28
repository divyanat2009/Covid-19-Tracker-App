const mapbox_token="pk.eyJ1IjoiZGl2eWFuYXQyMDA5IiwiYSI6ImNrZ3NjZW9mbTBhdmMyd3J6OGp2czNiZnAifQ.MGN9qZ3Mku6-FSlgJqgbEQ";
const url="https://api.covid19api.com/country/${userInput}/status/confirmed"

function init(){
  populateCountries();
}
function submitForm(){
  $("#app-form").submit(e=>{
      e.preventDefault();
  const userInput= $("#countries").val();  
  getCasesResult(userInput);
  });  
}
function populateCountries(){
  countryList.forEach((country)=> {
  $("#countries").append(`<option>${country}</option>` )
  })
}
function formatQueryParams(){
  const queryItems= Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)  
  return queryItems.join("&");
}

function getCasesByCountry(){
  fetch(url)
  .then(response =>response.json())
  .then(response => renderCountryResults(response.data))
  .catch(err =>alert(err));
}
function renderCountryResults(countryList){
  countryList.forEach(country=>{
      $("#results").append(`${country.Cases}`)
  })
}

$(init);        