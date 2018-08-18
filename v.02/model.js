window.model = {};

let top10;
let options = []; 
let result = [];
let orderResults = [];
let restaurant= [];
let fullData; 
let counter = 0;
let newRestaurantID;
let matchRestaurant;
let modalID;

window.model.getTop10 = (comuna) =>{
	fetch('data/comunasData.json') 
	.then(response => response.json())
	.then(data => { 
		//obteniendo informacion de completa de cada comuna
    fullData = data;
    const comunas = fullData.comunas;
    //console.log(fullData);
    let foundZone = comunas.find(element => element.title === comuna);
    //console.log(foundZone);
    top10 = foundZone.best_rated_restaurant;
    //console.log(top10);
    window.view.printTop10(top10);
  });
};

window.model.addCounter = () =>{
 counter++;
 newRestaurantID = "newRestaurant" + counter;
}; 

window.model.showModal = (restID) =>{
 let btn = document.getElementById(restID); 
 let name = document.getElementById(restID).value; 
 matchRestaurant = top10.find(element => element.restaurant.name === name);
 //console.log(matchRestaurant);
 createModal(); 
 window.view.printModal(matchRestaurant);

 document.getElementById('closeButton').addEventListener('click', () => {
 closeModal();
 cleanModal();
});

document.getElementById('closeButton2').addEventListener('click', () => {
  closeModal();
  cleanModal();
 });
 

};

function createModal(){
  //crear elemento modal 
  const placeToShow = document.getElementById('cercanosLista');
  const newModal = document.createElement('div');
  placeToShow.appendChild(newModal);
  newModal.className = "modal";
  newModal.id = "modal" + counter;
  modalID = newModal.id;
  
}

function closeModal(){
  const newModal = document.getElementById(`${modalID}`);
  newModal.style.display = "none";

}

function cleanModal(){
  const newModal = document.getElementById(`${modalID}`);
  newModal.innerHTML = "";
}


window.model.getOptions = () =>{

};
window.model.getResult= (option) =>{

};

window.model.orderResults = (ASC) =>{

};
window.model.getRestaurant = (restaurant) =>{

};
