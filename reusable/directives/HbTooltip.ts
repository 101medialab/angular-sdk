import {Directive, Input, OnChanges, ElementRef} from '@angular/core';
import 'bootstrap-sass/assets/javascripts/bootstrap/tooltip.js';

@Directive({
    selector: '[hb-tooltip]',
})
export class HbTooltip implements OnChanges {
    private $el;
    @Input('hb-tooltip') public config: any;

    constructor(private el: ElementRef) {
        this.$el = $(this.el.nativeElement);
    }

    ngOnChanges({config}: any) {
        if (config.currentValue) {
            this.$el.tooltip(
                config.currentValue
            );
        }
    }
}