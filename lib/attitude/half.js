/*
The half attitude only returns the first half of the configured response.  This is good for causing
 parse errors in serialized content like JSON or XML.

*/
var base = Object.create(require('./base'));

base.run = function (serverResponse) {
	serverResponse.writeHead(this._code, this._headers);
	serverResponse.write(this._response.substr(0, Math.min(this._response.length / 2)));
	serverResponse.end();
	return true;
}

module.exports = base;
