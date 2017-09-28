import { ElementRef, OnChanges } from '@angular/core';
import { EventDispatcher } from '../../HbComponent/EventDispatcher';
import { HbFlickity } from './HbFlickity';
export declare class HbCollectionFlickity extends HbFlickity implements OnChanges {
    protected options: any;
    protected container: ElementRef;
    constructor(eventDispatcher: EventDispatcher);
    ngOnChanges(change: any): void;
    onInitialized(): void;
}
