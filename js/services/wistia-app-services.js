angular.module('wistiaApp.services', [])



// video data service for manipulating video data from wistia
.factory('videoDataService', [function() {
	// store data info here
	var videoData = {};

	return {
		set: function(data) {
			// set the video data
			videoData = data;
		},

		get: function() {
			// return the video data
			return videoData;
		}
	};
}]);