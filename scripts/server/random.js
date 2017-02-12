var RandomOrg = require('random-org');

var random = new RandomOrg({ apiKey: '35e11b9d-c92b-438d-a31e-2a93f0e53e45' });

function getRandom(max, then){
	random.generateIntegers({ min: 0, max: max, n: 1 })
	.then(function(result) {
		then(result.random.data[0]);
	});
}

exports.get=getRandom;