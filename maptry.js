fetch("mj.json")
.then(function (response) {
    return response.json();

})
.then(function (jsonData) {
    console.log(jsonData);
  console.log("doin smth else");

  var mymap = L.map('mapid', {
    crs: L.CRS.Simple
});
var bounds = [[0,0], [10000,10000]];
var image = L.imageOverlay('Untitled-1-01.png', bounds).addTo(map);
map.fitBounds(bounds)

// var firstGuyPath = jsonData1.filter(function(jsonData1) 
// { return jsonData1['tag-local-identifier'] === 'D 51153'; });
// console.log(firstGuyPath);

   var michaeljacksonLocation = jsonData.map(function(jsonData) 
   { // каждый элемент массива превращается в [lat, lng]
    return [jsonData["location-lat"], jsonData["location-long"]];
  });
  console.log(michaeljacksonLocation);

//   

var polyline = L.polyline(michaeljacksonLocation, { color: "blue" }).addTo(mymap);
mymap.fitBounds(polyline.getBounds());
    polyline.bindPopup("MJ");


    // для каждого элемента массива jsonData
    jsonData.forEach(function (jsonData) {
      // создаём кружок с координатами, взятыми из элемента массива (переменная stork)
      var circle = L.circle([jsonData["location-lat"], jsonData["location-long"]], {
        radius: 10000,
      });
      // привязываем к кружку поп-ап с данными, взятыми из элемента массива (переменная stork)
      var note = "MJ" + jsonData.city.toUpperCase() + jsonData.time.toUpperCase();
      circle.bindPopup(note);
      // добавляем кружок на карту
      circle.addTo(mymap);
    });

    });