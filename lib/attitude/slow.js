/*
The slow attitude outputs x bytes per y interval.  X defaults to 1, and y defaults to 1 second.

*/
var Base = require('./base');

var Slow = function () {
	
};

// Inherit from the Base attitude
Slow.prototype.__proto__ = Base.prototype;

Slow.prototype._bytes = 1;
Slow.prototype._interval = 1000;
Slow.prototype._sent = 0;

Slow.prototype.config = function (config) {
	Base.prototype.config.call(this, config);
	if (config.bytes) {
		this._bytes = config.bytes;
	}
	if (config.interval) {
		this._interval = config.interval;
	}
};
/**
 * Runs the response, and uses timeouts to make sending the response take a long time
 *
 */
Slow.prototype.run = function (serverResponse) {
	var _this = this;
	var timer = function () {
		if (_this._sent >= _this._response.length) {
			serverResponse.end();
		} else {
			var slice = _this._response.slice(_this._sent, _this._sent + _this._bytes);
			_this._sent += _this._bytes;
			serverResponse.write(slice);
			setTimeout(timer, _this._interval);
		}
	};
	serverResponse.writeHead(this._code, this._headers);
	setTimeout(timer, this._interval);
};

module.exports = Slow;