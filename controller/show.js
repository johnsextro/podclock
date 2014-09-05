function Show() {

	var segments = [];

	this.createSegment = function(segmentName, discussion) {
		var index = segmentExists(segmentName);
		if(index != -1) {
			segments[index] = {"segmentName": segmentName, "discussion": discussion };
		} else {
			segments.push({"segmentName": segmentName, "discussion": discussion });	
		}
		
	}

	this.getSegment = function(segmentName){
		return findBySegmentName(segmentName);
	}

	function findBySegmentName(segmentName) {
	 	var index = segmentExists(segmentName)
	 	if(index != -1){
	 		return segments[index];
	 	}
	}

	function segmentExists(segmentName) {
		var exists = -1
		for (var i = 0; i < segments.length; i++) {
		    if (segments[i].segmentName === segmentName) {
		      exists = i;
		    }
	  	}
	  	return exists;
	}

}

module.exports = Show;