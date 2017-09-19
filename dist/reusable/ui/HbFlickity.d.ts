import { ElementRef, OnChanges } from '@angular/core';
import { EventDispatcher } from '../../HbComponent/EventDispatcher';
import 'flickity-bg-lazyload';
export declare class HbFlickity implements OnChanges {
    protected eventDispatcher: EventDispatcher;
    protected viewInitialized: boolean;
    protected container: ElementRef;
    protected options: any;
    protected $el: any;
    protected $slider: any;
    protected Flickity: any;
    protected instance: any;
    constructor(eventDispatcher: EventDispatcher);
    ngAfterViewInit(): void;
    ngOnChanges(change: any): void;
    onReadyToInitialize(): void;
    onInitialized(): void;
}
