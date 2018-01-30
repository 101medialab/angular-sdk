import { OnChanges } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/file-upload/file-uploader.class';
import { ExtendedAuthHttp } from '../ExtendedAuthHttp';
export declare class UploaderComponent implements OnChanges {
    private isInitializable;
    private baseUrl;
    title: any;
    private uploadLimit;
    uploader: FileUploader;
    private authToken;
    hasBaseDropZoneOver: boolean;
    constructor(authHttp: ExtendedAuthHttp);
    ngOnChanges(change: any): void;
    fileOverBase(e: any): void;
    onReadyToInitialize(): void;
}
