/// <reference path="../../typings/angular2.d.ts" />

import {FileUploader} from 'ng2-file-upload/file-upload/file-uploader.class';

export class ExtendedFileUploader extends FileUploader {
    public onCompleteItem(item: any, response: any, status: any, headers: any) {}
}