import {Directive, Input, OnChanges, ElementRef} from '@angular/core';
import 'bootstrap/js/tooltip.js'

@Directive({
    selector: '[hb-tooltip]',
})
export class HbTooltip implements OnChanges {
    private $el;
    @Input('hb-tooltip') private config;

    constructor(private el: ElementRef) {
        this.$el = $(this.el.nativeElement);
    }

    ngOnChanges({config}: {config: any}) {
        if (config.currentValue) {
            this.$el.tooltip(
                config.currentValue
            );
        }
    }
}