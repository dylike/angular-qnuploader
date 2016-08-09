# angular-qnuploader

This project is a angular directive to upload file to Qiniu at browser.

## Example
Demo

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

```html
<button ng-qnuploader="">
</button>
```

## Dependencies

Run `npm install` and `bower install`.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.
