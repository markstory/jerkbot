var vows = require('vows'),
	assert = require('assert'),
	path = require('path'),
	http = require('http'),
	mocks = require('./mocks.mock'),
	server = require('../lib/server');

// Add paths so attitudes can be found.
require.paths.unshift(path.join(__dirname, '..', 'lib'));

vows.describe('jerkbot Server').addBatch({
	'server': {
		'should have a createServer function': function () {
			assert.isFunction(server.Server)
		},

		'createServer should make an http.Server': function () {
			var serve = new server.Server(path.join(__dirname, 'config', 'empty_config.conf'));
			assert.ok(serve instanceof http.Server);
		}
	},

	'loadConfig with empty config file': {
		topic: function () {
			var file = path.join(__dirname, 'config', 'empty_config.conf');
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
			var file = path.join(__dirname, 'config', 'empty_config.conf');
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
		
		teardown: function () {
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
}).addBatch({
	'Server.handle()': {
		topic: function () {
			this._error = console.error;

			var file = path.join(__dirname, 'config', 'simple_config.conf');
			return new server.Server(file);
		},

		teardown: function () {
			console.error = this._error;
		},

		'fails when attitude is missing': function (topic) {
			var res = Object.create(mocks.httpResponse);
			var req = Object.create(mocks.httpRequest, {url : {value: '/missing/attitude'}});

			console.error = function (message) {
				assert.match(message, /Missing attitude/);
			}

			topic.handle(req, res);
		},

		'fails when response file is missing': function (topic) {
			var res = Object.create(mocks.httpResponse);
			var req = Object.create(mocks.httpRequest, {url : {value: '/missing/response'}});

			console.error = function (message) {
				assert.match(message, /Could not read file/);
			}

			topic.handle(req, res);
		},

		'fails when no responder can be found': function (topic) {
			var res = Object.create(mocks.httpResponse);
			var req = Object.create(mocks.httpRequest, {url : {value: '/no/path'}});

			console.error = function (message) {
				assert.match(message, /No responder found/);
			}

			topic.handle(req, res);
		}
	}
}).export(module)
