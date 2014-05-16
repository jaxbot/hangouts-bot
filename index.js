var xmpp = require('node-xmpp');

var config = require('./config');

var connection = new xmpp.Client(config);

connection.on('online', function() {
	console.log('online');
	connection.send(new xmpp.Element('presence', {}).c('show').t('chat').up()
		.c('status').t('Online!'));
});

connection.on('stanza', function(stanza) {
	console.log(stanza);
	if (stanza.is('message') && (stanza.attrs.type !== 'error')) {
		stanza.attrs.to = stanza.attrs.from;
		delete stanza.attrs.from;

		connection.send(stanza);
	}
});

connection.on('error', function(e) {
	console.log(e);
});

