var vows = require('vows'),
	assert = require('assert'),
	jerk = require('../lib/jerkbot.js'),
	http = require('http');

vows.describe('jerkbot server').addBatch({
	'Server should exist and be http.Server': function (topic) {
		assert.ok(jerk.server instanceof http.Server)
	}
}).export(module)
