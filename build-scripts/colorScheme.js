const fs = require('fs'),
      chalk = require('chalk');

// prepare to create color scheme
function extractColors() {
  // read the file
  fs.readFile(__dirname + '/../project-files/cartocolors.json', function (err, response) {

    if (err) throw err;

    console.log(chalk.blue("cartocolors.json data loaded!"));
    // parse the file
    const data = JSON.parse(response);

    console.log(chalk.blue("cartocolors.json data parsed to JSON"));
    // create Safe color scheme from parsed data
    const outputData = {
      'Safe': data['Safe']
    };

    console.log(chalk.blue("vivid scheme extracted from parsed data"));
    // write the file to the data directory
    fs.writeFile(__dirname + '/../data/safecolors.json', JSON.stringify(outputData), 'utf-8', function (err) {

      if (err) throw err;

      console.log(chalk.blue('safecolors.json written to data/ dir'));
    });
  });
}

exports.extractColors = extractColors