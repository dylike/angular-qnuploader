# angular-qnuploader

This project is a angular directive to upload file to Qiniu at browser.

## Example
[Demo](https://dylike.github.io/angular-qnuploader)

## Event

### ng.qnuploader.error
if something wrong, you can listen ng.qnuploader.error and make something better.

### ng.qnuploadert.taskReady
when all files added, and ready to upload, single or multiple.
- up: refer to qiniu.
- files: refer to qiniu.

### ng.qnuploader.taskComplete
when upload task is complete, will trick ng.qnuploader.uploadComplete event.
- up:
- files:

### ng.qnuploader.fileReady
one file in a upload task is ready to upload.
- up:
- file:

### ng.qnuploader.fileComplete
one file in a upload task is uploaded.
- file:
- res:
- link:

## Upload Config

- domain: qiniu domain like 'http://7xixj1.com1.z0.glb.clouddn.com/'.
- uptokenUrl: backend server to generate uptoken url.
- maxSize: maxSize like '1M'
- mimeTypes: like [{title: 'Image files', extensions: 'jpg,png,svg,gif'}]

## Usage

```html
<!-- angular.js first -->
<script src="path/to/angular.js"></script>
<script src="path/to/angular-qnuploader.min.js"></script>
```

```js
angular.module('your app',[
    ...
    'ng.qnuploader'
])
```

```js
angular.module('your app').controller('your controller', function($scope){
    $scope.qnuploaderConfig = {
        domain: 'http://7xixj1.com1.z0.glb.clouddn.com/',
        uptokenUrl: 'http://test.maikeji.cn:4000/qiniu/uptoken',
        maxSize: '1M',
        mimeTypes: [
            {title: "Image files", extensions: "jpg,jpeg,gif,png"}
        ]
    };
    
    $scope.$on('ng.qnuploader.error', function(event,args){
        // do something when error happen.
        // args.code
    });
    
    $scope.$on('ng.qnuploader.taskReady', function(event,args){
        // do something when task ready.
        // args.up
        // args.files
    });
    
    $scope.$on('ng.qnuploader.taskComplete', function(event,args){
        // do something when task complete.
        // args.up
        // args.files
    });
    
    $scope.$on('ng.qnuploader.fileReady', function(event,args){
        // do something when a single file ready in a task.
        // args.up
        // args.file
    });
    
    $scope.$on('ng.qnuploader.fileComplete', function(event,args){
        // do something when a single file uploaded in a task.
        // args.file
        // args.link
        // args.res
    });
})
```

```html
<div id="container">
    <!-- drag to this area to upload -->
</div>

<button ng-qnuploader="qnuploaderConfig" qnuploader-Container="#container">
</button>
```

## Dependencies

Run `npm install` and `bower install`.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.
