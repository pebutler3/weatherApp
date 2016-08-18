/*
TODO
- Change background based on temperature
- Convert Celsius to Farhenheit
- Allow for toggling between Farhenheit & Celcius
*/


(function(){
  var apiKey = '&APPID=' + '3c4de7f072c8f76e68acb58adb321917';
  var city = document.getElementById('city');
  var description = document.getElementById('description');
  var farhrenheit = document.getElementById('temp');
  var celsiusTemp; 
  var farhrenheitTemp; 
  var farhrenheitRounded; 
  var celsiusRounded;
  var celsiusButton = document.getElementById('celsius-button');
  var farhrenheitButton = document.getElementById('farhrenheit-button');
  
  // Get coords
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    
    // data
    $.getJSON( "http://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + apiKey + '&units=imperial', function( data ) {
      var currentTemp = data.main.temp;
      var tempRounded = Math.round(currentTemp);
      var icon = document.getElementById('icon');
      var iconCode = data.weather[0].icon;
      var iconURL = '<img src="http://openweathermap.org/img/w/' + iconCode + '.png "/>';

      city.innerHTML = data.name;
      description.innerHTML = data.weather[0].description;
      farhrenheit.innerHTML = tempRounded + ' º F ';
      icon.innerHTML = iconURL;
      
      // convert to celsius     
      function toCelsius(temp) {
         celsiusTemp =  (temp - 32) * (5/9);
         celsiusRounded = Math.round(celsiusTemp);
         console.log(celsiusRounded);
         return celsiusRounded + ' º C'; 
      }
      
      celsiusButton.addEventListener('click', function(){
         farhrenheit.innerHTML = toCelsius(tempRounded);
         celsiusButton.style = 'display: none';
         farhrenheitButton.style = 'display: inline-block';
      });

      farhrenheitButton.addEventListener('click', function(){
         farhrenheit.innerHTML = tempRounded + ' º F';
         celsiusButton.style = 'display: inline-block';
         farhrenheitButton.style = 'display: none';
       });

    });

  });
  
}());