window.onload = function()
{
  // Get present location
  pm_map.getLocation();

  // After place memo insert
  $('#memo_detail_places').on('cocoon:after-insert', function(e, insertedItem) {
    $(insertedItem).collapsible();

    pm_map.setAutoComplete(insertedItem);
  });

  // Disable enter key in form 
  $(document).on("keypress", "input:not(.allow_submit)", function(event) {
    return event.which !== 13;
  });

};


var pm_map = pm_map || {}; // ancestor namespace

(function (pm_map) { // namespace

  pm_map.map = (function () {
    return {
    };
  })();


  /**
   * Initialize Google Map
   * @param {Number} x latitude
   * @param {Number} y longitude 
   * @return {}
   */
  function initialize(x, y) {

    pm_map.map = new google.maps.Map(
      document.getElementById('map_canvas'), 
      setOption(x,y));

    pm_map.setAutoComplete(null);
  }

  pm_map.setAutoComplete = function (insertedItem) {
 
    var $top = insertedItem ? $(insertedItem) : $('#contents');

    // Set marker on present location
    var marker = new google.maps.Marker({
      map: pm_map.map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    // Set autocomplete to address input field 
    $top.find('.address').each(function(i,e){
      var autocomplete = new google.maps.places.Autocomplete($(this)[0]);
      autocomplete.bindTo('bounds', pm_map.map);

      google.maps.event.addListener(autocomplete, 'place_changed', function() {
        pm_map.redrawGoogleMap(marker, autocomplete);
      });
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
  pm_map.getLocation = function (){
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

  /**
   * Redraw map
   * @param {object} error   
   * @return {} 
   */
  pm_map.redrawGoogleMap = function (marker,autocomplete){

    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) return;

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      pm_map.map.fitBounds(place.geometry.viewport);
    } else {
      pm_map.map.setCenter(place.geometry.location);
      pm_map.map.setZoom(17);
    }

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

  }

})(pm_map = pm_map || {});

