import { ElementRef, OnChanges } from '@angular/core';
import { Status } from '../modules/status.svc';
import { BaseComponent } from '../../HbComponent/BaseComponent';
export declare class EmitWhenViewportChanges extends BaseComponent implements OnChanges {
    private el;
    private $el;
    private isInitialized;
    private config;
    constructor(status: Status, el: ElementRef);
    ngOnChanges({config}: {
        config: any;
    }): void;
}
