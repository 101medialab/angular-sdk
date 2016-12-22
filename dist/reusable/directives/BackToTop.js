import { Directive, Input, ElementRef } from '@angular/core';
var BackToTop = (function () {
    function BackToTop(el) {
        this.el = el;
        this.$el = $(this.el.nativeElement);
    }
    BackToTop.prototype.ngOnInit = function () {
        var _this = this;
        this.$el.click(function () {
            _this.$target.stop().animate({ scrollTop: 0 }, 400);
        });
    };
    BackToTop.prototype.ngOnChanges = function (_a) {
        var target = _a.target;
        if (target.currentValue) {
            this.$target = $(target.currentValue);
        }
    };
    BackToTop.decorators = [
        { type: Directive, args: [{
                    selector: '.hb-back-to-top',
                },] },
    ];
    /** @nocollapse */
    BackToTop.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    BackToTop.propDecorators = {
        'target': [{ type: Input, args: ['target',] },],
    };
    return BackToTop;
}());
export { BackToTop };
//# sourceMappingURL=BackToTop.js.map