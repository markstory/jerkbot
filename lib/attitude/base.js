/*
The base attitude for jerkbot.  Provides some base methods.
*/

module.exports = {
	_response: '',
	_code: 200,
	_headers: {},

	config: function (config) {
		if (typeof config.code == 'number') {
			this._code = config.code;
		}
		if (typeof config.headers == 'object' && config.headers != null) {
			this._headers = config.headers;
		}
	},

	setResponse: function (response) {
		this._response = response;
		return true;
	},

	run: function (serverResponse) {
		serverResponse.writeHead(this._code, this._headers);
		serverResponse.write(this._response);
		serverResponse.end();
		return true;
	}
};