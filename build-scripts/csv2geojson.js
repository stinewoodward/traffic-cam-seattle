// require() function grabs relevant packages
const fs = require('fs'),
      csv2geojson = require('csv2geojson'),
      chalk = require('chalk');

// converts traffic signal csv to geojson and filters out unnecessary attributes
function convertCsv() {
  // reads traffic signals csv file into script as string
  fs.readFile(__dirname + '/../project-files/austin-traffic-signals.csv', 'utf-8', (err, csvString) => {

    if (err) throw err;

    console.log(chalk.green('austin-traffic-signals.csv loaded'))
    console.log(chalk.green('parsing csv ...'))

    // use csv2geojson method from csv2geojson package to parse csv data
    csv2geojson.csv2geojson(csvString, {
      latfield: 'LATITUDE',
      lonfield: 'LONGITUDE',
      delimiter: ','
    }, (err, geojson) => {

      if (err) throw err;

      // call filterFields function and pass it the newly created geojson
      var outGeoJSON = filterFields(geojson);

      // takes object returned from filterFields() and writes output file, stringigying object
      fs.writeFile(__dirname + '/../data/austin-traffic-signals.json', JSON.stringify(outGeoJSON), 'utf-8', (err) => {

        if (err) throw err;

        console.log(chalk.green('austin-traffic-signals.json written to file'));
      });
    })
  });
}

function filterFields(geojson) {
  // creates shortcut to traffic signals and empty array for relevant attributes
  var features = geojson.features,
    newFeatures = [];
  // for each traffic signal
  features.forEach((feature) => {
    // create empty object to temporarily hold properties
    var tempProps = {};
    // iterate through traffic signal properties
    for (var prop in feature.properties) {
      if (prop === 'COUNCIL_DISTRICT' || prop === 'SIGNAL_ID') {
        tempProps[prop] = feature.properties[prop]; // for each signal, assign council district and signal_id
                                                    // values to tempProps variable
      }
    }
    // push relevant attributes into newFeatures
    newFeatures.push({
      "type": feature.type,
      "geometry": feature.geometry,
      "properties": tempProps
    });
  });

  // return json object
  return {
    "type": "FeatureCollection",
    "features": newFeatures
  }
}

// specifies what is returned by require() calls
exports.convertCsv = convertCsv;
exports.filterFields = filterFields;
