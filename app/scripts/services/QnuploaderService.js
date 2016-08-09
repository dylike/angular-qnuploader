'use strict';

angular.module('ng.qnuploader').factory('QnuploaderService', [function () {

    var func = {};

    /**
     * @param len
     * @returns {string}
     */
    func.generateRandomAlphaNum = function (len) {
        var rdmString = "";
        for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2)) {
        }
        return rdmString.substr(0, len);
    };

    /**
     * if Qiniu is ready?
     * @returns {boolean}
     */
    func.ready = function () {
        return Qiniu ? true : false;
    };

    /**
     * return UploaderInstance
     * @returns {*|QiniuJsSDK}
     */
    func.getUploaderInstance = function () {
        return new QiniuJsSDK();
    };

    return func;
}]);
