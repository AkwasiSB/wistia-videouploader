/* angular.module(wistiaApp) is a global place for creating, registering and retrieving 
Angular modules */
var wistiaApp = angular.module('wistiaApp', ['ngRoute', 'angular-svg-round-progressbar', 'wistia-upload', 'wistiaApp.services', 'wistiaApp.controller']);



// wistiaApp config phase
wistiaApp.config(['$routeProvider', function ($routeProvider) {
    // Set page routings with $routeProvider
    $routeProvider
    .when('/', {
        controller: 'uploadCtrl',
        templateUrl: 'templates/upload-page.html'
    })
    .when('/video-player', {
        controller: 'videoPlayerCtrl',
        templateUrl: 'templates/videoplayer-page.html'
    })
    .otherwise({redirectTo: "/"});
}]);