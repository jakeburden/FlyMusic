
// samples list and random sample generator
module.exports = (function(sample, random) {

	'use strict';

	const track1 = 'fly-music-samples/Track 1';
	const track2 = 'fly-music-samples/Track 2';
	const track3 = 'fly-music-samples/Track 3';

	const track = process.env.TRACK || 'track1';

	let sampleCount = -1;

	console.log('track', track);
	return {

		// list of samples
		tracks: {
			track1: {
				loop: track1 + '/loop.mp3',
				parts: [
					{
						name: 'Mirror Ball Synth 1',
						source: track1 + '/Mirror Ball Synth 1.mp3'
					},
					{
						name: 'Mirror Ball Synth 2',
						source: track1 + '/Mirror Ball Synth 2.mp3'
					},
					{
						name: 'Seismic Hammer Bass',
						source: track1 + '/Seismic Hammer Bass.mp3'
					},
					{
						name: 'Breaking Up Synth Chords 1',
						source: track1 + '/Breaking Up Synth Chords 1.mp3'
					},
					{
						name: 'Breaking Up Synth Chords 2',
						source: track1 + '/Breaking Up Synth Chords 2.mp3'
					},
					{
						name: 'Cali Swag Choir',
						source: track1 + '/Cali Swag Choir.mp3'
					},
					{
						name: 'Gospel Improv',
						source: track1 + '/Gospel Improv.mp3'
					},
					{
						name: 'Boom',
						source: track1 + '/Boom.mp3'
					}
				],
			},
			track2: {
				loop: track2 + '/loop.mp3',
				parts: [
					{
						name: 'Dutch Trumpet Synth',
						source: track2 + '/Dutch Trumpet Synth.mp3'
					},
					{
						name: 'Luscious Chords Synth 1',
						source: track2 + '/Luscious Chords Synth 1.mp3'
					},
					{
						name: 'Luscious Chords Synth 2',
						source: track2 + '/Luscious Chords Synth 2.mp3'
					},
					{
						name: 'Seoul Sun Synth',
						source: track2 + '/Seoul Sun Synth.mp3'
					},
					{
						name: 'Stab Flute Synth 1',
						source: track2 + '/Stab Flute Synth 1.mp3'
					},
					{
						name: 'Stab Flute Synth 2',
						source: track2 + '/Stab Flute Synth 2.mp3'
					},
					{
						name: 'Pikes Peak Synth',
						source: track2 + '/Pikes Peak Synth.mp3'
					},
					{
						name: 'Bailey Vocal',
						source: track2 + '/Bailey Vocal.mp3'
					}
				]
			},
			track3: {
				loop: track3 + '/loop.mp3',
				parts: [
					{
						name: 'Sweeping Waves 1',
						source: track3 + '/Sweeping Waves 1.mp3'
					},
					{
						name: 'Sweeping Waves 2',
						source: track3 + '/Sweeping Waves 2.mp3'
					},
					{
						name: 'Chunky Synth 1',
						source: track3 + '/Chunky Synth 1.mp3'
					},
					{
						name: 'Chunky Synth 2',
						source: track3 + '/Chunky Synth 2.mp3'
					},
					{
						name: 'Chunky Synth 3',
						source: track3 + '/Chunky Synth 3.mp3'
					},
					{
						name: 'Brand New Vocal',
						source: track3 + '/Brand New Vocal.mp3'
					},
					{
						name: 'Words Vocal',
						source: track3 + '/Words Vocal.mp3'
					},
					{
						name: 'Build Up Synth',
						source: track3 + '/Build Up Synth.mp3'
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
		},

		getNext() {
			sampleCount = sampleCount === this.tracks[track].parts.length - 1 ? 0 : sampleCount + 1;
			return this.tracks[track].parts[sampleCount];
		}
	};
})();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
