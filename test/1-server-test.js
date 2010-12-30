var vows = require('vows'),
	assert = require('assert'),
	jerk = require('../lib/jerkbot.js'),
	http = require('http');

vows.describe('jerkbot server').addBatch({
	'should have a createServer function': function () {
		assert.isFunction(jerk.createServer)
	},

	'createServer should make an http.Server': function () {
		assert.ok(jerk.createServer({}) instanceof http.Server);
	}
}).export(module)
