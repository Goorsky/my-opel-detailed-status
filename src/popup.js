function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", "https://my.opel.pl/api/auth/sso.do", true); // true for asynchronous
    xmlHttp.send(null);
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
  var months = ['styczeń','luty','marzec','kwiecień','maj','czerwiec','lipiec','sierpień','wrzesień','październik','listopad','grudzień'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + ' ' + month + ' ' + year ;
  return time;
}

function read_status(number) {
    switch(number) {
      case '20':
        var status = '20. Przyjęcie zamówienia';
        break;
      case '21':
        var status = '21. Przetworzenie zamówienia';
        break;
      case '25':
        var status = '25. Ustawienie zamówienia do produkcji';
        break;
      case '30':
        var status = '30. Oczekiwanie na zwolnienie do produkcji';
        break;
      case '32':
        var status = '32. Zwolnienie do produkcji';
        break;
      case '33':
        var status = '33. Przyjęcie do produkcji przez fabrykę';
        break;
      case '35':
        var status = '35. Samochód na linii produkcyjnej';
        break;
      case '38':
        var status = '38. Samochód wyprodukowany';
        break;
      case '40':
        var status = '40. Samochód przekazany do sprzedazy';
        break;
      case '42':
        var status = '42. Samochód opuścił bramy fabryki';
        break;
      case '43':
        var status = '43. Samochód na centralnym składzie dystrybucyjnym';
        break;
      case '44':
        var status = '44. Samochód wysłany do Polski';
        break;
      case '48':
        var status = '48. Samochód na składzie w Polsce';
        break;
      case '49':
        var status = '49. Samochód wysłany do dealera';
        break;
      case '58':
        var status = '58. Samochód dojechał do dealera';
        break;
      case '60':
        var status = '60. Samochód sprzedany.';
        break;
      default:
        var status = 'Nieznany';
  }
  return status;
}

function reload_vehicles(vehicles)
{
  var html = ''
  var el = document.getElementById('vehicles');

  vehicles.forEach(function(vehicle) {
    var time = timeConverter(vehicle.vehicleDetail.creationDate);
    var name = vehicle.vehicleDetail.make + ' ' + vehicle.vehicleDetail.model + ' (' + time + ')';
    var status = read_status(vehicle.vehicleDetail.lastVehicleEvent);

    html += '<tr>' + '<td>' + name  + '</td>' + '<td>' + status + '</td>' + '</tr>';

    // console.log(name);
    // console.log(status);

    // console.log(vehicle)
  });

  el.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
  httpGetAsync('https://my.opel.pl/api/auth/sso.do', function(res) { reload_vehicles(JSON.parse(res).userProfile.vehicleProfiles) });
});




