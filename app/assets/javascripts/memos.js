window.onload = function()
{
  getLocation();
};


/**
 * Initialize Google Map
 * @param {Number} x latitude
 * @param {Number} y longitude 
 * @return {}
 */
function initialize(x, y) {
    var map = new google.maps.Map(
      document.getElementById('map_canvas'), 
      setOption(x,y));

    var input = document.getElementById('place_input');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var search_btn = document.getElementById('search_btn');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(search_btn);

    var add_btn = document.getElementById('add_btn');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(add_btn);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });
    marker.setPosition(new google.maps.LatLng(x, y));


    google.maps.event.addListener(autocomplete, 'place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) return;

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    
    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });
}

/**
 * Set options for Google Map
 * @param {Number} x latitude
 * @param {Number} y longitude 
 * @return {Object} myOptions options for google map
 */
function setOption(x, y){
  var myOptions = {
    zoom: 17,
    center: new google.maps.LatLng(x, y),
    mapTypeId: google.maps.MapTypeId.ROADMAP, 
    disableDefaultUI: true,
    panControl: true,
    panControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    }
  };
  return myOptions;
}

/**
 * Create LatLng object 
 * @param {Number} x  latitude
 * @param {Number} y  longitude 
 * @return {Object} latlng  LatLng object 
 */
function setLatlng(x, y){
  var latlng = new google.maps.LatLng(x, y);
  return latlng;
}

/**
 * Get current location
 * @param {} 
 * @return {} 
 */
function getLocation(){
  navigator.geolocation.getCurrentPosition(successCallback,errorCallback);
}

/**
 * getCurrentPosition function succeeded in getting current location 
 * @param {object} pos   
 * @return {} 
 */
function successCallback(pos){
  var Potition_latitude = pos.coords.latitude;
  var Potition_longitude = pos.coords.longitude;

  // 位置情報が取得出来たらGoogle Mapを表示する
  initialize(Potition_latitude,Potition_longitude);
}

/**
 * getCurrentPosition function failed in getting current location 
 * @param {object} error   
 * @return {} 
 */
function errorCallback(error){

}



