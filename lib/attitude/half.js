
this._response = null;

this.setResponse = function (response) {
	this._response = response;
	return true;
}

this.run = function (serverResponse) {
	serverResponse.write(this._response.substr(0, Math.min(this._response.length / 2)));
	return true;
}