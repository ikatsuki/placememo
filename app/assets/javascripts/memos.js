window.onload = function()
{
  pm_map.initialize();

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
  pm_map.initialize = function () {

    pm_map.map = new google.maps.Map(
      document.getElementById('map_canvas'), 
      setOption());

    pm_map.setAutoComplete(null);

  }

  /**
   * Set autocomplete feature to input fields
   * @param {Object} insertedItem 
   * @return {} 
   */
  pm_map.setAutoComplete = function (insertedItem) {
 
    var $top = insertedItem ? $(insertedItem) : $('#contents');
    var current_area = document.activeElement.closest('.collapsible-body');

    $top.find('.collapsible-body').each(function(i,e){
      // Set autocomplete to address input field 
      var $address = $(this).find('.address')[0];
      var autocomplete = new google.maps.places.Autocomplete($address);
      autocomplete.bindTo('bounds', pm_map.map);

      // Set marker on map from existing place
      var lat = $(this).find('[id$=latitude]').first().val() || null;
      var lng = $(this).find('[id$=longitude]').first().val() || null;
      var marker = createMarker(lat, lng);

      setCenterPosition(lat, lng);
 
      google.maps.event.addListener(autocomplete, 'place_changed', function() {
        pm_map.redrawGoogleMap(marker, autocomplete);
      });
    });
  
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

    var location = place.geometry.location;
    marker.setPosition(location);
    marker.setVisible(true);

    // Set value to hidden field
    setLocationToHidden(location);
  }

  /**
   * Create marker object
   * @param {Number} x latitude
   * @param {Number} y longitude 
   * @return {Object} myOptions options for google map
   */
  function createMarker(lat, lng){
    var latlng = (lat &&  lng) ? new google.maps.LatLng(lat, lng) : null;
    return new google.maps.Marker({
      map: pm_map.map,
      anchorPoint: new google.maps.Point(0, -29),
      position: latlng,
      visible: true
    });
  }

  /**
   * Set options for Google Map
   * @param {Number} x latitude
   * @param {Number} y longitude 
   * @return {Object} myOptions options for google map
   */
  function setOption(){
    var myOptions = {
      zoom: 17,
      // center: new google.maps.LatLng(x, y),
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
   * Set center postion on map
   * @param {} 
   * @return {} 
   */
  function setCenterPosition(lat, lng) {
    if (lat && lng) {
      pm_map.map.panTo(new google.maps.LatLng(lat, lng));
    } else {
      // Get present location
      navigator.geolocation.getCurrentPosition(successCallback,errorCallback);
    }
  }

  /**
   * getCurrentPosition function successed in getting current location 
   * @param {object} pos   
   * @return {} 
   */
  function successCallback(pos){
    var lat = pos.coords.latitude;
    var lng = pos.coords.longitude;

    // 位置情報が取得出来たらGoogle Mapを表示する
    setCenterPosition(lat, lng);
  }

  /**
   * getCurrentPosition function failed in getting current location 
   * @param {object} error   
   * @return {} 
   */
  function errorCallback(error){
  }

  /**
   * Set location info to hidden fields when autocomplete successed 
   * @param {object} location   
   * @return {} 
   */
  function setLocationToHidden(location){
    var current_area = document.activeElement.closest('.collapsible-body');
    var $lat = $(current_area).find('[id$=latitude]');
    var $lng = $(current_area).find('[id$=longitude]');
    $lat.val(location.lat());
    $lng.val(location.lng());
  }

})(pm_map = pm_map || {});

