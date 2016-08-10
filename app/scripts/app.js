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
        'ngRoute',
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

        $scope.$on('ng.qnuploader.taskReady', function (event, args) {
            console.log(args);
        });

        $scope.$on('ng.qnuploader.error', function (event, args) {
            console.log(args);
        });

        $scope.$on('ng.qnuploader.fileReady', function (event, args) {
            console.log(args);
        });

        $scope.$on('ng.qnuploader.fileComplete', function (event, args) {
            console.log(args);
        });

        $scope.$on('ng.qnuploader.taskComplete', function (event, args) {
            console.log(args);
        });
    });
