/*
The nice attitude doesn't do anything to mangle the output or otherwise be evil.

*/
module.exports = {
	_response: '',
	_code: '',
	_headers: {},

	setHead: function (code, headers) {
		this._code = code;
		this._headers = headers;
	},

	setResponse: function (response) {
		this._response = response;
		return true;
	},

	run: function (serverResponse) {
		serverResponse.writeHead(this._code, this._headers);
		serverResponse.write(this._response);
		return true;
	}

};

