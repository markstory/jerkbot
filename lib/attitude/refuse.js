/**
 * Refuse attitude, will just close the connection, no headers no response.
 *
 */
var Base = require('./base');

var Refuse = function () {

};

// Inherit from base.
Refuse.prototype.__proto__ = Base.prototype;

Refuse.prototype.run = function (serverResponse) {
	serverResponse.connection.destroy();
	return true;
};

module.exports = Refuse;