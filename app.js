
llamarDataRecoleta()
let map;
let infowindow;
let restNames=[];
let completedRestInfo = [];

/*
var parrafo = document.getElementById("demo");x
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrarMapa);
    } else {
        parrafo.innerHTML = "Geolocation is not supported by this browser.";
    }
} */


function llamarDataSantiago(){
	const santiagoJSON = 'data/santiago.json';
	fetch(santiagoJSON) 
	.then(response => response.json())
	.then(data => { 
		//obteniendo informacion de la ciudad
		let fullData = Object.entries(data);
		let info = fullData[0];
		let subArr = Object.entries(info[1]); 
		//console.log(subArr);
		let cityId = subArr[0][1].id;
	
	})
}

function llamarDataRecoleta(){
	const recoletaJSON = 'data/recoletaFullData.json';
	fetch(recoletaJSON) 
	.then(response => response.json())
	.then(data => { 
		//obteniendo informacion de cada restaurant
		let fullData = data;
		let arrOfRestaurants = fullData.restaurants;
		for (let j = 0; j < arrOfRestaurants.length; j++) {
			restNames.push(arrOfRestaurants[j].restaurant.name);
			
						restaurant = {
							nombre: arrOfRestaurants[j].restaurant.name,
							url:arrOfRestaurants[j].restaurant.url,
							ubicacion: {
								direccion: arrOfRestaurants[j].restaurant.location.address,
								comuna: arrOfRestaurants[j].restaurant.location.locality
							},
						
							estilo: arrOfRestaurants[j].restaurant.cuisines,
							costoPromedioPorDos: arrOfRestaurants[j].restaurant.average_cost_for_two,
							rangoDePrecios: arrOfRestaurants[j].restaurant.price_range, 
							fotos: arrOfRestaurants[j].restaurant.photos_url,
							menu: arrOfRestaurants[j].restaurant.menu_url,
							rating : {
								puntuacion: arrOfRestaurants[j].restaurant.user_rating.aggregate_rating,
								calificacion: arrOfRestaurants[j].restaurant.user_rating.rating_text,
								colorPuntaje: arrOfRestaurants[j].restaurant.user_rating.rating_color,
								votos: arrOfRestaurants[j].restaurant.user_rating.votes
							
							}
						}
				completedRestInfo.push(restaurant);
			}
			
			
	})
	
	
}



function llamarAPIZomato(){
	const zomato = require('zomato');
	const client = zomato.createClient({
		userKey: 'f7f7a4a4a441facbf11975a77711a113', //as obtained from [Zomato API](https://developers.zomato.com/apis)
	});
	// client.getCategories(null, function(err, result){
  //   if(!err){
  //     console.log(result);
  //   }else {
  //     console.log(err);
  //   }
	// });

	client.getEstablishments({
		city_id:"83", //id of the city for which collections are needed
		lat:"-33.4171066", //latitude
		lon:"-70.6395131" //longitude
		}, function(err, result){
				if(!err){
					console.log(result);
				}else {
					console.log(err);
				}
		});
		
	// client.getCities({
	// 	q: "santiago", //query by city name
	// 	lat:"-33.4171066", //latitude
	// 	lon:"-70.6395131", //longitude
	// 	city_ids:"1,2,3", //comma separated city_ids value
	// 	count:"2" // number of maximum result to display
	// 	}, function(err, result){
	// 			if(!err){
	// 				console.log(result);
	// 			}else {
	// 				console.log(err);
	// 			}
	// 	});
	
}




function mostrarResultado(){
	
}

// function buscarConFiltro(){
	
//DOM
const btnBuscar = document.getElementById('searchBtn');
btnBuscar.addEventListener('click', () => {
	filtrar();	
	})


