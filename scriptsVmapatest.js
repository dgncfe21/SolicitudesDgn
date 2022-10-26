
    
const config = {
    apiKey: "AIzaSyC_ROBKehTPhZpkars16n2hitQCYAQ91F8",
    authDomain: "mit05245.firebaseapp.com",
    databaseURL: "https://mit05245-default-rtdb.firebaseio.com",
    projectId: "mit05245",
    storageBucket: "mit05245.appspot.com",
    messagingSenderId: "352565116482",
    appId: "1:352565116482:web:50593f4f287128e3f877db",
    measurementId: "G-QT0M1FXL25"
  };
  


firebase.initializeApp(config);




// counter for online cars...
var cars_count = 0;
var pedidos_count = 0;
var colorConductor = "#00023";
// markers array to store all the markers, so that we could remove marker when any car goes offline and its data will be remove from realtime database...
var markers = [];
var conductoresArray = [];

var markersPedidos = [];
var map;

var numDeltas = 100;
var delay = 10; //milliseconds
var i = 0;
var deltaLat;
var deltaLng;
var position = [25.69674558, -100.31683811]; //lat lon CEID

var datos;

function initMap() { // Google Map Initialization... 
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: new google.maps.LatLng(25.69674558, -100.31683811),
        mapTypeId: google.maps.MapTypeId.ROADMAP

       
    });

  
/////////



// var polygoneCoords10 = [



// ];
// var myPolygon10 = new google.maps.Polygon({
//      paths: polygoneCoords10,
//      strokeColor: '#FF0000',
//      strokeOpacity: 0.8,
//      strokeWeight: 3,
//      fillColor: '#FFF2F2',
//      fillOpacity: 0.35
//    });
// myPolygon10.setMap(map);


                                                                                                                                                                                                                                                          
// UBICACIONES DE LAS ETIQUETAS PARA CADA CICLO
// var locations = [
//     ['<h4>CICLO 1</h4>',25.66254989, -100.36057456],
//     ['<h4>CICLO 2</h4>', 25.45938991, -100.18694948],
//     ['<h4>CICLO 4</h4>', 25.47810458, -100.20594307],
//     ['<h4>CICLO 4</h4>', 25.46896727, -100.19614621],
//     ['<h4>CICLO 5</h4>',25.42467660, -100.15773731],
//     ['<h4>CICLO 6</h4>',25.49989076, -100.18570054],
//     ['<h4>CICLO 7</h4>',25.41395300, -100.16675562],
//     ['<h4>CICLO 8</h4>',25.45057339, -100.15624507],
//     ['<h4>CICLO 10</h4>',25.47914054, -100.17657275],
//     ['<h4>CICLO 12</h4>',25.47755914, -100.16967927],
//     ['<h4>CICLO 13</h4>',25.40814765, -100.16139086],
//     ['<h4>CICLO 13</h4>',25.39355429, -100.13959122],
//     ['<h4>CICLO 14</h4>',25.51417481, -100.18727794],
//     ['<h4>CICLO 15</h4>',25.38235899, -100.16009326],
//     ['<h4>CICLO 15</h4>',25.35715111, -100.16619197],
//     ['<h4>CICLO 16</h4>',25.51558007, -100.22691955],
//     ['<h4>CICLO 17</h4>',25.37503354, -100.15025058],
//     ['<h4>CICLO 17</h4>',25.40489994, -100.14357886],
//     ['<h4>CICLO 18</h4>',25.49327454, -100.19494751],
//     ['<h4>CICLO 18</h4>',25.45088949, -100.16473781],
//     ['<h4>CICLO 20</h4>',25.51723171, -100.21360859],
//     ['<h4>CICLO 20</h4>',25.51803678, -100.20408746],
//     ['<h4>CICLO 21</h4>',25.40193298, -100.13281690],
//     ['<h4>CICLO 22</h4>',25.44051975, -100.16820888],
//     ['<h4>CICLO 23</h4>',25.40140551, -100.13466598],
//     ['<h4>CICLO 24</h4>',25.48315005, -100.18483436],
//     ['<h4>CICLO 24</h4>',25.50585119, -100.19590449],
//     ['<h4>CICLO 25</h4>',25.38874652, -100.12662899],
//     ['<h4>CICLO 27</h4>',25.38399871, -100.13053800],
//     ['<h4>CICLO 27</h4>',25.39225780, -100.12067626],
//     ['<h4>CICLO 28</h4>',25.39309119, -100.12485695],
//     ['<h4>CICLO 27</h4>',25.36089445, -100.10599312],
//     ['<h4>CICLO 29</h4>',25.38120709, -100.11942326],
//     ['<h4>CICLO 30</h4>',25.40982915, -100.13774068],
//     ['<h4>CICLO 33</h4>',25.38801227, -100.11440449],
//     ['<h4>CICLO 33</h4>',25.35345430, -100.08384606],
//     ['<h4>CICLO 34</h4>',25.40115577, -100.12547462],
//     ['<h4>CICLO 34</h4>',25.42260429, -100.14727426],
//     ['<h4>CICLO 35</h4>',25.36251243, -100.10447787],
//     ['<h4>CICLO 37</h4>',25.52998721, -100.20406039],
//     ['<h4>CICLO 38</h4>',25.35888487, -100.39957594],
//     ['<h4>CICLO 38</h4>',25.37401001, -100.22790375]
//   ];
  
