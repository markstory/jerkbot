var vows = require('vows'),
	assert = require('assert'),
	path = require('path'),
	http = require('http'),
	mocks = require('./mocks.mock'),
	server = require('../lib/server');


vows.describe('jerkbot Server').addBatch({
	'server': {
		'should have a createServer function': function () {
			assert.isFunction(server.Server)
		},

		'createServer should make an http.Server': function () {
			var serve = new server.Server(path.join(__dirname, 'config', 'empty_config.js'));
			assert.ok(serve instanceof http.Server);
		}
	},

	'loadConfig with empty config file': {
		topic: function () {
			var file = path.join(__dirname, 'config', 'empty_config.js');
			return new server.Server(file);
		},

		'should set port to 8080 when empty': function (topic) {
			assert.equal(8080, topic.config.port);
		},

		'should leave host undefined': function (topic) {
			assert.isUndefined(topic.config.host);
		},
		
		'should set dirname up': function (topic) {
			assert.equal(path.join(__dirname, 'config'), topic.config.dirname);
		},
	},
	
	'loadConfig merges options': {
		topic: function () {
			var file = path.join(__dirname, 'config', 'empty_config.js');
			return new server.Server(file, {verbose: true});
		},
		
		'with optional options': function (topic) {
			assert.ok(topic.config.verbose);
		}
	},
	
	'error()': {
		topic: function () {
			this._error = console.error;
			return server.error;
		},
		
		tearDown: function () {
			console.error = this._error;
		},
	
		'calls response methods correctly.': function (topic) {
			console.error = function (msg) {
				assert.equal()
			}
			var response = Object.create(mocks.httpResponse);
			response.end = function () { assert.ok(true); }
			
			topic(response, 'Broken');
			
			assert.equal(500, response.code);
			assert.equal('Broken', response.content);
		}
	}
}).export(module)
