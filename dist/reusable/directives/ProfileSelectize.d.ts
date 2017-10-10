import { EventEmitter, ElementRef } from '@angular/core';
import { Selectize } from './Selectize';
export declare class ProfileSelectize extends Selectize {
    onChange: EventEmitter<{}>;
    protected options: any;
    private instance;
    constructor(el: ElementRef);
    setupSelectize(): void;
}
