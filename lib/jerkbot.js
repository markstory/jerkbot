var http = require('http'),
	util = require('util'),
	path = require('path'),
	fs = require('fs'),
	stylize = require('vows/console').stylize;

exports.createServer = function (config) {
	return http.createServer(function (request, response) {
		var responder = getResponder(config, request.url);
		if (!responder) {
			return error(response, 'No matching response for ' + request.url);
		}
		var attitude = getAttitude(responder.attitude);
		if (!attitude) {
			return error(response, 'Missing an attitude for ' + request.url)
		}
		attitude.setHead(responder.code, responder.headers);
		
	});
};

exports.loadConfig = function (configFile) {
	var configuration = require(configFile);
	configuration.port = configuration.port || 8080;
	configuration.host = configuration.host || undefined;
	configuration.dirname = configuration.dirname || path.dirname(configFile);
	return configuration;
}

/**
 * enumerates config.responses and returns an object with url patterns as the keys.
 * 
 * @param Object config The configuration object with responses.
 * @param String url The url to match
 */
function getResponder(config, url) {
	if (!config.responses) {
		return false;
	}
	var responder = config.responses.filter(function (item) {
		var matcher = new RegExp('^' + item.url);
		if (matcher.test(url)) {
			return item;
		}
	});
	return responder[0] ? responder[0] : false;
}

function getAttitude(name) {
	try {
		var attitude = require('lib/attitude/' + name);
		return attitude;
	} catch (e) {
		return false;
	}
}

/*
 * Simple error handling
 */
function error(response, reason) {
	response.writeHead(500);
	response.write(reason);
	response.end();
}