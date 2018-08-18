window.view = {};
goBackToStart();
let verDatos;


window.view.printTop10 = (top10) =>{
	const placeToShow = document.getElementById('cercanosLista');
	for (let i in top10) { //i en cada uno de la lista de restaurantes cercanos
    verDatos = top10[i];
    window.model.addCounter();
    //console.log(verDatos);
    placeToShow.innerHTML += 
    `
    <ul class="list-group backlist">
    <li id="lista" class="list-group-item" style="display:inline">
        <button class="nombreRes" id=${newRestaurantID} onclick="window.model.showModal(this.id)" value=${JSON.stringify(verDatos.restaurant.name)}>${verDatos.restaurant.name}</button>
        <img src="${verDatos.restaurant.thumb}" class="profileImg">
        <p id="comuna">${JSON.stringify(verDatos.restaurant.location.address)} </p> 
        <p id="tipo"> Tipo de comida: ${JSON.stringify(verDatos.restaurant.cuisines)} </p> 
        <div id="puntajeContainer" class="container">
        <button id="puntaje" type="button" class="btn btn-success" style="background-color:#${verDatos.restaurant.user_rating.rating_color}">${JSON.stringify(verDatos.restaurant.user_rating.aggregate_rating)}</button>
        <div>
        
      </li> 
    </ul>
          ` 
      ;
      }
    
};

function mostrar(){
  const masInfo = document.getElementById('verMas');
  masInfo.style.display = 'block'; 
}

window.view.printModal = (element) => {
const newModal = document.getElementById(`${modalID}`);
newModal.style.display = "block";
  newModal.innerHTML += `
    <!-- Modal -->
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${JSON.stringify(element.restaurant.name)}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="closeButton">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      
      <p> Puntuacion: </p> <button type="button" class="btn btn-success" style="background-color:#${element.restaurant.user_rating.rating_color}">${JSON.stringify(element.restaurant.user_rating.aggregate_rating)}</button>
      <p> Calificacion: ${JSON.stringify(element.restaurant.user_rating.rating_text)} </p>                
      <p> Votos: ${JSON.stringify(element.restaurant.user_rating.votes)} </p> 
      <p> Direccion: ${JSON.stringify(element.restaurant.location.address)} </p> 
      <p> Estilo: ${JSON.stringify(element.restaurant.cuisines)} </p> 
      <p> Costo promedio por dos: ${JSON.stringify(element.restaurant.average_cost_for_two)}</p> 
      <p> Rango de precios: ${JSON.stringify(element.restaurant.price_range)} </p> 
      <button class="btn btn-success" onclick=mostrar()>Ver más +</button>
      
      <div id="verMas" style="display:none"> 
      <p><a href=${JSON.stringify(element.restaurant.url)}>Visitar sitio</a> </p> 
      <p><a href=${JSON.stringify(element.restaurant.photos_url)}>Visitar galeria de fotos</a> </p> 
      <p><a href=${JSON.stringify(element.restaurant.menu_url)}>Revisar Menús</a></p> 
      <p><a href=${JSON.stringify(element.restaurant.events_url)}>Ver eventos</a></p> 
      </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeButton2">Close</button>
      </div>
    </div>
    `;
};

function goBackToStart() {
  const splashElement = document.getElementById('splash');
  const principalElement= document.getElementById('principal');
  setTimeout(function(){
    //console.log('holi');
    splashElement.classList.add('hidden');
    splashElement.classList.remove('show');
    principalElement.classList.remove('hidden');
    principalElement.classList.add('show');
  },3000);
  showSearchArea();
}

function showSearchArea(){
  const place = document.getElementById('containerPrincipal');
  place.innerHTML += `
  <div class="row"><!--input buscador-->
    <div class="dropdown">
        <button class="btn btn-warning dropdown-toggle searchBar" type="button" data-toggle="dropdown" onclick="clearList()">Elige tu comuna
        <span class="caret"></span></button>
        <ul id="comunas" class="dropdown-menu">
          <li onclick="window.controller.getComuna(this.id)" id="Bellavista, Santiago" ><a >Bellavista</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Calera de Tango, Santiago"><a>Calera de Tango</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Cerrillos, Santiago"><a >Cerrillos</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Cerro Navia, Santiago"><a >Cerro Navia</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Colina, Santiago"><a >Colina</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="El Bosque, Santiago"><a >El Bosque</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Estación Central, Santiago"><a >Estación Central</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Huechuraba, Santiago"><a >Huechuraba</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Independencia, Santiago"><a >Independencia</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="La Cisterna, Santiago"><a>La Cisterna</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="La Florida, Santiago"><a >La Florida</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="La Granja, Santiago"><a >La Granja</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="La Pintana, Santiago"><a >La Pintana</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="La Reina, Santiago"><a >La Reina</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Las Condes, Santiago"><a >Las Condes</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Lo Barnechea, Santiago"><a >Lo Barnechea</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Lo Espejo, Santiago"><a >Lo Espejo</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Lo Prado, Santiago"><a >Lo Prado</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Macul, Santiago"><a>Macul</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Maipú, Santiago"><a >Maipú</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Padre Hurtado, Santiago"><a >Padre Hurtado</a></li>
          <li onclick="window.controller.getComuna(this.id)" onclick="window.controller.getComuna(this.id)" id="Pedro Aguirre Cerdonclick="window.controller.getComuna(this.id)" a, Santiago"><a >Pedro Aguirre Cerda</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Peñalolén, Santiago"><a >Peñalolén</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Pirque, Santiago"><a >Pirque</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Providencia, Santiago"><a >Providencia</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Pudahuel, Santiago"><a >Pudahuel</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Puente Alto, Santiago"><a >Puente Alto</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Quilicura, Santiago"><a >Quilicura</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Quinta Normal, Santiago"><a>Quinta Normal</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Recoleta, Santiago"><a >Recoleta</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Renca, Santiago"><a >Renca</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="San Bernardo, Santiago"><a >San Bernardo</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="San Joaquín, Santiago"><a >San Joaquín</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="San José de Maipo, Santiago"><a >San José de Maipo</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="San Miguel, Santiago"><a >San Miguel</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="San Ramón, Sur, Santiago"><a >San Ramón</a></li>
          <li onclick="window.controller.getComuna(this.id)"  id="Santiago Centro, Santiago"><a>Santiago Centro</a></li>
          <li onclick="window.controller.getComuna(this.id)" id="Vitacura, Santiago"><a >Vitacura</a></li>            
        </ul>
      </div>
    <input type="text" id="search_input" placeholder="Busca restaurante en tu ciudad" autocomplete="off">
    <button id="searchBtn" class="btn btn-warning"><i class="fas fa-search"></i></button>
    <div id="cercanosLista"></div>
  </div><!--cierre input buscador-->
  `;
}

function clearList(){
 const place = document.getElementById('cercanosLista');
 place.innerHTML = "";
};

window.view.printOptions= (options) =>{

};
window.view.printResults= (optionChoosen) =>{

};
window.view.printResultsOrdered= (result)=>{

};
window.view.printRestaurant= (foundRestaurant)=>{

};
