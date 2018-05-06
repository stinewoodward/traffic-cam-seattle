"use strict"

var csv2geojson = require('csv2geojson');
var fs = require('fs');

// read file as string
fs.readFile(__dirname + '/../project-files/seattle-traffic-cameras.csv', 'utf-8', (err, csvString) => {

  if (err) throw err;

  // convert to GeoJSON
  csv2geojson.csv2geojson(csvString, {
    latfield: 'YPOS',
    lonfield: 'XPOS',
    delimiter: ','
  }, (err, geojson) => {

    if (err) throw err;

    var outGeoJSON = filterFields(geojson);

    // write file
    fs.writeFile(__dirname + '/../data/seattle-traffic-cams.json', JSON.stringify(outGeoJSON), 'utf-8', (err) => {

      if (err) throw err;

      console.log('done writing file');
    });
  })
});

function filterFields(geojson) {
  // shorthand to our features
  var features = geojson.features,
      newFeatures = []; // empty array for new features

  // loop through all the features
  features.forEach((feature) => {
    // on each loop, create an empty object
    var tempProps = {};
    // loop through each of the properties for that feature
    for (var prop in feature.properties) {
      // if it's a match
      if (prop === 'OWNERSHIPCD' || prop === 'CAMERALABEL') {
        // create the prop/value
        tempProps[prop] = feature.properties[prop];
      }
    }
    // now push a new feature to the newFeatures array
    // we will use the existing feature type and geometry,
    // but we can use our new properties as the "properties" value
    newFeatures.push({
      "type": feature.type,
      "geometry": feature.geometry,
      "properties": tempProps
    });
  });
  // finally, return a GeoJSON object FeatureCollection,
  // using the new features as the "features" value
  return {
    "type": "FeatureCollection",
    "features": newFeatures
  }
}
