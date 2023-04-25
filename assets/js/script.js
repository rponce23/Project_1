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
let urlRoutes;
let urlRoutesAPI;
let lat;
let lat1
let lon;
let lon1;
let center;
let map;

const options = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;

  lat=crd.latitude;
  lon=crd.longitude;
  urlRoutes= "https://api.tomtom.com/search/2/categorySearch/cinema.json?key=S4UzPeG7IlMqPo9isVNMWntTGfEr5s0Y&lat="+lat+"&lon="+lon+"&radius=4000";
  tomtomAPI(urlRoutes);
  center = [lon,lat]
  console.log(lon+","+lat+":52.50274,13.43872");
  //urlRoutesAPI = "https://api.tomtom.com/routing/1/calculateRoute/"+lon+","+lat+":52.50274,13.43872/json?instructionsType=text&language=en-US&vehicleHeading=90&sectionType=traffic&report=effectiveSettings&routeType=eco&traffic=true&avoid=unpavedRoads&travelMode=car&vehicleMaxSpeed=120&vehicleCommercial=false&vehicleEngineType=combustion&key=IWlwFtnFKKA6voxvGd7uWEcCNXeuXtI4";
  //tomtomRoutes(urlRoutesAPI);
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

let routingAPIkey = 'IWlwFtnFKKA6voxvGd7uWEcCNXeuXtI4'

  function tomtomRoutes(urlRoutesAPI) {
    fetch(urlRoutesAPI)
      .then(function (response) {
        response.json().then(function (data){

        console.log(data)
        })
      });
  }



