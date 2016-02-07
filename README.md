# Hangouts-Bot for Node.js

Very simple library that allows you to build chat builds with Node.js.

```
$ npm i hangouts-bot
```

```js
const hangoutsBot = require("hangouts-bot");
const bot = new hangoutsBot("someone@gmail.com", "password");

bot.on('online', () => {
	console.log('online');
});

bot.on('message', (from, message) => {
	console.log(from + ">> " + message);
});
```

More to come!

## Shameless Plug

I hack around with Vim plugins, Node.js, Google Glass, and more. If any of that sounds interesting, [follow me!](https://github.com/jaxbot)
