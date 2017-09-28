import { ElementRef, OnChanges, OnDestroy } from '@angular/core';
export declare class HbPerfectScroll implements OnChanges, OnDestroy {
    options: any;
    private $el;
    constructor(elemRef: ElementRef);
    ngOnChanges(change: any): void;
    onReadyToInitialize(): void;
    ngOnDestroy(): void;
}
