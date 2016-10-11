angular.module('wistiaApp.controller', [])



.controller('uploadCtrl', ['$scope', '$location', '$timeout', 'videoDataService', function ($scope, $location, $timeout, videoDataService) {
	// for toggling the visibility state of dom elements
	$scope.startUpload = false;

	// progress bar percentage
	$scope.cProgress = 0;

	// store data from jquery-file-upload plugin when uploading a file
	var uploadData = {};

    // listen for the start of an upload
    $scope.$on('wistiaUploadStart', function(e, data) {
    	uploadData = data;
    	$scope.startUpload = true;
    	$scope.$digest();
    });

    // listen for successful upload
    $scope.$on('wistiaUploadSuccess', function(e, data) {
    	videoDataService.set(data);

    	$scope.$apply(function() {
    		$location.path('video-player');
    		$scope.startUpload = false;
    		$scope.cProgress = 0;
    	});
    });

    // listen for upload progress
    $scope.$on('wistiaUploadProgress', function(e, data) {
    	$scope.cProgress = data;
    	$scope.$digest();
    });

    // listen for error during an upload
    $scope.$on('wistiaUploadError', function(e, data) {
    	$scope.startUpload = false;
    	$scope.cProgress = 0;

    	var message;

    	if (data == 'error') {
    		message = 'An unknown error occured while uploading the file. Retry';
    	} else if (data == 'abort') {
    		message = 'File upload cancelled';
    	}

		$('.notification').css({background: 'red', display: 'block'});
    	$('.notifytext').html(message);

    	$timeout(function () {
    		$('.notification').css({background: 'none', display: 'none'});
    		$('.notifytext').html('');
    	}, 5000);
    });

    // styles for styling the round progressbar
    $scope.getStyle = function() {
        var transform = 'translateY(-50%) translateX(-50%)';

        return {
            'top': '50%',
            'bottom': 'auto',
            'left': '50%',
            'transform': transform,
            '-moz-transform': transform,
            '-webkit-transform': transform,
            'font-size': 100/5.2 + 'px'
        };
    };

    // function for cancelling an ongoing upload if any
    $scope.cancelUpload = function() {
    	uploadData.jqXHR.abort();
    };
}])



.controller('videoPlayerCtrl', ['$scope', '$sce', 'videoDataService', function ($scope, $sce, videoDataService) {
	// retrieve wistia video data from upload
	var videodata = videoDataService.get();

	// set wistia iframe src from hashed_id
	var url = 'https://fast.wistia.net/embed/iframe/'+ videodata.hashed_id +'?videoFoam=true';

	// bind video src from a trusted url
	$scope.videoSrc = $sce.trustAsResourceUrl(url);
}]);