/**
 * Drop attitude, will just close the connection, no headers no response.
 *
 */
var Base = require('./base'),
	util = require('util');

var Drop = function () {

};

util.inherits(Drop, Base);

Drop.prototype.run = function (serverResponse) {
	serverResponse.connection.destroy();
	return true;
};

module.exports = Drop;