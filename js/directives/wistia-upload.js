angular.module('wistia-upload', [])



// wistia upload service for the wistia-upload directive
.factory('wistiaUploadService', ['$rootScope', function($rootScope) {
    return {
        startUpload: function(data) {
            // upload only one file
            var file = data.files[0];

            // support only video files
            var regexp = /(\.|\/)(mp4|3gp|webm|mov|m4a|m4v|quicktime|ogg)$/i;

            // upload data info object
            var fileUpload = {};

            // Using the filename extension for our test
            if (!regexp.test(file.name)) {
                return;
            }

            fileUpload.jqXHR = data.submit()
            .success(function (result, textStatus, jqXHR) {
                // broadcast upload success event passing in return data from server
                $rootScope.$broadcast('wistiaUploadSuccess', result);
            })
            .error(function (jqXHR, textStatus, error) {
                // broadcast upload error event passing in error message
                $rootScope.$broadcast('wistiaUploadError', textStatus);
            });

            fileUpload.filename = file.name;

            // broadcast upload start event passing in upload data info object
            $rootScope.$broadcast('wistiaUploadStart', fileUpload);
        },

        uploadProgress: function(progress) {
            // broadcast upload progress event passing in progress percentage complete
            $rootScope.$broadcast('wistiaUploadProgress', progress);
        }
    };
}])



// wistia upload attribute directive
.directive('wistiaUpload', ['wistiaUploadService', function(wistiaUploadService) {
	return {
		restrict: 'A',

        link: function (scope, element, attrs) {
        	// initialise jquery-file-upload pluging on the input file
            $(element).fileupload({
                // url to upload file to
            	url: 'https://upload.wistia.com',

                // return data type from destination server
            	dataType: 'json',

                // file uploads are sent as multipart/form-data
            	multipart: true,

                // form data to be sent with the file to server containing wistia api password
            	formData: {
            		api_password: '7e8fecf05917c24b376d988184655dddf6a6091e45b138a7787f5d97dad80499'
            	},

                // function to be called when a file is selected
            	add: function(e, data) {
            		wistiaUploadService.startUpload(data);
                },

                // function to be called when upload is in progress
                progressall: function(e, data) {
                	var progress = parseInt(data.loaded / data.total * 100, 10);
                	wistiaUploadService.uploadProgress(progress);
                }
			});
		}
	};
}]);