/*
The base attitude for jerkbot.  Provides some base methods.
*/

module.exports = {
	_response: '',
	_code: 200,
	_headers: {},

	setHead: function (code, headers) {
		if (typeof code == 'number') {
			this._code = code;
		}
		if (typeof headers == 'object' && headers != null) {
			this._headers = headers;
		}
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