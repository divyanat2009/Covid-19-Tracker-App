//Generate the MapBox
const mapbox_token="pk.eyJ1IjoiZGl2eWFuYXQyMDA5IiwiYSI6ImNrZ3NjZW9mbTBhdmMyd3J6OGp2czNiZnAifQ.MGN9qZ3Mku6-FSlgJqgbEQ";
mapboxgl.accessToken = mapbox_token;
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/dark-v10',
zoom:1.5,
});

// Generate the URL
const url="https://api.covid19api.com/country/${userInput}/status/confirmed"
//Initialize the function
function init(){
  $( "#from" ).datepicker();
  $( "#to" ).datepicker();
  populateCountries();
  submitForm();  
}
//Create a watch to prevent form submission
function submitForm(){
  $("#app-form").submit(e=>{
    e.preventDefault();
  const userInput= $("#countryInput").val();  
  const fromDateInput= $('#from').val();
  const toDateInput= $('#to').val();
  getCasesResult(userInput, fromDateInput, toDateInput);
  });  
}
//Get list of countries
function populateCountries(){
  countryList.forEach((country)=> {
  $("#countryInput").append(`<option value='${country}'>${country}</option>` )
  })
}
//Format the query parameters
function formatQueryParams(params){
  const queryItems= Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)  
  return queryItems.join("&");
}
// Get Cases Result
function getCasesResult(userInput, fromDateInput, toDateInput){
  const url=`https://api.covid19api.com/country/${userInput}/status/confirmed`;  
  const params={
    from: fromDateInput,
    to: toDateInput
};

const queryString= formatQueryParams(params);
const searchURL= url + '?' + queryString;
fetch(searchURL)
  .then(response =>response.json())
  .then(response => renderCountryResults(response))
  .catch(err =>alert(err));
}
// Render the results
function renderCountryResults(countryList){
    $("#results").empty();    
    let totalCount = getTotalCount(countryList);
    $("#results").append(`<h3>Total confirmed cases: ${totalCount}</h3>`);
    //Create marker on map
    let lon = getLonLat(countryList, "Lon")
    let lat = getLonLat(countryList, "Lat")
    mapboxgl.accessToken = mapbox_token;
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom:1.5,
    });    
    var marker = new mapboxgl.Marker({
      color: "red"
    })
    .setLngLat([lon, lat])
    .addTo(map);
}  
//Generate marker for each country
function getLonLat(countryList, value){
  return parseFloat(countryList[0][`${value}`]);
}
//Get total cases count
function getTotalCount(countryList){
  let totalCount = 0;
  countryList.forEach(country => {
  totalCount +=  country.Cases;    
  }) 
  return totalCount;   
}
$(init);        