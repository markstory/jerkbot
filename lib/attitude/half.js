/*
The half attitude only returns the first half of the configured response.  This is good for causing
 parse errors in serialized content like JSON or XML.

*/
var Base = require('./base');

var Half = function () {
	
};

// Inherit from base.
Half.prototype.__proto__ = Base.prototype;

Half.prototype.run = function (serverResponse) {
	serverResponse.writeHead(this._code, this._headers);
	serverResponse.write(this._response.substr(0, Math.min(this._response.length / 2)));
	serverResponse.end();
	return true;
};

module.exports = Half;