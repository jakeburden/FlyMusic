
// samples list and random sample generator
module.exports = (function(sample, random) {

	'use strict';

	const track1 = 'fly-music-samples/Track 1/Samples';
	const track2 = 'fly-music-samples/Track 2/Samples';
	const track3 = 'fly-music-samples/Track 3/Samples';

	const track = process.env.TRACK || 'track1';
	console.log('track', track);
	return {

		// list of samples
		tracks: {
			track1: {
				loop: track1 + '/loop.mp3',
				parts: [
					{
						name: 'glitch',
						source: track1 + '/glitch.mp3'
					},
					{
						name: 'keys 1',
						source: track1 + '/keys1.mp3'
					},
					{
						name: 'keys 2',
						source: track1 + '/keys2.mp3'
					},
					{
						name: 'synth 1',
						source: track1 + '/synth1.mp3'
					},
					{
						name: 'synth 2',
						source: track1 + '/synth2.mp3'
					},
					{
						name: 'synth 3',
						source: track1 + '/synth3.mp3'
					},
					{
						name: 'vocals 1',
						source: track1 + '/vocals1.mp3'
					},
					{
						name: 'vocals 2',
						source: track1 + '/vocals2.mp3'
					}
				],
			},
			track2: {
				loop: track2 + '/loop.mp3',
				parts: [
					{
						name: 'flute 1',
						source: track2 + '/flute1.mp3'
					},
					{
						name: 'flute 2',
						source: track2 + '/flute2.mp3'
					},
					{
						name: 'keys 1',
						source: track2 + '/keys1.mp3'
					},
					{
						name: 'keys 2',
						source: track2 + '/keys2.mp3'
					},
					{
						name: 'synth 1',
						source: track2 + '/synth1.mp3'
					},
					{
						name: 'synth 2',
						source: track2 + '/synth2.mp3'
					},
					{
						name: 'trumpt',
						source: track2 + '/trump2.mp3'
					},
					{
						name: 'vocals',
						source: track2 + '/vocals.mp3'
					}
				]
			},
			track3: {
				loop: track3 + '/loop.mp3',
				parts: [
					{
						name: 'bass 1',
						source: track3 + '/bass1.mp3'
					},
					{
						name: 'bass 2',
						source: track3 + '/bass2.mp3'
					},
					{
						name: 'glitch',
						source: track1 + '/glitch.mp3'
					},
					{
						name: 'keys 1',
						source: track3 + '/keys1.mp3'
					},
					{
						name: 'keys 2',
						source: track3 + '/keys2.mp3'
					},
					{
						name: 'keys 3',
						source: track3 + '/keys3.mp3'
					},
					{
						name: 'vocals 1',
						source: track3 + '/vocals1.mp3'
					},
					{
						name: 'vocals 2',
						source: track3 + '/vocals2.mp3'
					}
				]
			}
		},

		partsWithLoop: function() {
			var parts = this.tracks[track].parts;
			parts.push({
				name: 'Loop',
				source: this.tracks[track].loop
			});

			return parts;
		},

		currentList: [],

		// return random sample from list
		getRandom: function() {

			// if list is empty, refill and empty current
			if (!this.tracks[track].parts.length) {
				this.tracks[track].parts = this.currentList.slice();
				this.currentList = [];
			}


			// find random sample
			const randomSample = this.tracks[track].parts[Math.floor(Math.random() * this.tracks[track].parts.length)];

			// add to current list
			this.currentList.push(randomSample);

			// remove from main list
			this.tracks[track].parts.splice(this.tracks[track].parts.indexOf(randomSample), 1);
			console.log(randomSample);

			return randomSample;
		}
	};
})();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
