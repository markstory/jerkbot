
this._response = '';
this._code = '';
this._headers = {};

this.setHead = function (code, headers) {
	this._code = code;
	this._headers = headers;
}

this.setResponse = function (response) {
	this._response = response;
	return true;
}

this.run = function (serverResponse) {
	serverResponse.writeHead(this._code, this._headers);
	serverResponse.write(this._response.substr(0, Math.min(this._response.length / 2)));
	return true;
}