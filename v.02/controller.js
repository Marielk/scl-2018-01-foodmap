window.controller = {};

let comuna;

window.controller.getComuna = (selecID) =>{
  comuna = selecID;
  window.controller.showTop10(comuna);
};


window.controller.showTop10 = (comuna) => {
  window.model.getTop10(comuna);
  
};

window.showOptions = () => {
  let options = window.model.getOptions();
  window.view.printOptions(options);
};

window.chooseOption = (option) => {
  let optionChoosen = window.model.getResult(option);
  window.view.printResults(optionChoosen);
  function order(ASC){
    let result = window.model.orderResults(ASC);
    window.view.printResultsOrdered(result);
  }  
};

window.chooseRestaurant = (restaurant) => {
  let foundRestaurant = window.model.getRestaurant(restaurant);
  window.view.printRestaurant(foundRestaurant);
};
