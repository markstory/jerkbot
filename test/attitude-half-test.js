var vows = require('vows'),
	assert = require('assert'),
	eyes = require('eyes'),
	half = require('../lib/attitude/half'),
	http = require('http');

var mockResponse = {
	write: function (content) {
		this.content = content
	},

	writeHead: function (code, headers) {
		this.code = code;
		this.headers = headers;
	}
};

vows.describe('Half length attitude').addBatch({
	'working with canned responses': {
		topic: function () {
			return Object.create(half);
		},

		'Takes a canned response value': function (topic) {
			assert.ok(topic.setResponse('This is a string value'));
		},
	
		'Returns half the response on run()': function (topic) {
			topic.setResponse('This this ');

			var httpResponse = Object.create(mockResponse);
			assert.ok(topic.run(httpResponse));
			assert.equal(httpResponse.content, 'This ');
		},

		'Sets headers correctly': function (topic) {
			var headers = {'Content-Type': 'text/html'};

			topic.setResponse('test');
			topic.setHead(300, headers);
	
			var httpResponse = Object.create(mockResponse);

			assert.ok(topic.run(httpResponse));
			assert.equal(300, httpResponse.code);
			assert.deepEqual(headers, httpResponse.headers);
		}
	}
}).export(module)
