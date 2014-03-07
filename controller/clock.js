var startTime = -1;
var pausedTime = 0;
var currentlyPaused = false;
var startPauseTime = -1;

exports.start = function(startTime) {
	if (this.startTime == -1) {
		this.startTime = new Date().getTime();
	}
}

exports.getTime = function() {
	if(this.startTime == -1) {
		return this.startTime;
	} else if (this.currentlyPaused) {
		return this.startPauseTime - this.startTime;
	} else {
		return (new Date().getTime() - this.pausedTime) - this.startTime;
	}
}

exports.pause = function() {
	if (!this.currentlyPaused) {
		this.currentlyPaused = true;
		this.startPauseTime = new Date().getTime();
	}
}

exports.resume = function() {
	if (this.currentlyPaused) {
		this.currentlyPaused = false;
		this.pausedTime += new Date().getTime() - this.startPauseTime;
		this.startPauseTime = -1;
	}
}

exports.reset = function() {
	this.startTime = -1;
	this.pausedTime = 0;
	this.currentlyPaused = false;
	this.startPauseTime = -1;
}