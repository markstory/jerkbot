var vows = require('vows'),
	assert = require('assert'),
	drop = require('../../lib/attitude/drop'),
	mocks = require('../mocks.mock');

vows.describe('Drop attitude').addBatch({
	'responding': {
		topic: function () {
			var dropper = new(drop);
			dropper.setResponse('This is a response');

			var httpResponse = Object.create(mocks.httpResponse);
			httpResponse.connection = {
				destroy: this.callback
			};

			dropper.run(httpResponse);
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

