var xmpp = require('node-xmpp');

var config = require('./config');

var connection = new xmpp.Client(config);

connection.on('online', function() {
	console.log('online');
	connection.send(new xmpp.Element('presence', {}).c('show').t('chat').up()
		.c('status').t('Online!'));
	
	var roster_elem = new xmpp.Element('iq', { from: connection.jid, type: 'get', id: 'google-roster'})
	.c('query', { xmlns: 'jabber:iq:roster', 'xmlns:gr': 'google:roster', 'gr:ext': '2' });
	connection.send(roster_elem);

	/*
	connection.socket.setTimeout(0);
	connection.socket.setKeepAlive(true, 10000);
	*/

});

connection.on('stanza', function(stanza) {
	console.log(stanza);
	if (stanza.is('message') && (stanza.attrs.type !== 'error')) {
		stanza.attrs.to = stanza.attrs.from;
		delete stanza.attrs.from;

		connection.send(stanza);

		console.log(stanza.getChildText('body'));

	}
	if(stanza.is('presence') && stanza.attrs.type === 'subscribe') {
		stanza.attrs.to = stanza.attrs.from;
		delete stanza.attrs.from;

		connection.send(stanza);
	}
});

connection.on('error', function(e) {
	console.log(e);
});

function sendMessage(to, message) {
	var stanza = new xmpp.Element(
		'message',
		{ to: to, type: 'chat' }
	).c('body').t(message")
	connection.send(stanza);
}
