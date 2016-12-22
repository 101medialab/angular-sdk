import { EventEmitter, OnChanges, ElementRef } from '@angular/core';
import 'selectize';
export declare class Selectize implements OnChanges {
    protected el: ElementRef;
    protected $el: any;
    protected list: any;
    protected options: any;
    onChange: EventEmitter<{}>;
    constructor(el: ElementRef);
    ngOnChanges({options}: {
        options: any;
    }): void;
    setupSelectize(): void;
}
