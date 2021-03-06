var vows = require('vows'),
	assert = require('assert'),
	nice = require('../../lib/attitude/nice'),
	mocks = require('../mocks.mock');

vows.describe('Nice attitude').addBatch({
	'working with canned responses': {
		topic: function () {
			return new(nice);
		},

		'Takes a canned response value': function (topic) {
			assert.ok(topic.setResponse('This is a string value'));
		},
	
		'does not muck around with them': function (topic) {
			var headers = {'Content-Type': 'text/html'};

			topic.setResponse('<tag>stuff</tag>');
			topic.config({code: 200, headers: headers});

			var httpResponse = Object.create(mocks.httpResponse);

			assert.ok(topic.run(httpResponse));
			assert.equal(httpResponse.content, '<tag>stuff</tag>');
		},
		
		'calls end()': function (topic) {
			var httpResponse = Object.create(mocks.httpResponse);
			httpResponse.end = function () {
				assert.ok(true);
			}

			topic.setResponse('woo');
			topic.run(httpResponse);
		}
	},
	
	'config works well': {
		topic: function () {
			return new(nice);
		},

		'default code is 200': function (topic) {
			assert.equal(200, topic._code);
		},

		'with undefined code': function (topic) {
			topic.config({code: undefined, headers: undefined});
			assert.equal(200, topic._code);
			assert.deepEqual({}, topic._headers)
		}
	}
}).export(module)

