// Map via Mapbox GL



function CurrentYear() {
  var thisYear = new Date().getFullYear()
  $("#currentYear").text(thisYear);
}

var mapCoordinates = [0, 0];
var mapZoom = 2;

// the key from the Mapbox examples (not mine)
var mapAccessToken = "pk.eyJ1IjoidmllaWxsZWNhbSIsImEiOiJjajI5OXRpbHAwMTFnMzNzMXhiamkwejhoIn0.QKpnSLH9Z6T7lw0wvM8c5Q";

var map = null;
var geocoder = null;
var allMarkers = null;
var allTeamMembers = null;

function initMap() {
  map = MapGL();
}

function getAllTeamMembers() {
  return {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'properties': {
          'message': 'Foo'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [-66.324462890625, -16.024695711685304]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'message': 'Bar'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [-61.2158203125, -15.97189158092897]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'message': 'Baz'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [-63.29223632812499, -18.28151823530889]
        }
      }
    ]
  };
}

function MapGL() {
  mapboxgl.accessToken = mapAccessToken;

  allTeamMembers = getAllTeamMembers();

  // initialize map
  var newMap = new mapboxgl.Map({
    container: "map", // container id
    style: "mapbox://styles/mapbox/light-v9", //stylesheet location
    center: mapCoordinates, // starting position
    zoom: mapZoom // starting zoom
  });

  // var marker = new mapboxgl.Marker({
  //   draggable: true
  // })
  //   .setLngLat([0, 0])
  //   .addTo(newMap);

  // marker.on('dragend', onDragEnd);

  // add markers to map
  allMarkers = allTeamMembers.features.map(function (marker) {
    // create a DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundSize = 'cover';
    el.style.backgroundImage =
      'url(https://s3.us-west-2.amazonaws.com/secure.notion-static.com/cf82de13-e845-48ca-880b-d311cb88af26/0_%285%29.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200522%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200522T023528Z&X-Amz-Expires=86400&X-Amz-Signature=5451025055d1c3fc11784abc179ddacc84a2d1fc15dac8990ad008a30556dd80&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%220%2520%285%29.jpeg%22';
    el.style.width ='40px';
    el.style.height ='40px';

    el.id = marker.properties.message;

    el.addEventListener('click', function () {
      window.alert(marker.properties.message);
    });

    // add marker to map
    var marker = new mapboxgl.Marker(el, { draggable: true })
      .setLngLat(marker.geometry.coordinates);

    marker.addTo(newMap);

    return marker;
  });

  return newMap;
}

