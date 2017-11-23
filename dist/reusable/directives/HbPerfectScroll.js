import { Directive, Input, ElementRef } from '@angular/core';
import 'perfect-scrollbar';
var HbPerfectScroll = (function () {
    function HbPerfectScroll(elemRef) {
        this.options = {};
        this.$el = $(elemRef.nativeElement);
        this.$el.perfectScrollbar({ wheelPropagation: true });
    }
    HbPerfectScroll.prototype.ngOnChanges = function (change) {
        if ('hb-perfect-scroll' in change) {
            var changes = change['hb-perfect-scroll'].currentValue;
            if (changes) {
                this.options = changes;
                if (!('options' in this.options)) {
                    this.options.options = {};
                }
            }
        }
        if (!('initializable' in this.options) ||
            this.options.initializable) {
            this.onReadyToInitialize();
        }
    };
    HbPerfectScroll.prototype.onReadyToInitialize = function () {
        this.$el.perfectScrollbar('update');
    };
    HbPerfectScroll.prototype.ngOnDestroy = function () {
        this.$el.perfectScrollbar('destroy');
    };
    HbPerfectScroll.decorators = [
        { type: Directive, args: [{
                    selector: '[hb-perfect-scroll]'
                },] },
    ];
    /** @nocollapse */
    HbPerfectScroll.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    HbPerfectScroll.propDecorators = {
        "options": [{ type: Input, args: ['hb-perfect-scroll',] },],
    };
    return HbPerfectScroll;
}());
export { HbPerfectScroll };
//# sourceMappingURL=HbPerfectScroll.js.map