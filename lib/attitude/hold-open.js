/**
 * Hold open attitude, will send the full response in the canned response, but never end/close
 * the connection.
 *
 */
var Base = require('./base'),
	util = require('util');

var HoldOpen = function () {

};

// Inherit from base.
util.inherits(HoldOpen, Base);

HoldOpen.prototype._delay = null;

HoldOpen.prototype.config = function (config) {
	Base.prototype.config.call(this, config);
	if (config.delay) {
		this._delay = config.delay;
	}
}

HoldOpen.prototype.run = function (serverResponse) {
	serverResponse.writeHead(this._code, this._headers);
	serverResponse.write(this._response);
	if (this._delay) {
		setTimeout(function () {
			serverResponse.end()
		}, this._delay);
	}
	return true;
};

module.exports = HoldOpen;