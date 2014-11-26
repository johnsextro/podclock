var Show = function () {
	this.data = {
		id: null,
		showNumber: null,
		podcast: null,
		notes: null
	};

	this.fill = function (info) {
		for(var prop in this.data) {
			if(this.data[prop] !== 'undefined') {
				this.data[prop] = info[prop];
			}
		}
	};

	this.getInformation = function () {	
		return this.data;
	};
};

	

module.exports = function (info) {
	var instance = new Show();

	instance.fill(info);

	return instance;
};