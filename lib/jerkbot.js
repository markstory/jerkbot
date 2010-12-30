var http = require('http');

exports.createServer = function (config) {

	return http.createServer(function (request, response) {
		
	});
};

exports.loadConfig = function (configFile) {
	var configuration = require(configFile);
	configuration.port = configuration.port || 8080;
	configuration.host = configuration.host || undefined;
	return configuration;
}

function getAttitude(name) {
	
}


function findUrlConfig(url) {
	
}


function handleError(err) {
	
}