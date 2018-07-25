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



