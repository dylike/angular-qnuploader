'use strict';
/**
 *
 * @name 七牛文件上传的angular插件
 * @description make a button become a qiniu uploader button
 * @features
 * @dependencies angular
 * @author Yud
 */

angular.module('ng.qnuploader', [])
    .directive("ngQnuploader", ['QnuploaderService', function (QnuploaderService) {
        return {
            restrict: 'AE',
            scope: {
                'ngQnuploader': '=',
                'uploaderContainer': '@'
            },
            link: function (scope, element) {
                if (!QnuploaderService.ready()) {
                    scope.$emit('ng.qnuploader.error', {
                        code: 1
                    });
                } else {
                    //find button and container
                    var _button = element;
                    var _container = angular.element(scope.uploaderContainer);

                    _button.attr('id', _button.attr('id') + QnuploaderService.generateRandomAlphaNum(5));
                    _container.attr('id', _container.attr('id') + QnuploaderService.generateRandomAlphaNum(5));

                    var _buttonId = _button.attr('id');
                    var _containerId = _container.attr('id');

                    var config = scope.ngQnuploader;

                    var uploaderInstance = QnuploaderService.getUploaderInstance();

                    uploaderInstance.uploader({
                            runtimes: 'html5,flash,html4',    //上传模式,依次退化
                            browse_button: _buttonId,       //上传选择的点选按钮，**必需**
                            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
                            //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
                            uptoken_url: config.uptokenUrl,
                            // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
                            unique_names: true,
                            // save_key: true,
                            // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
                            //bucket 域名，下载资源时用到，**必需**
                            domain: config.domain,
                            container: _containerId,           //上传区域DOM ID，默认是browser_button的父元素，
                            max_file_size: config.maxSize,           //最大文件体积限制
                            flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
                            max_retries: 3,                   //上传失败最大重试次数
                            dragdrop: true,                   //开启可拖曳上传
                            drop_element: _containerId,        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                            chunk_size: '4mb',                //分块上传时，每片的体积
                            auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                            init: {

                                'FilesAdded': function (up, files) {
                                    scope.$emit('ng.qnuploader.taskReady', {
                                        up: up,
                                        files: files
                                    });
                                },

                                /**
                                 * @param up
                                 * @param file
                                 * @constructor
                                 */
                                'BeforeUpload': function (up, file) {
                                    // 每个文件上传前,处理相关的事情
                                    /**
                                     * 第一步检查是否到达上限
                                     * 如超过limit的上限，则抛错
                                     * @暂时不做
                                     */
                                    scope.$emit('ng.qnuploader.fileReady', {
                                        up: up,
                                        file: file
                                    });
                                },

                                /**
                                 * @constructor
                                 */
                                'UploadProgress': function () {
                                    // 每个文件上传时,处理相关的事情
                                },

                                /**
                                 * @param up
                                 * @param file
                                 * @param info
                                 * @constructor
                                 */
                                'FileUploaded': function (up, file, info) {
                                    // 每个文件上传成功后,处理相关的事情
                                    // 其中 info 是文件上传成功后，服务端返回的json，形式如
                                    // {
                                    //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                                    //    "key": "gogopher.jpg"
                                    //  }
                                    // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
                                    // var domain = up.getOption('domain');
                                    // var res = parseJSON(info);
                                    // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
                                    /**
                                     * JSONParse info
                                     * 获取key，组合为链接地址 sourceLink
                                     * 在ngModel中push新元素
                                     */
                                    var domain = up.getOption('domain');
                                    var res = JSON.parse(info);
                                    var sourceLink = domain + res.key; //获取上传成功后的文件的Url
                                    scope.$emit('ng.qnuploader.fileUploaded', {
                                        link: sourceLink,
                                        res: res,
                                        file: file
                                    });
                                },

                                /**
                                 * @param up
                                 * @param err
                                 * @param errTip
                                 * @constructor
                                 */
                                'Error': function (up, err, errTip) {
                                    //上传出错时,处理相关的事情
                                    scope.$emit('ng.qnuploader.error', {
                                        code: 2,
                                        up: up,
                                        err: err,
                                        errTip: errTip
                                    });
                                },

                                'UploadComplete': function (up, files) {
                                    //队列文件处理完毕后,处理相关的事情
                                    scope.$emit('ng.qnuploader.taskComplete', {
                                        up: up,
                                        files: files
                                    });
                                },

                                'Key': function () {
                                    // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                                    // 该配置必须要在 unique_names: false , save_key: false 时才生效
                                }
                            }
                        }
                    );
                }
            }
        };
    }]);
