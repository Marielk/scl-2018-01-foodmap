
windows.showTop10 = (comuna) => {
  let top10 = windows.model.getTop10(comuna);
  windows.view.printTop10(top10);
};

windows.showOptions = () => {
  let options = windows.model.getOptions();
  windows.view.printOptions(options);
};

windows.chooseOption = (option) => {
  let optionChoosen = windows.model.getResult(option);
  windows.view.printResults(optionChoosen);
  function order(ASC){
    let result = windows.model.orderResults(ASC);
    windows.view.printResultsOrdered(result);
  }  
};

windows.chooseRestaurant = (restaurant) => {
  let foundRestaurant = windows.model.getRestaurant(restaurant);
  windows.view.printRestaurant(foundRestaurant);
};

windows.closeModal = () =>{
  windows.view.printClose(); 
}