var deps = require('../deps.js');
var jerk = require('../lib/jerkbot.js');

var vows = deps.vows;
var assert = deps.assert;

vows.describe('Server creation').addBatch({
	'Server should exist and be http.Server': function () {
		assert.ok(jerk.server instanceof deps.http.Server)
	}
}).export(module)
