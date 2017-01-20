import {Directive, Input, Output, EventEmitter, OnChanges, ElementRef} from '@angular/core';
import {setupProfileSelectize} from '../JSONEditor/plugin';
import {Selectize} from './Selectize';

@Directive({
    selector: '[profileSelectize]',
})
export class ProfileSelectize extends Selectize {
    // Pathetically you cannot inherit EventEmitter, add it manually
    @Output('onChange') onChange = new EventEmitter();
    @Input('profileSelectize') private options;
    private instance = null;

    constructor(el: ElementRef) {
        super(el);
    }

    setupSelectize() {
        this.instance = setupProfileSelectize(this.$el,
            $.extend(true, this.options, {
                options: this.list,
                selectizeOptions: {
                    onChange: (slug) => {
                        this.onChange.emit({slug, instance: this.instance});
                    }
                }
            })
        );
    }
}