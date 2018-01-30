import { Directive, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import 'selectize';
var Selectize = (function () {
    function Selectize(el) {
        this.el = el;
        // Pathetically you cannot inherit EventEmitter, add it manually
        this.onChange = new EventEmitter();
        this.$el = $(el.nativeElement);
    }
    Selectize.prototype.ngOnChanges = function (_a) {
        var options = _a.options;
        if (options.currentValue) {
            this.options = options.currentValue;
            this.setupSelectize();
        }
    };
    Selectize.prototype.setupSelectize = function () {
        this.$el.selectize(this.options);
    };
    Selectize.decorators = [
        { type: Directive, args: [{
                    selector: 'selectize',
                },] },
    ];
    /** @nocollapse */
    Selectize.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    Selectize.propDecorators = {
        "options": [{ type: Input, args: ['selectize',] },],
        "onChange": [{ type: Output, args: ['onChange',] },],
    };
    return Selectize;
}());
export { Selectize };
//# sourceMappingURL=Selectize.js.map