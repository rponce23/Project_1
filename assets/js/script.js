console.log('hola')
let APIkey='AIzaSyB5evgMk8i_PCEdCeg_8V9cpQDxmkPRsww';
let url=''

function getAPI(url) {
    fetch(url)
      .then(function (response) {
          if (response.ok){
                response.json().then(function (data) {
              
              });
          }
      });
  }

  //getAPI();