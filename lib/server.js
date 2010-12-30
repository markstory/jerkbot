var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	stylize = require('vows/vows/console').stylize;

var Server = exports.Server = function (configfile, options) {
	this.config = this.loadConfig(configfile, options);
	http.Server.call(this, this.handle);
};

// Inherit from http.Server
Server.prototype.__proto__ = http.Server.prototype;

/**
 * Override listen and pull the values out of the config.
 */
Server.prototype.listen = function (port, host) {
	port = port || this.config.port;
	host = host || this.config.host;

	http.Server.prototype.listen.call(this, port, host, function () {
		console.log('Jerkbot started listening on ' + host + ':' + port);
	});
};

/**
 * Load the configFile and merge in the options that were passed into the constructor
 * options generally come from the comandline options.
 */
Server.prototype.loadConfig = function(configFile, options) {
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

Server.prototype.handle = function (request, response) {
	var responder = getResponder(this.config, request.url);
	if (!responder) {
		return error(response, 'No matching response for ' + request.url);
	}
	var attitude = getAttitude(responder.attitude);
	if (!attitude) {
		return error(response, 'Missing an attitude for ' + request.url)
	}
	attitude.config(responder);
	fs.readFile(path.join(this.config.dirname, responder.response), 'binary', function (err, file) {
		if (err) {
			return error(response, 'Could not read file for responder. ' + request.url);
		}
		attitude.setResponse(file);
		attitude.run(response);
	});
};

Server.prototype.msg = function (cmd, msg) {
	console.log(stylize(cmd, 'green') + ' ' + msg);
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
