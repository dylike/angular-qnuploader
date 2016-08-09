'use strict';

/**
 * @ngdoc overview
 * @name angularQnuploaderApp
 * @description
 * # angularQnuploaderApp
 *
 * Main module of the application.
 */
angular
    .module('angularQnuploaderApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ng.qnuploader'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            });

    })
    .controller('MainCtrl', function ($scope) {
        console.log('MainCtrl');

        $scope.config = {
            domain: 'http://7xixj1.com1.z0.glb.clouddn.com/',
            uptokenUrl: 'http://test.maikeji.cn:4000/qiniu/uptoken',
            maxSize: '1M',
            mimeTypes: [
                {title: "Image files", extensions: "jpg,jpeg,gif,png"}
            ]
        };

        $scope.$on('ng.qnuploader.filesAdded', function (event, args) {
            console.log(args);
        });

        $scope.$on('ng.qnuploader.error', function (event, args) {
            console.log(args);
        });

        $scope.$on('ng.qnuploader.beforeUpload', function (event, args) {
            console.log(args);
        });

        $scope.$on('ng.qnuploader.fileUploaded', function (event, args) {
            console.log(args);
        });

        $scope.$on('ng.qnuploader.uploadComplete', function (event, args) {
            console.log(args);
        });
    });
