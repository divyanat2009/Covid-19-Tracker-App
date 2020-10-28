const mapbox_token="pk.eyJ1IjoiZGl2eWFuYXQyMDA5IiwiYSI6ImNrZ3NjZW9mbTBhdmMyd3J6OGp2czNiZnAifQ.MGN9qZ3Mku6-FSlgJqgbEQ";
mapboxgl.accessToken = mapbox_token;
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/dark-v10',
zoom:1.5,
center:[0,20]
});

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
function getCasesResult(query){
  const params={
    from: $('#from'),
    to: $('#to')
};
const queryString= formatQueryParams(params);
const searchURL= url + '?' + queryString;
fetch(searchURL)
  .then(response =>response.json())
  .then(response => renderCountryResults(response.data))
  .catch(err =>alert(err));
}
function renderCountryResults(countryList){
  countryList.forEach(country => {
    $("#results").empty();
    $("#results").append(`${country.Cases}`)
  })
}

$(init);        