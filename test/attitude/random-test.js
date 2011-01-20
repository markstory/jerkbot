var vows = require('vows'),
	assert = require('assert'),
	random = require('../../lib/attitude/random'),
	mocks = require('../mocks.mock');

vows.describe('Random attitude').addBatch({
	'working with canned responses': {
		topic: function () {
			var rando = new(random);
			rando.config({maxsize: 50, headers: {test: 'value'}});
			rando.setResponse('This is a response');

			var httpResponse = Object.create(mocks.httpResponse);
			httpResponse.end = this.callback;

			rando.run(httpResponse);
			this.response = httpResponse;
		},

		'content is random': function (err, result) {
			assert.deepEqual(this.response.headers, {test: 'value'});
			assert.notEqual(this.response.content, 'This is a response');
			assert.equal(this.response.content.length > 50, true);
		},
	},
	
	'config works well': {
		topic: function () {
			return new(random);
		},

		'override maxsize': function (topic) {
			topic.config({maxsize: 100});
			assert.equal(100, topic._maxsize);
		},
		
		'override headers and code': function (topic) {
			topic.config({code: 404, headers: {test: 'value'}});
			assert.equal(404, topic._code);
			assert.deepEqual({test: 'value'}, topic._headers);
		}
	}
}).export(module)

