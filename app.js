var restify = require('restify');
var builder = require('botbuilder');

//Setup Restify server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
	console.log('%s listening to %s', server.name, server.url);
});

//Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
	appId: process.env.MICROSOFTP_APP_ID,
	appPassword: process.env.MICROSOFT_APP_PASSWORD
});

//Listen for messages from users
server.post('/api/messages', connector.listen());

//Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) { 
	msg = session.message.text;
	if (msg.indexOf('!czas') !== -1) {
		var date = new Date();
		d = date.toDateString();
		session.send("Today is: %s", d);
	}else {

		session.send("You said: %s", session.message.text);
	}
});