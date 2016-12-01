import {Directive, Input, Output, EventEmitter, OnChanges, ElementRef} from '@angular/core';
import {BaseComponent} from "../../HbComponent/BaseComponent";
import {setupProfileSelectize} from "../JSONEditor/plugin";

@Directive({
    selector: 'selectize',
})
export class Selectize implements OnChanges {
    protected $el;
    protected options;
    private list;
    @Input('selectize') private options;

    // Pathetically you cannot inherit EventEmitter, add it manually
    @Output('onChange') onChange = new EventEmitter();

    constructor(protected el: ElementRef) {
        this.$el = $(el.nativeElement);
    }

    ngOnChanges({options}) {
        if (options.currentValue) {
            this.options = options.currentValue;

            this.setupSelectize();
        }
    }

    setupSelectize() {
        this.$el.selectize(this.options);
    }
}