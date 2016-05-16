module.exports = (function() {

	function BufferLoader(context, urlList, callback) {
		this.context = context;
		this.urlList = urlList;
		this.onload = callback;
		this.bufferList = {};
		this.loadCount = 0;
	}

	BufferLoader.prototype.loadBuffer = function(sampleObj, index) {
		// Load buffer asynchronously
		var request = new XMLHttpRequest();
		var url = sampleObj.source;
		var name = sampleObj.name;
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';

		var _this = this;

		request.onload = function() {
			// Asynchronously decode the audio file data in request.response
			_this.context.decodeAudioData(
				request.response,
				function(buffer) {
					if (!buffer) {
						alert('error decoding file data: ' + url);
						return;
					}

					_this.bufferList[name] = buffer;

					if (++_this.loadCount == _this.urlList.length) {
						_this.onload(_this.bufferList);
					}
				},

				function(error) {
					console.error('decodeAudioData error', error);
				}
			);
		};

		request.onerror = function() {
			alert('BufferLoader: XHR error');
		};

		request.send();
	};

	BufferLoader.prototype.load = function() {
		for (var i = 0; i < this.urlList.length; ++i) {
			console.log(this.urlList[i]);
			this.loadBuffer(this.urlList[i], i);
		}
	};

	return BufferLoader;

})();
