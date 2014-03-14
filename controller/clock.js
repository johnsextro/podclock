function Podclock () {

	this.startTime = -1;
	this.pausedTime = 0;
	this.currentlyPaused = false;
	this.startPauseTime = -1;

	this.start = function(startTime) {
		if (this.startTime == -1) {
			this.startTime = new Date().getTime();
		}
	};

	this.getTime = function() {
		if(this.startTime == -1) {
			return this.startTime;
		} else if (this.currentlyPaused) {
			return this.startPauseTime - this.pausedTime - this.startTime;
		} else {
			return (new Date().getTime() - this.pausedTime) - this.startTime;
		}
	};

	this.pause = function() {
		if ((this.startTime != -1) && (!this.currentlyPaused)) {
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
		this.startTime = -1;
		this.pausedTime = 0;
		this.currentlyPaused = false;
		this.startPauseTime = -1;
	};

}

module.exports = Podclock;