var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('properties.ini');
var token = properties;

var main = function() {
    console.log(token);
}

if (require.main === module) {
    main();
}