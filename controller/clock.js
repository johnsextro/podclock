var startTime = undefined;

exports.start = function(startTime) {
	if (startTime == undefined) {
		this.startTime = new Date().getTime();
	}
}

exports.getTime = function() {
	return new Date().getTime() - this.startTime;
}