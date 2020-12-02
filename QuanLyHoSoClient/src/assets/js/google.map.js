// google map
// (function($) {
// "use strict";
//     function initialize()
//     {
//       var mapProp = {
//         center:new google.maps.LatLng(51.521989,-0.120964),
//         zoom:12,
//         scrollwheel: false,
//         navigationControl: false,
//         mapTypeControl: false,
//         scaleControl: false,
//         draggable: false,
//         mapTypeId:google.maps.MapTypeId.ROADMAP
//       };
//       var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
//     };
//     google.maps.event.addDomListener(window, 'load', initialize);
// })(jQuery);
// end google map

window.onload = function () {
  "use strict";
  var styles =  [
    {
      stylers: [
        { "hue": '0' }, 
        { "saturation": -50 }, 
        { "visibility": "simplified" },
        { "lightness": 0 }, 
        { "gamma": 0 } 
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 95 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];  

  var myLatLng = {lat: 51.506000, lng: -0.129000};

  var options = {  
  mapTypeControlOptions: {  
      mapTypeIds: ['Styled']  
  },  
      //center: new google.maps.LatLng(51.501000,-0.130000),
      center: myLatLng,
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      draggable: true,
      //mapTypeId:google.maps.MapTypeId.ROADMAP,
      zoom: 13,  
      disableDefaultUI: true,   
      mapTypeId: 'Styled'  
  };  
  var div = document.getElementById('googleMap');
  var map = new google.maps.Map(div, options);  
  var styledMapType = new google.maps.StyledMapType(styles, { name: 'Styled' });  
  map.mapTypes.set('Styled', styledMapType); 
 
  var marker = new google.maps.Marker({
    position: {lat: 51.509000, lng: -0.129000},
    map: map,
    //title: 'Hello World!',
    // icon: '../img/elements/marker.png'
  });
};  