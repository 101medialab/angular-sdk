import {Directive, Input, OnInit, OnChanges, ElementRef} from '@angular/core';

@Directive({
    selector: '.hb-back-to-top',
})
export default class BackToTop implements OnInit, OnChanges {
    private $el;
    @Input('target') private target;
    private $target;

    constructor(private el: ElementRef) {
        this.$el = $(this.el.nativeElement);
    }

    ngOnInit() {
        this.$el.click(() => {
            this.$target.stop().animate({scrollTop: 0}, 400);
        });
    }

    ngOnChanges({target}) {
        if (target.currentValue) {
            this.$target = $(target.currentValue);
        }
    }
}