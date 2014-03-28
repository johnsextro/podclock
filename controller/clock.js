function Podclock () {

	this.startTime = 0;
	this.pausedTime = 0;
	this.currentlyPaused = false;
	this.startPauseTime = -1;
	this.isStarted = false;

	this.start = function(startTime) {
		if (!this.isClockStarted()) {
			this.isStarted = true;
			this.startTime = new Date().getTime();
		}
	};

	this.getTime = function() {
    	var millis = this.getMillis();
    	x = millis / 1000
	  	var seconds = pad(Math.floor(x % 60),2);
	  	x /= 60
	  	var minutes = pad(Math.floor(x % 60),2);
	  	x /= 60
	  	var hours = pad(Math.floor(x % 24),2);
	  	x /= 24
	    return hours + ":" + minutes + ":" + seconds;
	};

	this.getMillis = function() {
		if(!this.isClockStarted()) {
			return this.startTime;
		} else if (this.currentlyPaused) {
			return this.startPauseTime - this.pausedTime - this.startTime;
		} else {
			return (new Date().getTime() - this.pausedTime) - this.startTime;
		}
	};

	this.pause = function() {
		if ((this.isClockStarted) && (!this.currentlyPaused)) {
			this.currentlyPaused = true;
			this.startPauseTime = new Date().getTime();
		}
	};

	this.resume = function() {
		if (this.currentlyPaused) {
			this.currentlyPaused = false;
			this.pausedTime += new Date().getTime() - this.startPauseTime;
			this.startPauseTime = -1;
		}
	};

	this.reset = function() {
		this.startTime = 0;
		this.isStarted = false;
		this.pausedTime = 0;
		this.currentlyPaused = false;
		this.startPauseTime = -1;
	};

	this.isClockStarted = function() {
		return this.isStarted;
	};

	this.isClockPaused = function() {
		return this.currentlyPaused;
	}

	function pad(num, size) {
    	var s = "000000000" + num;
    	return s.substr(s.length-size);
	}

}

module.exports = Podclock;