import { ElementRef, OnChanges, OnDestroy } from '@angular/core';
import { EventDispatcher } from '../../HbComponent/EventDispatcher';
export declare class HbHeightModifier implements OnChanges, OnDestroy {
    private el;
    private eventDispatcher;
    private $el;
    private config;
    private isExpanded;
    constructor(el: ElementRef, eventDispatcher: EventDispatcher);
    ngOnChanges({config}: any): void;
    ngOnDestroy(): void;
}
