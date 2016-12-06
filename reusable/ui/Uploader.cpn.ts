import {Component, Input, OnChanges}  from '@angular/core';
import {FileUploader} from 'ng2-file-upload/file-upload/file-uploader.class';
import ExtendedAuthHttp from '../ExtendedAuthHttp';

@Component({
    selector: 'uploader',
    template: `
        <div class="navbar navbar-default">
            <div class="navbar-header">
                <span class="navbar-brand">{{ title }}</span>
            </div>
        </div>

        <div class="expand-to-child">
            <div class="col-md-3">
                <div ng2FileDrop
                     [ngClass]="{'nv-file-over': hasBaseDropZoneOver}"
                     (fileOver)="fileOverBase($event)"
                     [uploader]="uploader"
                     class="well my-drop-zone">
                     Drag & drop
                </div>

                <input type="file" ng2FileSelect [uploader]="uploader" multiple />
            </div>

            <div class="col-md-9">
                <table class="table">
                    <thead>
                    <tr>
                        <th width="50%">Name</th>
                        <th>Size</th>
                        <th>Progress</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr *ngFor="let item of uploader.queue">
                        <td><strong>{{ item?.file?.name }}</strong></td>
                        <td *ngIf="uploader.isHTML5" nowrap>{{ item?.file?.size/1024/1024 | number:'.2' }} MB</td>
                        <td *ngIf="uploader.isHTML5">
                            <div class="progress" style="margin-bottom: 0;">
                                <div class="progress-bar" role="progressbar" [ngStyle]="{ 'width': item.progress + '%' }"></div>
                            </div>
                        </td>
                        <td class="text-center">
                            <span *ngIf="item.isSuccess">Uploaded.</span>
                            <span *ngIf="item.isCancel">Canceled.</span>
                            <span *ngIf="item.isError">Error occurs. Contact Developers</span>
                        </td>
                        <td nowrap>
                            <button type="button" class="btn btn-success btn-xs"
                                    (click)="item.upload()" [disabled]="item.isReady || item.isUploading || item.isSuccess">
                                <span class="glyphicon glyphicon-upload"></span> Upload
                            </button>
                            <button type="button" class="btn btn-danger btn-xs"
                                    (click)="item.remove()">
                                <span class="glyphicon glyphicon-trash"></span> Remove
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div class="col-xs-12">
                    <div>
                        Queue progress:
                        <div class="progress" style="">
                            <div class="progress-bar" role="progressbar" [ngStyle]="{ 'width': uploader.progress + '%' }"></div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-success btn-s"
                            (click)="uploader.uploadAll()" [disabled]="!uploader.getNotUploadedItems().length">
                        <span class="glyphicon glyphicon-upload"></span> Upload all
                    </button>
                    <button type="button" class="btn btn-warning btn-s"
                            (click)="uploader.cancelAll()" [disabled]="!uploader.isUploading">
                        <span class="glyphicon glyphicon-ban-circle"></span> Cancel all
                    </button>
                    <button type="button" class="btn btn-danger btn-s"
                            (click)="uploader.clearQueue()" [disabled]="!uploader.queue.length">
                        <span class="glyphicon glyphicon-trash"></span> Remove all
                    </button>
                </div>
            </div>
        </div>
    `
})
export default class UploaderComponent implements OnChanges {
    @Input('isInitializable') private isInitializable;
    @Input('baseUrl') private baseUrl;
    @Input('title') private title;
    @Input('uploadLimit') private uploadLimit = 1;
    private uploader: FileUploader;
    private authToken: string = '';
    public hasBaseDropZoneOver: boolean = false;

    constructor(authHttp: ExtendedAuthHttp) {
        this.authToken = authHttp.getToken();

        this.uploader = new FileUploader({
            url: '',
            authToken: 'Bearer ' + this.authToken
        });
    }

    ngOnChanges(change) {
        if ('isInitializable' in change && change.isInitializable) {
            this.onReadyToInitialize();
        }

        if ('baseUrl' in change) {
            this.onReadyToInitialize();
        }
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    onReadyToInitialize() {
        this.uploader.setOptions({
            url: this.baseUrl,
            queueLimit: this.uploadLimit,
            authToken: 'Bearer ' + this.authToken
        });

        this.uploader.queue.forEach((elem)=> {
            elem.alias = "photo";
            elem.url = this.baseUrl;
        });
    }
}