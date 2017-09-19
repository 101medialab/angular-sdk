import { OnChanges } from '@angular/core';
import { ExtendedAuthHttp } from '../ExtendedAuthHttp';
export declare class UploaderComponent implements OnChanges {
    private isInitializable;
    private baseUrl;
    private title;
    private uploadLimit;
    private uploader;
    private authToken;
    hasBaseDropZoneOver: boolean;
    constructor(authHttp: ExtendedAuthHttp);
    ngOnChanges(change: any): void;
    fileOverBase(e: any): void;
    onReadyToInitialize(): void;
}
