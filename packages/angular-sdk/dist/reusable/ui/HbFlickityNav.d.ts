import { ElementRef, OnChanges } from '@angular/core';
import { EventDispatcher } from '../../HbComponent/EventDispatcher';
import { Bindable } from '../Bindable';
export declare class HbFlickityNav implements OnChanges {
    protected eventDispatcher: EventDispatcher;
    protected viewInitialized: boolean;
    protected container: ElementRef;
    protected options: any;
    protected $el: any;
    protected instance: any;
    protected dimensions: any;
    isInitialized: Bindable;
    constructor(eventDispatcher: EventDispatcher);
    ngAfterViewInit(): void;
    ngOnChanges(change: any): void;
    onReadyToInitialize(): void;
    scroll(direction: any): void;
}
