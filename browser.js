// get buffer loader module
const BufferLoader = require('./libs/buffer-loader');

// get samples module
const samples = require('./libs/samples');

// initialize web audio context
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
const loopGain = context.createGain();
const partsGain = context.createGain();

loopGain.gain.value = 0.9;
partsGain.gain.value = 0.1;

// initialize socket connection
const socket = io();

// user model
const userData = {
	id: 0,
	color: '',
	sample: {
		name: '',
		source: ''
	},
	username: ''
};

var decodedSamples = [],
	loop = null,
	parts = {};

// DOM nodes
var userForm = document.querySelector('[data-user-form]'),
	usernameField = userForm.querySelector('[data-username-field]'),
	userInstructions = document.querySelector('[data-user-instructions]'),
	userInstrument = userInstructions.querySelector('[data-user-instrument]'),
	userGrid = document.querySelector('[data-user-grid]'),
	userGridBlocks = userGrid.querySelectorAll('[data-user-block]'),
	video = document.querySelector('video');

// You forcefully become the master & disconnect everyone else.
function master() {
	socket.emit('forceMaster');
}
window.master = master;

// apply color hit to screen and emit hit event to socket server
function hit() {
	if (!userData.username || !userData.color) {
		return false;
	}

	// no username on hit display locally
	applyColorHit(userData, true);

	// send client data to master client
	socket.emit('hit', userData);
}

function cutHit() {
	if (!userData.username || !userData.color) {
		return false;
	}

	// send client data to master client
	socket.emit('cutHit', userData);
}

function applySampleHit(data) {
	parts[data.username] = context.createBufferSource();
	parts[data.username].buffer = decodedSamples[data.sample.name];
	parts[data.username].connect(partsGain);
	partsGain.connect(context.destination);
	parts[data.username].start(0);
}

function cutSampleHit(data) {
	parts[data.username].stop();
	delete parts[data.username];
}

// create color block element and fade in/out with CSS
function applyColorHit(data, noUser = false, element = false) {
	// create and append element
	let hit = document.createElement('div');
	hit.classList.add('hit');
	// hit.style.background = data.color;

	// add user name if requested
	if (!noUser) {
		hit.innerHTML = '<h2 class="hit__username">' + data.username + '</h2>';
	}

	let el = element ? element : document.body;

	el.appendChild(hit);

	// add / remove active modifier class
	setTimeout(() => {
		hit.classList.add('hit--active');
	}, 20);

	setTimeout(() => {
		hit.classList.remove('hit--active');
	}, 500);
}

// username form submission
function submitUsername(e) {
	e.preventDefault();

	if (!usernameField.value) {
		return false;
	}

	const username = encodeURIComponent(usernameField.value);

	// prepend username with @
	userData.username = username.startsWith('@') ?
		username :
	 	'@' + username;

	// remove form and unblur active field to hide keyboards
	userForm.classList.remove('user-form--active');
	document.activeElement.blur();

	// update user instructions with username and sample and show
	userInstrument.innerHTML = `${userData.username} you are playing ${userData.sample.name}`;

	userInstructions.classList.add('user-instructions--active');
}

function loadSamples() {
	let bufferLoader = new BufferLoader(context, samples.partsWithLoop(), loadingComplete);
	bufferLoader.load();
}

function loadingComplete(decodedData) {
	alert('samples loaded!');
	console.log(decodedData.Loop);
	decodedSamples = decodedData;

	window.addEventListener('keyup', function(e) {
		if (e.keyCode !== 32) {
			return false;
		}

		if (loop !== null) {
			loop.stop();
			loop = null;
		} else {
			loop = context.createBufferSource();
			loop.buffer = decodedSamples.Loop;
			loop.connect(loopGain);
			loopGain.connect(context.destination);
			loop.loop = true;
			loop.loopEnd = loop.buffer.duration - 0.02;
			loop.start(0);
		}
	});
}

// this client is the master client so set body class and load samples
socket.on('setMaster', () => {
	console.log('setMaster');
	loadSamples();
	document.body.classList.add('master-client');
	userGrid.classList.add('active');
	userForm.classList.remove('user-form--active');
	video.classList.add('active');
});

// listen for setClient event, store client data, show username form
socket.on('setClient', (data) => {
	console.log('setClient');
	console.log(data);
	userData.id = data.id;
	userData.color = data.color;
	userData.sample = data.sample;

	// this is a client so show username form
	userForm.classList.add('user-form--active');
});

// ** master client only **
// listen for playSound and trigger color hit
socket.on('playSound', (data) => {
	console.log('playSound');
	console.log(data);
	console.log(userGridBlocks[data.id]);
	applyColorHit(data, false, userGridBlocks[data.id]);
	applySampleHit(data);
});

socket.on('stopSound', (data) => {
	console.log('stopSound');
	console.log(data);
	cutSampleHit(data);
});

// forcefully disconnects client and reloads the window
socket.on('disconnect:force', () => {
	socket.disconnect();
	window.location.reload();
});

// room is full
socket.on('room:full', () => {
	document.body.innerHTML = "FlyMusic can only support 8 people at this time. Please try again soon.";
});

// bind tap / click events to hits
window.addEventListener('touchstart', hit);
window.addEventListener('touchend', cutHit);
window.addEventListener('mousedown', hit);
window.addEventListener('mouseup', cutHit);

// bind username submission event
userForm.addEventListener('submit', submitUsername);