//   var iconURLPrefix = 'iconos/';
  
//   var icons = [
//     iconURLPrefix + 'c.png'
    // iconURLPrefix + 'green-dot.png',
    // iconURLPrefix + 'blue-dot.png',
    // iconURLPrefix + 'orange-dot.png',
    // iconURLPrefix + 'purple-dot.png',
    // iconURLPrefix + 'ltblue-dot.png',      
    // iconURLPrefix + 'yellow-dot.png'
//   ]
//   var iconsLength = icons.length;

 

//   var infowindow2 = new google.maps.InfoWindow({
//     maxWidth: 150
//   });

//   var markers1 = new Array();
//   var iconCounter = 0;
  
//   // Add the markers and infowindows to the map
//   for (var i = 0; i < locations.length; i++) {  
//     var marker1 = new google.maps.Marker({
//       position: new google.maps.LatLng(locations[i][1], locations[i][2]),
//       map: map,
//       icon: icons[iconCounter]
//     });

//     markers1.push(marker1);

//     google.maps.event.addListener(marker1, 'click', (function(marker1, i) {
//       return function() {
//         infowindow2.setContent(locations[i][0]);
//         infowindow2.open(map, marker1);
//       }
//     })(marker1, i));
    
//     iconCounter++;
    // We only have a limited number of possible icon colors, so we may have to restart the counter
//     if(iconCounter >= iconsLength) {
//         iconCounter = 0;
//     }
//   }

//   function autoCenter() {
    //  Create a new viewpoint bound
    // var bounds = new google.maps.LatLngBounds();
    //  Go through each...
    // for (var i = 0; i < markers1.length; i++) {  
    //           bounds.extend(markers1[i].position);
    // }
    //  Fit these bounds to the map
//     map.fitBounds(bounds);
//   }
//   autoCenter();


///////////////AQUI TERMINA BLOQUE PARA ETIQUETAS DE CICLOS//////////////////////////


map.data.loadGeoJson('http://10.4.90.66:81/JsonFiles/CIclosZonaOrienteColor.json');
map.data.setStyle({
  fillColor:'#1CC5DC',
  strokeColor:'blue',
  strokeWeight: 2
});


var infowindow = new google.maps.InfoWindow();
			
			map.data.addListener('click', function(event) {
			  let ciclo = event.feature.getProperty("CICLO");
			  let html = 'CICLO: ' + ciclo; // combine state name with a label
			  infowindow.setContent(html); // show the html variable in the infowindow
			  infowindow.setPosition(event.latLng); // anchor the infowindow at the marker
			  infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)}); // move the infowindow up slightly to the top of the marker icon
			  infowindow.open(map);
			});
//AQUI FINALIZA EL MAPA
} 




