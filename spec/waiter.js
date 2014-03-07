exports.sleep = function(millis) {
	var nowTime = new Date().getTime()
	var endTime = nowTime + millis;
	while (endTime > nowTime) {
		nowTime = new Date().getTime();
	}
}