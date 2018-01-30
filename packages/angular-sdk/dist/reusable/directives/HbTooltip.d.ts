import { OnChanges, ElementRef } from '@angular/core';
import 'bootstrap-sass/assets/javascripts/bootstrap/tooltip.js';
export declare class HbTooltip implements OnChanges {
    private el;
    private $el;
    config: any;
    constructor(el: ElementRef);
    ngOnChanges({config}: any): void;
}