function transition(result, data) {
    datos = data.val();
    console.log("data Mombre: " + datos);
    i = 0;
    deltaLat = (result[0] - position[0]) / numDeltas;
    deltaLng = (result[1] - position[1]) / numDeltas;
    moveMarker();
}

function moveMarker() {
    console.log("Move Markerr Mombre: " + datos.nombre);
    position[0] += deltaLat;
    position[1] += deltaLng;


    //var latlng = new google.maps.LatLng(position[0], position[1]);

    var longlat = [position[1], position[0]];
    //marker.setTitle("Latitude:"+position[0]+" | Longitude:"+position[1]);
    //marker.setPosition(latlng);

    // marker.setLngLat(longlat)
    // marker.addTo(map);


    if (i != numDeltas) {
        i++;
        setTimeout(moveMarker, delay);
    }
}


// This Function will create a car icon with angle and add/display that marker on the map
function AddMarkerConductor(data) {
    let conductor = data;


    let urlIcon = (conductor.situacion == "Disponible") ? 'medidor1.png' : 'medidor1.png';
    var result = [parseFloat(conductor.latitud), parseFloat(conductor.longitud)];
    //transition(result,data)

    //#region marker e icono

    var icon = { // car icon

        url: urlIcon,
        //path: 'M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805',
        // scale: 0.6,
        scaledSize: new google.maps.Size(30, 30),
        fillColor: colorConductor, //<-- Car Color, you can change it 
        fillOpacity: 1,
        strokeWeight: 1,
        anchor: new google.maps.Point(0, 5),
        rotation: 44 //<-- Car angle
    };

    //path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',

    // Esta es la información del marker que se va a mostrar, el contenido acepta HTML
    var infowindow = new google.maps.InfoWindow({
        content: `<strong>No.Solicitud: ${conductor.nosol}
                    <p>Estructura: ${conductor.estructura}</p>
                    <p>Comentario: ${conductor.comentario}</p>
                    <p>FechaHora: ${conductor.fecha_hora}</p>
                    </strong>`
    });
    var uluru = { lat: parseFloat(conductor.latitud), lng: parseFloat(conductor.longitud) };

    var marker = new google.maps.Marker({
        position: uluru,
        icon: icon,
        map: map,
        title: conductor.medidor
    });

    // Al hacer click sobre el marker mostraremos su información en una ventana
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

    markers[conductor.key] = marker; // add marker in the markers array...
    document.getElementById("cars").innerHTML = cars_count;
    //#endregion

}


function buildLococationConductoresList(data) {
    let array = data;
    let arraySize = array.length;
    let color;
    var listings = document.getElementById('poimapbox-listings');
    listings.innerHTML = "";
    for (let i = 0; i < arraySize; i++) {
        let element = array[i];
        let conductor = element;

        AddMarkerConductor(element);

        color = (conductor.situacion == "Disponible") ? '#8bc34ba3' : '#ff572287';


        var listing = listings.appendChild(document.createElement('div'));
        listing.innerHTML
        listing.className = 'amenity-poi';


        listing.style.backgroundColor = color;

        listing.id = "listing-" + i;

        var link = listing.appendChild(document.createElement('a'));
        link.innerHTML = "";
        link.href = '#';
        link.className = 'name';
        link.dataPosition = i;

        link.innerHTML =
            // '<img src=' + conductor.properties.imagetmb + '>' +
            '<img src="https://img.icons8.com/external-flat-juicy-fish/60/000000/external-power-human-figures-flat-flat-juicy-fish-4.png"/>' +
            '<h3>' + conductor.nosol+ '</h3>' +
            '<p>' + conductor.estructura + '</p>' +
            '<p>' + conductor.comentario + '</p>' +
            '<p>' + conductor.fecha_hora + '</p>'

        link.addEventListener('click', function (e) {
            // Update the conductor to the Park associated with the clicked link
            var clickedListing = data[this.dataPosition];
            console.log(clickedListing);
            // // 1. Fly to the point
            flyToStore(clickedListing);

            // // 2. Close all other popups and display popup for clicked Park
            // createPopUp(clickedListing);

            // 3. Highlight listing in sidebar (and remove highlight for all other listings)
            var activeItem = document.getElementsByClassName('amenity-poi active');

            if (activeItem[0]) {
                activeItem[0].classList.remove('active');
            }
            this.parentNode.classList.add('active');

        });

    }
}

