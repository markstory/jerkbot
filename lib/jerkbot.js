var http = require('http'),
	path = require('path'),
	fs = require('fs'),
	stylize = require('vows/vows/console').stylize;

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
		attitude.config(responder);
		fs.readFile(path.join(config.dirname, responder.response), 'binary', function (err, file) {
			if (err) {
				return error(response, 'Could not read file for responder. ' + request.url);
			}
			attitude.setResponse(file);
			attitude.run(response);
		});
	});
};


exports.loadConfig = function (configFile, options) {
	options = options || {};

	var configuration = require(configFile);
	configuration.port = configuration.port || 8080;
	configuration.host = configuration.host || undefined;
	configuration.dirname = configuration.dirname || path.dirname(configFile);

	Object.keys(options).forEach(function (k) {
		configuration[k] = options[k];
	});

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
		var attitude = require('attitude/' + name);
		return new(attitude);
	} catch (e) {
		return false;
	}
}

/**
 * Simple error handling, handles internal errors.
 */
var error = exports.error = function(response, reason) {
	response.writeHead(500);
	response.write(reason);
	response.end();

	console.error(stylize('Error: ', 'red') + reason);
}

var log = exports.log = function (cmd, msg) {
	console.log(stylize(cmd, 'green') + ' ' + msg);
}