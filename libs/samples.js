
// samples list and random sample generator
module.exports = (function() {

	'use strict';

	return {

		// list of samples
		stems: {
			loop: '/Samples/Loop.mp3',
			parts: [
				{
					name: 'Flute 1',
					source: '/samples/Flute-1.mp3'
				},
				{
					name: 'Flute 2',
					source: '/samples/Flute-2.mp3'
				},
				{
					name: 'Flute 3',
					source: '/samples/Flute-3.mp3'
				},
				{
					name: 'Flute 4',
					source: '/samples/Flute-4.mp3'
				},
				{
					name: 'Flute 5',
					source: '/samples/Flute-5.mp3'
				},
				{
					name: 'Flute 6',
					source: '/samples/Flute-6.mp3'
				},
				{
					name: 'Guitar 1',
					source: '/samples/Guitar-1.mp3'
				},
				{
					name: 'Guitar 2',
					source: '/samples/Guitar-2.mp3'
				},
				{
					name: 'Guitar 3',
					source: '/samples/Guitar-3.mp3'
				},
				{
					name: 'Horns 1',
					source: '/samples/Horns-1.mp3'
				},
				{
					name: 'Percussion 1',
					source: '/samples/Percussion-1.mp3'
				},
				{
					name: 'Percussion 2',
					source: '/samples/Percussion-2.mp3'
				},
				{
					name: 'Percussion 3',
					source: '/samples/Percussion-3.mp3'
				},
				{
					name: 'Percussion 4',
					source: '/samples/Percussion-4.mp3'
				},
				{
					name: 'Percussion 5',
					source: '/samples/Percussion-5.mp3'
				},
				{
					name: 'Percussion 6',
					source: '/samples/Percussion-6.mp3'
				},
				{
					name: 'Piano 1',
					source: '/samples/Piano-1.mp3'
				},
				{
					name: 'Piano 2',
					source: '/samples/Piano-2.mp3'
				},
				{
					name: 'Piano 3',
					source: '/samples/Piano-3.mp3'
				},
				{
					name: 'Piano 4',
					source: '/samples/Piano-4.mp3'
				},
				{
					name: 'Piano 5',
					source: '/samples/Piano-5.mp3'
				},
				{
					name: 'Strings 1',
					source: '/samples/Strings-1.mp3'
				}
			],
		},

		partsWithLoop: function() {
			var parts = this.stems.parts;
			parts.push({
				name: 'Loop',
				source: this.stems.loop
			});

			return parts;
		},

		currentList: [],

		reserve: [
			'Piano 1',
			'Piano 2'
		],

		// return random sample from list
		getRandom: function() {

			var randomSample = null;

			// if list is empty, refill and empty current
			if (!this.stems.parts.length) {
				this.stems.parts = this.currentList.slice();
				this.currentList = [];
			}

			console.log(this.reserve);

			// if reserves left
			if (this.reserve.length) {
				console.log('here');
				let reserve = this.reserve.shift(),
					part = this.stems.parts.filter(function(obj) {
						if (obj.name === reserve) {
							return true;
						} else {
							return false;
						}
					});

				if (!part.length) {
					return false;
				}

				randomSample = part[0];
			} else {
				// find random sample
				randomSample = this.stems.parts[Math.floor(Math.random() * this.stems.parts.length)];
			}

			// add to current list
			this.currentList.push(randomSample);

			// remove from main list
			this.stems.parts.splice(this.stems.parts.indexOf(randomSample), 1);

			return randomSample;
		}
	};
})();