function flyToStore(currentFeature) {
    let latitud = parseFloat(currentFeature.latitud);
    let longitud = parseFloat(currentFeature.longitud);
    // map.flyTo({
    //     center: currentFeature,
    //     zoom: 15
    // });

    map.setZoom(17);
    map.panTo({ lat: latitud, lng: longitud });
}

// get firebase database reference...
var cars_Ref = firebase.database().ref('/SOLICITUDES');


var dataConductores = firebase.database().ref('/SOLICITUDES');
dataConductores.on('value', function (snapshot) {
    //updateStarCount(postElement, snapshot.val());

    let conductores = snapshot.val();
    conductoresArray = [];
    for (const key in conductores) {
        if (conductores.hasOwnProperty(key)) {
            const element = conductores[key];
            //console.log(element);
            conductoresArray.push(element);


        }
    }

    buildLococationConductoresList(conductoresArray);
});

// this event will be triggered when a new object will be added in the database...
cars_Ref.on('child_added', function (data) {
    //console.log(data.val());
    cars_count++;
    //AddMarkerConductor(data);
    let conductor = data.val();

});

// this event will be triggered on location change of any car...
cars_Ref.on('child_changed', function (data) {
    markers[data.key].setMap(null);
    //AddMarkerConductor(data);
    let conductor = data.val();

});

// If any car goes offline then this event will get triggered and we'll remove the marker of that car...  
cars_Ref.on('child_removed', function (data) {
    markers[data.key].setMap(null);
    cars_count--;
    document.getElementById("cars").innerHTML = cars_count;
});


function AddPedido(data) {
    var color = "";
 

    if (data.val().suministro != "BAJABAJA") {

        color = "#09ebcd";
        colorConductor = "#09ebcd";

    } else if (data.val().suministro != "ALTABAJA") {
        color = "#32a856";
        colorConductor = "#32a856";
    } else {
        color = "#151582";
    }

    var icon = { // car icon
      path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
         scale: 0.5,
       
        fillColor: color,
        // strokeWeight: 1,
        // anchor: new google.maps.Point(0, 5),
        // rotation: 44 //<-- Car angle
        fillOpacity: 1,
        strokeWeight: 2,
        anchor: new google.maps.Point(0, 5),
        rotation: data.val().angle //<-- Car angle
    };
  
    // Esta es la información del marker que se va a mostrar, el contenido acepta HTML
    var infowindow = new google.maps.InfoWindow({
        content: `<strong>Medidor: ${data.val().medidor}
                <p>Facturado: ${data.val().facturado}</p>
                <p>Suministro: ${data.val().suministro}</p>
                <p>Lectura: ${data.val().lectura}</p>
                <p>Anomalias: ${data.val().anomalias}</p>
                </strong>`
    });
    var uluru = { lat: parseFloat(data.val().latitud), lng: parseFloat(data.val().longitud) };

    var marker = new google.maps.Marker({
        position: uluru,
        icon: icon,
        map: map,
        title: data.val().nombre
    });

    // Al hacer click sobre el marker mostraremos su información en una ventana
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

    markersPedidos[data.key] = marker; // add marker in the markers array...
    document.getElementById("pedidos").innerHTML = pedidos_count;
}




var pedidos_Ref = firebase.database().ref('/RPUMEDIDOR_E3_MTM');

// this event will be triggered when a new object will be added in the database...
pedidos_Ref.on('child_added', function (data) {
    pedidos_count++;
    AddPedido(data);
});

// this event will be triggered on location change of any car...
pedidos_Ref.on('child_changed', function (data) {
    markersPedidos[data.key].setMap(null);
    AddPedido(data);
});

// If any car goes offline then this event will get triggered and we'll remove the marker of that car...  
pedidos_Ref.on('child_removed', function (data) {
    markersPedidos[data.key].setMap(null);
    pedidos_count--;
    document.getElementById("pedidos").innerHTML = pedidos_count;
});



