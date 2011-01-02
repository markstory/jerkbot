var vows = require('vows'),
	assert = require('assert'),
	holdOpen = require('../../lib/attitude/hold-open'),
	
	mocks = require('../mocks.mock');

vows.describe('HoldOpen attitude').addBatch({
	'and response': {
		topic: function () {
			return new(holdOpen)
		},

		'response text gets sent': function (topic) {
			topic.setResponse('content sent');

			var httpResponse = Object.create(mocks.httpResponse);
			assert.ok(topic.run(httpResponse));
			assert.equal(httpResponse.content, 'content sent');
		},

		'end() never gets called by default': function (topic) {
			topic.setResponse('content sent');

			var httpResponse = Object.create(mocks.httpResponse);
			httpResponse.end = function () {
				assert.ok(false);
			}
			assert.ok(topic.run(httpResponse));
		},
	},
	
	'delayed response': {
		topic: function () {
			var hold = new holdOpen();
			hold.config({delay: 10});
			
			hold.setResponse('This is a response');

			var httpResponse = Object.create(mocks.httpResponse);
			httpResponse.end = this.callback;

			hold.run(httpResponse);
			this.response = httpResponse;
		},

		'end() can get called based on delay': function (err, result) {
			assert.equal(this.response.content, 'This is a response');
		}
	}
}).export(module);