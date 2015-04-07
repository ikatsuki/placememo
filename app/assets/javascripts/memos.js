window.onload = function()
{
  // Get present location
  getLocation();

  // After place memo insert
  $('#memo_detail_places').on('cocoon:after-insert', function(e, insertedItem) {
    $(insertedItem).collapsible();

    // Set marker on present location
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    // Set autocomplete to address input field 
    $(insertedItem).find('.address').each(function(i,e){
      var autocomplete = new google.maps.places.Autocomplete($(this)[0]);
      autocomplete.bindTo('bounds', map);

      google.maps.event.addListener(autocomplete, 'place_changed', function() {
        redrawGoogleMap(map, marker, autocomplete);
      });
    });
  });

  // Disable enter key in form 
  $(document).on("keypress", "input:not(.allow_submit)", function(event) {
    return event.which !== 13;
  });

};

var map;
var markers = [];

/**
 * Initialize Google Map
 * @param {Number} x latitude
 * @param {Number} y longitude 
 * @return {}
 */
function initialize(x, y) {

  map = new google.maps.Map(
      document.getElementById('map_canvas'), 
      setOption(x,y));

    // var input = document.getElementById('place_input');
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // var search_btn = document.getElementById('search_btn');
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(search_btn);
    //
    // var add_btn = document.getElementById('add_btn');
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(add_btn);

    // Set marker on present location
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });
    marker.setPosition(new google.maps.LatLng(x, y));

    // Set autocomplete to address input field 
    $('.address').each(function(i,e){
      var autocomplete = new google.maps.places.Autocomplete($(this)[0]);
      autocomplete.bindTo('bounds', map);

      google.maps.event.addListener(autocomplete, 'place_changed', function() {
        redrawGoogleMap(map, marker, autocomplete);
      });
    });

    // var input = document.getElementById('form_memo_places_attributes_0_address');
    // var autocomplete = new google.maps.places.Autocomplete(input);
    // autocomplete.bindTo('bounds', map);


    // Add place changed event 
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

function redrawGoogleMap(map, marker,autocomplete){

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
      (place.address_components[0] && place.address_components[0].short_name)
      ].join(' ');
  }

}



