var vows = require('vows'),
	assert = require('assert'),
	half = require('../../lib/attitude/half'),
	
	mocks = require('../mocks.mock');



vows.describe('Half length attitude').addBatch({
	'working with canned responses': {
		topic: function () {
			return new(half);
		},

		'Takes a canned response value': function (topic) {
			assert.ok(topic.setResponse('This is a string value'));
		},
	
		'Returns half the response on run()': function (topic) {
			topic.setResponse('This this ');

			var httpResponse = Object.create(mocks.httpResponse);
			assert.ok(topic.run(httpResponse));
			assert.equal(httpResponse.content, 'This ');
		},

		'Sets headers correctly': function (topic) {
			var headers = {'Content-Type': 'text/html'};

			topic.setResponse('test');
			topic.config({code: 300, headers: headers});
	
			var httpResponse = Object.create(mocks.httpResponse);

			assert.ok(topic.run(httpResponse));
			assert.equal(300, httpResponse.code);
			assert.deepEqual(headers, httpResponse.headers);
		}
	}
}).export(module)

