# Hangouts-Bot for Node.js

Very simple library that allows you to build chat builds with Node.js.

```
npm install hangouts-bot
```

```
var hangoutsBot = require("hangouts-bot");
var bot = new hangoutsBot("someone@gmail.com", "password");

bot.on('online', function() {
	console.log('online');
});

bot.on('message', function(from, message) {
	console.log(from + ">> " + message);
});

```

More to come!

## Shameless Plug

I hack around with Vim plugins, Node.js, Google Glass, and more. If any of that sounds interesting, [follow me!](https://github.com/jaxbot)
