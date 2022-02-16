// API key for openweather
var apiKey = '1edbd52810e61eeac63123b5b8ffe328';
// let icon = ""
// let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

document.addEventListener('DOMContentLoaded', bindButtons);
// asynchronous call to the Open Weather Map API using city and country code
function bindButtons(){
  document.getElementById('citySubmit').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    var city = document.getElementById('cityName').value;
    var country = 'US'
    req.open("GET", 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&units=imperial' + '&appid=' + apiKey, true);
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        console.log(response);
        document.getElementById('cityReturn').textContent = response.name;
        document.getElementById('descReturn').textContent = response.weather[0].description;
        document.getElementById('tempResult').textContent = response.main.temp + "\xB0";
        document.getElementById('humidResult').textContent = response.main.humidity + "%";
        document.getElementById('windDirResult').textContent = response.wind.deg+ "\xB0";
        document.getElementById('windSpeedResult').textContent = response.wind.speed + " MPH";
        let icon = response.weather[0].icon
        let iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`
        let iconEL = document.getElementById('iconEl').setAttribute("src",iconUrl)
      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send(null);
    event.preventDefault();
  })
}

function validZip(str){
  let zip = /^\d{5}$/
  return zip.test(str)
}





