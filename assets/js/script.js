let APIkey='&api_key=4170ff1b36fe7e0cb0644c2f72de1f76';
let base='https://api.themoviedb.org/3'
let today = dayjs().format('YYYY-MM-DD')
let secondurl='/discover/movie?primary_release_date.gte=2013-04-10&primary_release_date.lte='+today;
let url=base+secondurl+APIkey;
let movieEl = document.getElementById('movies')
let imgBaseUrl = "https://image.tmdb.org/t/p/w500"
let cineBar = document.getElementById('navbar')
let routingAPIkey = 'IWlwFtnFKKA6voxvGd7uWEcCNXeuXtI4'
let geoUrl = "https://api.tomtom.com/search/2/geocode/monterrey.json?key=IWlwFtnFKKA6voxvGd7uWEcCNXeuXtI4&entityTypeSet=Municipality&countrySet=MX"
let btnEl = document.getElementById('btn')
let inputEl = document.querySelector('input')
let city;
let APIroutes = "S4UzPeG7IlMqPo9isVNMWntTGfEr5s0Y"
let urlRoutes;
let urlRoutesAPI;
let lat;
let lon;
let center;
let map;
let storedCities = JSON.parse(localStorage.getItem("city"));
let array=[];
let cities = document.getElementById('cities');


//if local storage not null, create a button element for each of the stored cities
if (storedCities !== null) {
  array=storedCities;
  for(let i=0; i<storedCities.length; i++){ 
    cities.innerHTML+=`<button class="bg-slate-700 rounded-lg my-2 py-1 text-white hover:opacity-75" id="${storedCities[i]}">${storedCities[i]}</button>` 
}  
}

//used to know which of the cities has been selected
cities.addEventListener("click", function(event){ 
  if(event.target !== event.currentTarget){ 
      city = event.target.id; 
      geoUrl = "https://api.tomtom.com/search/2/geocode/"+city+".json?key=IWlwFtnFKKA6voxvGd7uWEcCNXeuXtI4&entityTypeSet=Municipality&countrySet=MX"
      tomtomGeocoding(geoUrl)
  }
})


btnEl.addEventListener('click',function(){
    if(inputEl.value!==''){
      console.log(inputEl.value)
      city=inputEl.value;
      inputEl.value='';
      geoUrl = "https://api.tomtom.com/search/2/geocode/"+city+".json?key=IWlwFtnFKKA6voxvGd7uWEcCNXeuXtI4&entityTypeSet=Municipality&countrySet=MX"
      tomtomGeocoding(geoUrl)
    } else {
      $('#modal').removeClass('invisible')

      $('#deactivate').on("click", function(){
        $('#modal').addClass('invisible')
      })
    }
    
})


function tomtomGeocoding(geoUrl) {
  fetch(geoUrl)
    .then(function (response) {
      response.json().then(function (data){
      console.log(data.results[0].position.lat)
      console.log(data.results[0].position.lon)
      lat=data.results[0].position.lat;
      lon=data.results[0].position.lon;
      urlRoutes= "https://api.tomtom.com/search/2/categorySearch/cinema.json?key=S4UzPeG7IlMqPo9isVNMWntTGfEr5s0Y&lat="+lat+"&lon="+lon+"&radius=4000";
      tomtomAPI(urlRoutes);
     
      center=[lon,lat];
      map = tt.map({
        key:APIroutes,
        container:"map",
        center: center,
        zoom: 10
      })
      })
    });
}


function TMDB(url) {
    fetch(url)
      .then(function (response) {
        response.json().then(function (data){
         console.log(data)
         displayMovies(data.results)
        })
      });
}


function displayMovies(movies){
for(let i=0; i<movies.length;i++){
  movieEl.innerHTML+=`
                      <div class="flex">
                        <img class="rounded-xl h-80 my-5 hover:shadow-2xl hover:opacity-80" src="${imgBaseUrl+movies[i].poster_path}"/>
                        <div class="mx-5 my-5 flex flex-col justify-around">
                          <h3 class="font-sans font-bold text-2xl">${movies[i].title}</h3>
                          <p><span class="font-bold">Rating: </span>${movies[i].vote_average}</p>
                          <div>
                            <p class="font-bold">Summary</p>
                            <p>${movies[i].overview}</p>
                          </div>
                        </div>
                      </div>`
  }
}
TMDB(url);

const options = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;

  lat=crd.latitude;
  lon=crd.longitude;
  reverseGeocodingUrl = "https://api.tomtom.com/search/2/reverseGeocode/"+lat+","+lon+".json?key=S4UzPeG7IlMqPo9isVNMWntTGfEr5s0Y&radius=100"
  reverseGeocoding(reverseGeocodingUrl);
  urlRoutes= "https://api.tomtom.com/search/2/categorySearch/cinema.json?key=S4UzPeG7IlMqPo9isVNMWntTGfEr5s0Y&lat="+lat+"&lon="+lon+"&radius=4000";
  tomtomAPI(urlRoutes);
  center = [lon,lat]
    map = tt.map({
    key:APIroutes,
    container:"map",
    center: center,
    zoom: 10
  })
}


function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);


function tomtomAPI(urlRoutes) {
    fetch(urlRoutes)
      .then(function (response) {
        response.json().then(function (data){
          console.log(data.results)
          if(!array.includes(city)){
            array.push(city)
            localStorage.setItem("city", JSON.stringify(array))
            storedCities = JSON.parse(localStorage.getItem("city"))
            cities.innerHTML=''
            for(let i=0; i<storedCities.length; i++){
                cities.innerHTML+=`<button class="bg-slate-700 rounded-md my-2 text-white hover:opacity-75" id="${storedCities[i]}">${storedCities[i]}</button>`
            } 
          }
          cinemaBar(data.results)
          map.on('load', ()=>{
            new tt.Marker().setLngLat(center).addTo(map)
            for(let i =0; i<data.results.length;i++){
              let name = data.results[i].poi.name
              let name2= name.slice(0,10)
              if(name2 !== 'Mm Cinemas'){
                new tt.Popup().setLngLat([data.results[i].position.lon,data.results[i].position.lat+0.002]).setText(data.results[i].poi.name+' '+((data.results[i].dist)/1000).toFixed(2)+'Km').addTo(map)
                new tt.Marker().setLngLat([data.results[i].position.lon,data.results[i].position.lat]).addTo(map)
            }
          }
        })
        })
      });
  }


function reverseGeocoding(url) {
  fetch(url)
    .then(function (response){
      response.json().then(function (data){
        console.log(data.addresses[0].address.municipality)
        city=data.addresses[0].address.municipality;
      })
    });
}
  
  
function cinemaBar(cinema){
  let arr = [];
  cineBar.innerHTML=''
  for(let i=0; i<cinema.length; i++){  
    if(cinema[i].poi.url && !arr.includes(cinema[i].poi.url)){
      arr.push(cinema[i].poi.url)
      console.log(cinema[i].poi.url)
      cineBar.innerHTML+=`<a target="_blank" href="https://${cinema[i].poi.url}"><button class="bg-slate-700 px-5 text-white mx-5 my-5 rounded-md py-1 hover:opacity-75">${cinema[i].poi.name}</button></a>`
    }
  }
}
 