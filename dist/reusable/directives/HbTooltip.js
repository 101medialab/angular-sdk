import { Directive, Input, ElementRef } from '@angular/core';
import 'bootstrap-sass/assets/javascripts/bootstrap/tooltip.js';
var HbTooltip = (function () {
    function HbTooltip(el) {
        this.el = el;
        this.$el = $(this.el.nativeElement);
    }
    HbTooltip.prototype.ngOnChanges = function (_a) {
        var config = _a.config;
        if (config.currentValue) {
            this.$el.tooltip(config.currentValue);
        }
    };
    HbTooltip.decorators = [
        { type: Directive, args: [{
                    selector: '[hb-tooltip]',
                },] },
    ];
    /** @nocollapse */
    HbTooltip.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    HbTooltip.propDecorators = {
        'config': [{ type: Input, args: ['hb-tooltip',] },],
    };
    return HbTooltip;
}());
export { HbTooltip };
//# sourceMappingURL=HbTooltip.js.map