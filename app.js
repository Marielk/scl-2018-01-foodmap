

let map;
let infowindow;

llamarData();
/*
var parrafo = document.getElementById("demo");x
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrarMapa);
    } else {
        parrafo.innerHTML = "Geolocation is not supported by this browser.";
    }
} */

function guardarInput(){
	let userSearch = document.getElementById('search_input').value; 
	return userSearch;   
}

function llamarData(){
	const santiagoJSON = 'data/santiago.json';
	fetch(santiagoJSON) 
	.then(response => response.json())
	.then(data => { 
		
		let fullData = Object.entries(data);
		let info = fullData[0];
		let subArr = Object.entries(info[1]); 

		console.log(subArr[0][1].id);
	})
}

function buscarRestaurant(){
	const zomato = require('zomato');
	const client = zomato.createClient({
		userKey: 'f7f7a4a4a441facbf11975a77711a113', //as obtained from [Zomato API](https://developers.zomato.com/apis)
	});
	client.getCategories(null, function(err, result){
    if(!err){
      console.log(result);
    }else {
      console.log(err);
    }
	});
		
	client.getCities({
		q: "santiago", //query by city name
		lat:"-33.4171066", //latitude
		lon:"-70.6395131", //longitude
		city_ids:"1,2,3", //comma separated city_ids value
		count:"2" // number of maximum result to display
		}, function(err, result){
				if(!err){
					console.log(result);
				}else {
					console.log(err);
				}
		});
	
}


// curl.setHeaders([
//     'curl -X GET --header "Accept: application/json" --header "user-key: f7f7a4a4a441facbf11975a77711a113" "https://developers.zomato.com/api/v2.1/establishments?city_id=83&lat=-33.4454784%20&lon=-70.66091519999999"'
// ])
// .get('https://developers.zomato.com/api/v2.1/categories')
// .then(response => response.json())
// .then(data => { 
// 		console.log(data);
// 		renderInfo(data);
// 		})

// .catch((e) => {
//     console.log(e);
// });


// function buscarRestaurant(){
// 	const curl = require( 'node-libcurl' );	
// 	curl.setHeaders([
// 			'curl -X GET --header "Accept: application/json" --header "user-key: f7f7a4a4a441facbf11975a77711a113" "https://developers.zomato.com/api/v2.1/establishments?city_id=83&lat=-33.4454784%20&lon=-70.66091519999999"'
// 	])
// 		.get('https://developers.zomato.com/api/v2.1/establishments?city_id=83&lat=-33.4454784%20&lon=-70.66091519999999')
// 			.then(response => response.json())
// 				.then(data => { 
// 						console.log(data);
// 						renderInfo(data);
// 						})

// 			.catch((e) => {
// 				console.log(e);
// 			});

// }	



function mostrarResultado(){

}

function buscarCercanos(){

}

function mostrarCercanos(){

}

function mostrarMapa(){
	// Creamos un mapa con las coordenadas actuales
	navigator.geolocation.getCurrentPosition(position => {
		let latitud = position.coords.latitude ;
  	let longitud = position.coords.longitude; 
		let currentPosition = new google.maps.LatLng(latitud, longitud);
 
		let mapSettings = {
			center: currentPosition,
			zoom: 14,
			mapTypeId: google.maps.MapTypeId.MAP
		};
 
		map = new google.maps.Map(document.getElementById('mapaHtml'), mapSettings);
 
		// Creamos el infowindow
		infowindow = new google.maps.InfoWindow();
 
		// Especificamos la localización, el radio y el tipo de lugares que queremos obtener
		let request = {
			location: currentPosition,
			radius: 5000,
			types: ['restaurant'],
		};
		// Creamos el servicio PlaceService y enviamos la petición.
		let service = new google.maps.places.PlacesService(map);
			
		service.nearbySearch(request, function(results, status) {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				for (let i = 0; i < results.length; i++) {
					crearMarcador(results[i]);
				}
	 			}
 		});
	});
  function crearMarcador(place) {
		// Creamos un marcador
		let marker = new google.maps.Marker({
			map: map,
			position: place.geometry.location,
		});
 
	// Asignamos el evento click del marcador
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(place.name);
			infowindow.open(map, this);
		});
	
	}
}