/*
let APIkey='&api_key=4170ff1b36fe7e0cb0644c2f72de1f76';
let base='https://api.themoviedb.org/3'
let today = dayjs().format('YYYY-MM-DD')
let secondurl='/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte='+today;

// today = dayjs().format('YYYY-MM-DD')

//console.log(today)

let url=base+secondurl+APIkey;
function getAPI(url) {
    fetch(url)
      .then(function (response) {
        response.json().then(function (data){

        // console.log(data)
        })
      });
  }

  getAPI(url);
*/
let APIroutes = "S4UzPeG7IlMqPo9isVNMWntTGfEr5s0Y"
let urlRoutes;//"https://api.tomtom.com/map/1/sprite/20.0.0-8/metadata.json?key=S4UzPeG7IlMqPo9isVNMWntTGfEr5s0Y" 
//urlRoutes="https://api.tomtom.com/search/2/nearbySearch/.json?key=S4UzPeG7IlMqPo9isVNMWntTGfEr5s0Y&lat=24.815&lon=-107.39"

let lat;
let lon;
const options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;
  
  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(crd.latitude)
  lat=crd.latitude;
  lon=crd.longitude;
  urlRoutes= "https://api.tomtom.com/search/2/categorySearch/cinema.json?key=S4UzPeG7IlMqPo9isVNMWntTGfEr5s0Y&lat="+lat+"&lon="+lon;
  tomtomAPI(urlRoutes);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);


function tomtomAPI(urlRoutes) {
    fetch(urlRoutes)
      .then(function (response) {
        response.json().then(function (data){

        console.log(data)
        })
      });
  }

  let center = [-107.39,24.815]
  const map = tt.map({
    key:APIroutes,
    container:"map",
    center: center,
    zoom: 10
  })
  map.on('load', ()=>{
    new tt.Marker().setLngLat(center).addTo(map)
  })

  console.log(window)

