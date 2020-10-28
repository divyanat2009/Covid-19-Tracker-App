const mapbox_token="pk.eyJ1IjoiZGl2eWFuYXQyMDA5IiwiYSI6ImNrZ3NjZW9mbTBhdmMyd3J6OGp2czNiZnAifQ.MGN9qZ3Mku6-FSlgJqgbEQ";
mapboxgl.accessToken = mapbox_token;
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/dark-v10',
zoom:1.5,
});

const url="https://api.covid19api.com/country/${userInput}/status/confirmed"

function init(){
  populateCountries();
  submitForm();
}
function submitForm(){
  $("#app-form").submit(e=>{
      e.preventDefault();
  const userInput= $("#countryInput").val();  
  //console.log(userInput);
  getCasesResult(userInput);
  });  
}
function populateCountries(){
  countryList.forEach((country)=> {
  $("#countryInput").append(`<option>${country}</option>` )
  })
}
function formatQueryParams(params){
  const queryItems= Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)  
  return queryItems.join("&");
}
function getCasesResult(query){
  const params={
    from: $('#from').val(),
    to: $('#to').val()
};

const queryString= formatQueryParams(params);
const searchURL= url + '?' + queryString;
console.log(searchURL);
fetch(searchURL)
  .then(response =>response.json())
  .then(response => renderCountryResults(response.length))
  .catch(err =>alert(err));
}
function renderCountryResults(countryList){
  countryList.forEach(country => {
    $("#results").empty();
    $("#results").append(`${country.Cases}`)
  })
}

$(init);        