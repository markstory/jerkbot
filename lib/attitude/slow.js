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

Slow.prototype.config = function (config) {
	Base.prototype.config.call(this, config);
	if (config.bytes) {
		this._bytes = config.bytes;
	}
	if (config.interval) {
		this._interval = config.interval;
	}
};

module.exports = Slow;