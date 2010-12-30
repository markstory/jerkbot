var vows = require('vows'),
	assert = require('assert'),
	path = require('path'),
	http = require('http'),
	mocks = require('./mocks.mock'),
	jerk = require('../lib/jerkbot.js');


vows.describe('jerkbot').addBatch({
	'server': {
		'should have a createServer function': function () {
			assert.isFunction(jerk.createServer)
		},

		'createServer should make an http.Server': function () {
			assert.ok(jerk.createServer({}) instanceof http.Server);
		}
	},

	'loadConfig with empty config file': {
		topic: function () {
			return path.join(__dirname, 'config', 'empty_config.js');
		},

		'should set port to 8080 when empty': function (topic ) {
			var config = jerk.loadConfig(topic);

			assert.equal(8080, config.port);
		},

		'should leave host undefined': function (topic) {
			var config = jerk.loadConfig(topic);

			assert.equal(undefined, config.host);
		},
		
		'should set dirname up': function (topic) {
			var config = jerk.loadConfig(topic);
			assert.equal(path.join(__dirname, 'config'), config.dirname);
		},
		
		'should merge optional options': function (topic) {
			var config = jerk.loadConfig(topic, {verbose: true});

			assert.ok(config.verbose);
		}
	},
	
	'error()': {
		topic: function () {
			return jerk.error;
		},
		'calls response methods correctly.': function (topic) {
			var response = Object.create(mocks.httpResponse);
			response.end = function () { assert.ok(true); }
			
			topic(response, 'Broken');
			
			assert.equal(500, response.code);
			assert.equal('Broken', response.content);
		}
	}
}).export(module)
