/*
The half attitude only returns the first half of the configured response.  This is good for causing
 parse errors in serialized content like JSON or XML.

*/
var Base = require('./base'),
	util = require('util');

var Half = function () {
	
};

util.inherits(Half, Base);

Half.prototype.run = function (serverResponse) {
	serverResponse.writeHead(this._code, this._headers);
	serverResponse.write(this._response.substr(0, Math.min(this._response.length / 2)));
	serverResponse.end();
	return true;
};

module.exports = Half;