import {Directive, Input, OnChange, ElementRef} from '@angular/core';
import {BaseComponent} from "../../HbComponent/BaseComponent";
import 'bootstrap/js/tooltip.js'

@Directive({
    selector: '[hb-tooltip]',
})
export class HbTooltip implements OnChange {
    private $el;
    @Input('hb-tooltip') private config;

    constructor(private el: ElementRef) {
        this.$el = $(this.el.nativeElement);
    }

    ngOnChanges({config}) {
        if (config.currentValue) {
            this.$el.tooltip(
                config.currentValue
            );
        }
    }
}