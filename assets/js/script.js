
let APIkey='&api_key=4170ff1b36fe7e0cb0644c2f72de1f76';
let base='https://api.themoviedb.org/3'
let today = dayjs().format('YYYY-MM-DD')
let secondurl='/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte='+today;

// today = dayjs().format('YYYY-MM-DD')

console.log(today)

let url=base+secondurl+APIkey;
function getAPI(url) {
    fetch(url)
      .then(function (response) {
        response.json().then(function (data){

         console.log(data)
        })
      });
  }

  getAPI(url);