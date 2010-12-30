var vows = require('vows'),
	assert = require('assert'),
	slow = require('../../lib/attitude/slow'),
	http = require('http');

var mockResponse = {
	write: function (content) {
		this.content = content
	},

	writeHead: function (code, headers) {
		this.code = code;
		this.headers = headers;
	},
	end: function () {
		
	}
};

vows.describe('Slow attitude').addBatch({
	'working with canned responses': {
		topic: function () {
			return new(slow);
		},

		'Takes a canned response value': function (topic) {
			assert.ok(topic.setResponse('This is a string value'));
		},

		'calls end()': function (topic) {
			var httpResponse = Object.create(mockResponse);
			httpResponse.end = function () {
				assert.ok(true);
			}

			topic.setResponse('woo');
		}
	},
	
	'config works well': {
		topic: function () {
			return new(slow);
		},

		'default code is 200': function (topic) {
			assert.equal(200, topic._code);
		},
		
		'default interval, and bytes': function (topic) {
			assert.equal(1, topic._bytes);
			assert.equal(1000, topic._interval)
		},

		'with undefined code': function (topic) {
			topic.config({code: undefined, headers: undefined});
			assert.equal(200, topic._code);
			assert.deepEqual({}, topic._headers)
		},

		'override bytes and interval': function (topic) {
			topic.config({interval: 1, bytes: 10});
			assert.equal(10, topic._bytes);
			assert.deepEqual(1, topic._interval);
		}
	}
}).export(module)

