var deps = require('../deps.js');
var jerk = require('../jerk.js');

var vows = deps.vows;
var assert = deps.assert;

vows.describe('Server creation').addBatch({
	'Server should exist and be net.Server': function () {
		assert.ok(jerk instanceof deps.net.Server)
	}
}).export(module)
