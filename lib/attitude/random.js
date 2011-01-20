/**
 * Random attitude, will pipe content from /dev/urandom up to a maxsize, defaulting to 1MB
 *
 */
var Base = require('./base'),
	util = require('util'),
	fs = require('fs');

var Random = function () {

};

util.inherits(Random, Base);

Random.prototype.config = function (config) {
	Base.prototype.config.call(this, config);
	this._maxsize = config.maxsize || 1000000
	this._code = config.code || 200;
	this._headers = config.headers || {};
};

Random.prototype.run = function (serverResponse) {
	var urandom = fs.createReadStream('/dev/urandom'),
		maxsize = this._maxsize,
		cursize = 0;
	
	serverResponse.writeHead(this._code, this._headers);

	urandom.setEncoding('utf8');
	urandom.on('data', function (data) {
		cursize += data.length;
		serverResponse.write(data);
		if (cursize >= maxsize) {
			urandom.destroy();
			serverResponse.end();
		}
	});
};

module.exports = Random;