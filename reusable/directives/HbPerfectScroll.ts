import {Directive, Input, ElementRef, OnChanges, OnDestroy} from '@angular/core';
import 'noraesae/perfect-scrollbar/js/perfect-scrollbar.jquery.min';
import {Bindable} from "../Bindable";

@Directive({
    selector: '[hb-perfect-scroll]'
})
export class HbPerfectScroll implements OnChanges, OnDestroy {
    @Input('hb-perfect-scroll') options: {} = {};
    private $el;

    constructor(elemRef: ElementRef) {
        this.$el = $(elemRef.nativeElement);
        this.$el.perfectScrollbar({wheelPropagation: true});
    }

    ngOnChanges(change) {
        if ('hb-perfect-scroll' in change) {
            let changes = change['hb-perfect-scroll'].currentValue;

            if (changes) {
                this.options = changes;

                if (!('options' in this.options)) {
                    this.options.options = {};
                }
            }
        }

        if (
            !('initializable' in this.options) ||
            this.options.initializable
        ) {
            this.onReadyToInitialize();
        }
    }

    onReadyToInitialize() {
        this.$el.perfectScrollbar('update');
    }

    ngOnDestroy() {
        this.$el.perfectScrollbar('destroy');
    }
}
