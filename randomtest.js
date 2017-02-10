require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    var $ = require("jquery")(window);
	
	$.post('https://www.random.org/integers/?num=1&min=0&max=10&col=1&base=10&format=plain&rnd=new', function(winnerIndex){
		console.log(winnerIndex);
	});
});
