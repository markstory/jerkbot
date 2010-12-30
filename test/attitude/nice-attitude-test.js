var vows = require('vows'),
	assert = require('assert'),
	nice = require('../../lib/attitude/nice'),
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

vows.describe('Nice attitude').addBatch({
	'working with canned responses': {
		topic: function () {
			return Object.create(nice);
		},

		'Takes a canned response value': function (topic) {
			assert.ok(topic.setResponse('This is a string value'));
		},
	
		'does not muck around with them': function (topic) {
			var headers = {'Content-Type': 'text/html'};

			topic.setResponse('<tag>stuff</tag>');
			topic.setHead(200, headers);

			var httpResponse = Object.create(mockResponse);

			assert.ok(topic.run(httpResponse));
			assert.equal(httpResponse.content, '<tag>stuff</tag>');
		}
	},
	
	'setHead works well': {
		topic: function () {
			return Object.create(nice);
		},

		'default code is 200': function (topic) {
			assert.equal(200, topic._code);
		},

		'with undefined code': function (topic) {
			topic.setHead(undefined, undefined);
			assert.equal(200, topic._code);
			assert.deepEqual({}, topic._headers)
		}
	}
}).export(module)

