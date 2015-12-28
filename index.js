var events = require('events');

module.exports = function(username, password, onlineStatus) {
	events.EventEmitter.call(this);

	var Client = require('node-xmpp-client');
	var Element = require('node-xmpp-stanza').Element;
	var that = this;

	this.connection = connection = new Client({
		jid: username,
		password: password,
		host: "talk.google.com"
	});

	this.connection.on('online', function() {
		connection.send(new Element('presence', {})
			.c('show')
			.t('chat')
			.up()
			.c('status')
			.t(onlineStatus || 'Online')
		);
		
		var roster_elem = new Element('iq', {
			'from': connection.jid,
			'type': 'get',
			'id': 'google-roster'
		}).c('query', {
			'xmlns': 'jabber:iq:roster',
			'xmlns:gr': 'google:roster',
			'gr:ext': '2'
		});

		connection.send(roster_elem);

		that.emit('online');
	});

	this.connection.on('stanza', function(stanza) {
		if (stanza.is('message') && (stanza.attrs.type !== 'error') && (stanza.getChildText('body'))) {
			that.emit('message',
				stanza.attrs.from,
				stanza.getChildText('body')
			);
		}

		if(stanza.is('presence') && stanza.attrs.type === 'subscribe') {
			stanza.attrs.to = stanza.attrs.from;
			delete stanza.attrs.from;

			connection.send(stanza);
		}
	});

	this.connection.on('error', function(e) {
		console.log(e);
	});

	this.sendMessage = function(to, message) {
		var stanza = new Element('message',
			{
				to: to,
				type: 'chat'
			})
			.c('body')
			.t(message);

		this.connection.send(stanza);
	}

	return this;
}

module.exports.prototype.__proto__ = events.EventEmitter.prototype;

