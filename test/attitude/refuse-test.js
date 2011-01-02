var vows = require('vows'),
	assert = require('assert'),
	refuse = require('../../lib/attitude/refuse'),
	mocks = require('../mocks.mock');

vows.describe('Refuse attitude').addBatch({
	'responding': {
		topic: function () {
			var refuser = new(refuse);
			refuser.setResponse('This is a response');

			var httpResponse = Object.create(mocks.httpResponse);
			httpResponse.end = this.callback;

			refuser.run(httpResponse);
			this.response = httpResponse;
		},

		'no content gets sent': function (err, result) {
			assert.equal(this.response.content, '');
		},
		
		'no headers get sent': function (err, result) {
			assert.deepEqual(this.response.headers, {});
		}
	}
}).export(module)

