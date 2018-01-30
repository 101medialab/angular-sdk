import { ElementRef, OnChanges } from '@angular/core';
import { Status } from '../modules/status.svc';
import { BaseComponent } from '../../HbComponent/BaseComponent';
export declare class ScrollToWhen extends BaseComponent implements OnChanges {
    private el;
    private $el;
    private isInitialize;
    private data;
    constructor(status: Status, el: ElementRef);
    scrollOnce(): void;
    ngAfterViewInit(): void;
    ngOnChanges({data}: {
        data: any;
    }): void;
}
