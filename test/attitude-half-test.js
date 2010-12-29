var vows = require('vows'),
	assert = require('assert'),
	eyes = require('eyes'),
	half = require('../lib/attitude/half'),
	http = require('http');

var mockResponse = {
	write: function (content) {
		this.content = content
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
		}
	}
}).export(module)

