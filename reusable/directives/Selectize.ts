import {Directive, Input, Output, EventEmitter, OnChanges, ElementRef} from '@angular/core';

@Directive({
    selector: 'selectize',
})
export class Selectize implements OnChanges {
    protected $el;
    protected list;
    @Input('selectize') protected options;

    // Pathetically you cannot inherit EventEmitter, add it manually
    @Output('onChange') onChange = new EventEmitter();

    constructor(protected el: ElementRef) {
        this.$el = $(el.nativeElement);
    }

    ngOnChanges({options}: {options: any}) {
        if (options.currentValue) {
            this.options = options.currentValue;

            this.setupSelectize();
        }
    }

    setupSelectize() {
        this.$el.selectize(this.options);
    }
}