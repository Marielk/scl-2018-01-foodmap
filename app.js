var parrafo = document.getElementById("demo");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        parrafo.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
  let latitud = position.coords.latitude ;
  let longitud = position.coords.longitude; 
  const widget = document.getElementById('widgetZomato');
  widget.src = `https://www.zomato.com/widgets/res_search_widget.php?lat=${latitud}lon=${longitud}&theme=red&sort=popularity`;
    parrafo.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
}

function guardarInput(){
	let userSearch = document.getElementById('search_input').value; 
	console.log(userSearch);   
}

const curl = new (require( 'curl-request' ))();

curl.setHeaders([
    'curl -X GET --header "Accept: application/json" --header "user-key: f7f7a4a4a441facbf11975a77711a113" "https://developers.zomato.com/api/v2.1/establishments?city_id=83&lat=-33.4454784%20&lon=-70.66091519999999"'
])
.get('https://developers.zomato.com/api/v2.1/categories')
.then(response => response.json())
.then(data => { 
		console.log(data);
		renderInfo(data);
		})

.catch((e) => {
    console.log(e);
});

function buscarRestaurant(){
		
	curl.setHeaders([
			'curl -X GET --header "Accept: application/json" --header "user-key: f7f7a4a4a441facbf11975a77711a113" "https://developers.zomato.com/api/v2.1/establishments?city_id=83&lat=-33.4454784%20&lon=-70.66091519999999"'
	])
		.get('https://developers.zomato.com/api/v2.1/establishments?city_id=83&lat=-33.4454784%20&lon=-70.66091519999999')
			.then(response => response.json())
				.then(data => { 
						console.log(data);
						renderInfo(data);
						})

			.catch((e) => {
				console.log(e);
			});

}	

		const renderInfo = (data) => {
		containerTitle.innerHTML = data.Title;
		containerYear.innerHTML = data.Year;
		containerRuntime.innerHTML = data.Runtime;
		containerImage.innerHTML = `<img src=”${data.Poster}”>`;
		}



function mostrarResultado(){

}

function buscarCercanos(){

}

function mostrarCercanos(){

}

function mostrarMapa(){
	
}