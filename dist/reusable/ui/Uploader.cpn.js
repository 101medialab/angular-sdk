import { Component, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/file-upload/file-uploader.class';
import { ExtendedAuthHttp } from '../ExtendedAuthHttp';
var UploaderComponent = /** @class */ (function () {
    function UploaderComponent(authHttp) {
        this.uploadLimit = 1;
        this.authToken = '';
        this.hasBaseDropZoneOver = false;
        this.authToken = authHttp.getToken();
        this.uploader = new FileUploader({
            url: '',
            authToken: 'Bearer ' + this.authToken
        });
    }
    UploaderComponent.prototype.ngOnChanges = function (change) {
        if ('isInitializable' in change && change.isInitializable) {
            this.onReadyToInitialize();
        }
        if ('baseUrl' in change) {
            this.onReadyToInitialize();
        }
    };
    UploaderComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    UploaderComponent.prototype.onReadyToInitialize = function () {
        var _this = this;
        this.uploader.setOptions({
            url: this.baseUrl,
            queueLimit: this.uploadLimit,
            authToken: 'Bearer ' + this.authToken
        });
        this.uploader.queue.forEach(function (elem) {
            elem.alias = "photo";
            elem.url = _this.baseUrl;
        });
    };
    UploaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'uploader',
                    template: "\n        <div class=\"navbar navbar-default\">\n            <div class=\"navbar-header\">\n                <span class=\"navbar-brand\">{{ title }}</span>\n            </div>\n        </div>\n\n        <div class=\"expand-to-child\">\n            <div class=\"col-md-3\">\n                <div ng2FileDrop\n                     [ngClass]=\"{'nv-file-over': hasBaseDropZoneOver}\"\n                     (fileOver)=\"fileOverBase($event)\"\n                     [uploader]=\"uploader\"\n                     class=\"well my-drop-zone\">\n                     Drag & drop\n                </div>\n\n                <input type=\"file\" ng2FileSelect [uploader]=\"uploader\" multiple />\n            </div>\n\n            <div class=\"col-md-9\">\n                <table class=\"table\">\n                    <thead>\n                    <tr>\n                        <th width=\"50%\">Name</th>\n                        <th>Size</th>\n                        <th>Progress</th>\n                        <th>Status</th>\n                        <th>Actions</th>\n                    </tr>\n                    </thead>\n                    <tbody>\n                    <tr *ngFor=\"let item of uploader.queue\">\n                        <td><strong>{{ item?.file?.name }}</strong></td>\n                        <td *ngIf=\"uploader.isHTML5\" nowrap>{{ item?.file?.size/1024/1024 | number:'.2' }} MB</td>\n                        <td *ngIf=\"uploader.isHTML5\">\n                            <div class=\"progress\" style=\"margin-bottom: 0;\">\n                                <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{ 'width': item.progress + '%' }\"></div>\n                            </div>\n                        </td>\n                        <td class=\"text-center\">\n                            <span *ngIf=\"item.isSuccess\">Uploaded.</span>\n                            <span *ngIf=\"item.isCancel\">Canceled.</span>\n                            <span *ngIf=\"item.isError\">Error occurs. Contact Developers</span>\n                        </td>\n                        <td nowrap>\n                            <button type=\"button\" class=\"btn btn-success btn-xs\"\n                                    (click)=\"item.upload()\" [disabled]=\"item.isReady || item.isUploading || item.isSuccess\">\n                                <span class=\"glyphicon glyphicon-upload\"></span> Upload\n                            </button>\n                            <button type=\"button\" class=\"btn btn-danger btn-xs\"\n                                    (click)=\"item.remove()\">\n                                <span class=\"glyphicon glyphicon-trash\"></span> Remove\n                            </button>\n                        </td>\n                    </tr>\n                    </tbody>\n                </table>\n\n                <div class=\"col-xs-12\">\n                    <div>\n                        Queue progress:\n                        <div class=\"progress\" style=\"\">\n                            <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{ 'width': uploader.progress + '%' }\"></div>\n                        </div>\n                    </div>\n                    <button type=\"button\" class=\"btn btn-success btn-s\"\n                            (click)=\"uploader.uploadAll()\" [disabled]=\"!uploader.getNotUploadedItems().length\">\n                        <span class=\"glyphicon glyphicon-upload\"></span> Upload all\n                    </button>\n                    <button type=\"button\" class=\"btn btn-warning btn-s\"\n                            (click)=\"uploader.cancelAll()\" [disabled]=\"!uploader.isUploading\">\n                        <span class=\"glyphicon glyphicon-ban-circle\"></span> Cancel all\n                    </button>\n                    <button type=\"button\" class=\"btn btn-danger btn-s\"\n                            (click)=\"uploader.clearQueue()\" [disabled]=\"!uploader.queue.length\">\n                        <span class=\"glyphicon glyphicon-trash\"></span> Remove all\n                    </button>\n                </div>\n            </div>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    UploaderComponent.ctorParameters = function () { return [
        { type: ExtendedAuthHttp, },
    ]; };
    UploaderComponent.propDecorators = {
        'isInitializable': [{ type: Input, args: ['isInitializable',] },],
        'baseUrl': [{ type: Input, args: ['baseUrl',] },],
        'title': [{ type: Input, args: ['title',] },],
        'uploadLimit': [{ type: Input, args: ['uploadLimit',] },],
    };
    return UploaderComponent;
}());
export { UploaderComponent };
//# sourceMappingURL=Uploader.cpn.js.map