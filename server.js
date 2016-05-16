(function() {

	'use strict';

	// include dependencies
	const express = require('express');
	const httpFactory = require('http');
	const ioFactory = require('socket.io');
	const randomColor = require('randomcolor');

	// initialize express and socket servers
	const app = express();
	const http = httpFactory.Server(app);
	const io = ioFactory(http);

	// get samples module
	const samples = require('./libs/samples');

	// store master client id when connected
	var master = false;

	// set public directory as document root
	app.use(express.static('public'));

	// socket connection initialized
	io.on('connection', (socket) => {
		console.log('a user connected');

		// no master client specified so set now
		if (!master) {
			master = socket.id;
			socket.emit('setMaster');
			console.log('master connected');

		// otherwise set as client with color and sample
		} else {
			let sample = samples.getRandom();
			console.log(sample);

			socket.emit('setClient', {
				color: randomColor(),
				sample: sample
			});
		}

		// listen for hit events from client
		socket.on('hit', (data) => {
			console.log('hit handler');
			console.log(master);

			// broadcast playSound event to master client with color data
			socket.broadcast.to(master).emit('playSound', data);
		});

		socket.on('cutHit', (data) => {
			console.log('cutHit handler');
			console.log(master);

			// broadcast playSound event to master client with color data
			socket.broadcast.to(master).emit('stopSound', data);
		});

		// socket disconnected
		socket.on('disconnect', () => {
			console.log('user disconnected');

			// if client was master then reset master
			if (socket.id === master) {
				master = false;
				console.log('master disconnected');
				console.log(master);
			}
		});
	});

	// listen on port 3000
	http.listen(3000, () => {
		console.log('listening on *:3000');
	});

})();
