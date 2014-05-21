// Example hangouts bot
// Run with node example.js <username> <password>

var hangoutsBot = require("../index.js");
var bot = new hangoutsBot(process.argv[2], process.argv[3]);

bot.on('online', function() {
	console.log('online');
});

bot.on('message', function(from, message) {
	console.log(from + ">> " + message);

	switch (message) {
		case "help":
			bot.sendMessage(from, "I an example Hangouts bot. Try saying hello.");
			break;
		case "hello":
			bot.sendMessage(from, "Why hello to you too.");
			break;
	}
});

