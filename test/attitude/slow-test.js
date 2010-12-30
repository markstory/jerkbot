var vows = require('vows'),
	assert = require('assert'),
	slow = require('../../lib/attitude/slow'),
	http = require('http');

var mockResponse = {
	content: '',

	write: function (content) {
		this.content += content
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
			var slowmo = new(slow);
			slowmo.config({interval: 5, headers: {test: 'value'}});
			slowmo.setResponse('This is a response');

			var httpResponse = Object.create(mockResponse);
			httpResponse.end = this.callback;

			slowmo.run(httpResponse);
			this.response = httpResponse;
		},

		'all content gets sent': function (err, result) {
			assert.deepEqual(this.response.headers, {test: 'value'});
			assert.equal(this.response.content, 'This is a response');
		},
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