let filtrar = () => {
	let userSearch = document.getElementById('search_input').value; 

	let restEncontrado = completedRestInfo.find(element =>
	element.nombre.toLowerCase() ===	userSearch.toLowerCase());

	let matchName = restNames.find(element =>
		element.toLowerCase() ===	userSearch.toLowerCase());
	
	let mostrarResultado = document.getElementById('result')
	mostrarResultado.innerHTML = `
	<!-- Button trigger modal -->
		<button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal">
			${matchName}
		</button>

		<!-- Modal -->
		<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">${JSON.stringify(restEncontrado.nombre)}</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
					
					<p> Puntuacion: </p> <button type="button" class="btn btn-success" style="background-color:#${JSON.stringify(restEncontrado.rating.colorPuntaje)}">${JSON.stringify(restEncontrado.rating.puntuacion)}</button>
          <p> Calificacion: ${JSON.stringify(restEncontrado.rating.calificacion)} </p>                
					<p> Votos: ${JSON.stringify(restEncontrado.rating.votos)} </p> 
					<p> Direccion: ${JSON.stringify(restEncontrado.ubicacion.direccion)} </p> 
					<p> Comuna: ${JSON.stringify(restEncontrado.ubicacion.comuna)} </p> 
					<p> Estilo: ${JSON.stringify(restEncontrado.estilo)} </p> 
					<p> Costo promedio por dos: ${JSON.stringify(restEncontrado.costoPromedioPorDos)}</p> 
					<p> Rango de precios: ${JSON.stringify(restEncontrado.rangoDePrecios)} </p> 
          <button class="btn btn-success" onclick=mostrar()>Ver más +</button>
					
					<div id="verMas" style="display:none"> 
					<p> Url: <a href=${JSON.stringify(restEncontrado.url)}> ${JSON.stringify(restEncontrado.url)}</a> </p> 
					<p> Fotos: <a href=${JSON.stringify(restEncontrado.fotos)}> ${JSON.stringify(restEncontrado.fotos)}</a> </p> 
					<p> Menu: <a href=${JSON.stringify(restEncontrado.menu)}>${JSON.stringify(restEncontrado.menu)}</a> </p> 
					</div>

					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
        ` ;
		

}

function mostrar(){
	const masInfo = document.getElementById('verMas');
	masInfo.style.display = 'block'; 
}

function mostrarCercanos(){
	const verCercanoBtn = document.getElementById('mostrarCercano');
	verCercanoBtn.addEventListener('click', () => {
		imprimirLista();
	})
}

function imprimirLista(){
	const placeToShow = document.getElementById('cercanosLista');

	for (let i in restNames) { //i en este caso son los cursos que hay dentro del objeto userProgress
		let element = restNames[i];
		for (let a in completedRestInfo){
			let restaurant = completedRestInfo[a];
			if(element === restaurant.nombre){
				let restEncontrado = restaurant;
				placeToShow.innerHTML += 
				`
				<ul class="list-group">
				<li id="lista" class="list-group-item" style="display:inline">
						<button type="button" class="btn btn-light" data-toggle="modal" data-target="#exampleModal" id="nombreRes">${element}</button>
						<p id="comuna">${JSON.stringify(restEncontrado.ubicacion.comuna)} </p> 
						<p id="tipo"> Tipo de comida: ${JSON.stringify(restEncontrado.estilo)} </p> 
						<div id="puntajeContainer" class="container">
						<button id="puntaje" type="button" class="btn btn-success" style="background-color:#${restEncontrado.rating.colorPuntaje}">${JSON.stringify(restEncontrado.rating.puntuacion)}</button>
						<div>
						
					</li> 
				</ul>
					<!-- Modal -->
					<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div class="modal-dialog" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="exampleModalLabel">${JSON.stringify(restEncontrado.nombre)}</h5>
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="modal-body">
								
								<p> Puntuacion: </p> <button type="button" class="btn btn-success" style="background-color:#${restEncontrado.rating.colorPuntaje}">${JSON.stringify(restEncontrado.rating.puntuacion)}</button>
								<p> Calificacion: ${JSON.stringify(restEncontrado.rating.calificacion)} </p>                
								<p> Votos: ${JSON.stringify(restEncontrado.rating.votos)} </p> 
								<p> Direccion: ${JSON.stringify(restEncontrado.ubicacion.direccion)} </p> 
								<p> Comuna: ${JSON.stringify(restEncontrado.ubicacion.comuna)} </p> 
								<p> Estilo: ${JSON.stringify(restEncontrado.estilo)} </p> 
								<p> Costo promedio por dos: ${JSON.stringify(restEncontrado.costoPromedioPorDos)}</p> 
								<p> Rango de precios: ${JSON.stringify(restEncontrado.rangoDePrecios)} </p> 
								<button class="btn btn-success" onclick=mostrar()>Ver más +</button>
								
								<div id="verMas" style="display:none"> 
								<p> Url: <a href=${JSON.stringify(restEncontrado.url)}> ${JSON.stringify(restEncontrado.url)}</a> </p> 
								<p> Fotos: <a href=${JSON.stringify(restEncontrado.fotos)}> ${JSON.stringify(restEncontrado.fotos)}</a> </p> 
								<p> Menu: <a href=${JSON.stringify(restEncontrado.menu)}>${JSON.stringify(restEncontrado.menu)}</a> </p> 
								</div>
			
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
								</div>
							</div>
						</div>
					</div>
							` 

			}
		}
	}
	
	restNames.forEach(nombre => {
		let restEncontrado = completedRestInfo.find(restaurant =>
		restaurant.nombre ===	nombre);	 
				});
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
