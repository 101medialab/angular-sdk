var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Directive, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { setupProfileSelectize } from '../JSONEditor/plugin';
import { Selectize } from './Selectize';
var ProfileSelectize = (function (_super) {
    __extends(ProfileSelectize, _super);
    function ProfileSelectize(el) {
        var _this = _super.call(this, el) || this;
        // Pathetically you cannot inherit EventEmitter, add it manually
        _this.onChange = new EventEmitter();
        _this.instance = null;
        return _this;
    }
    ProfileSelectize.prototype.setupSelectize = function () {
        var _this = this;
        this.instance = setupProfileSelectize(this.$el, $.extend(true, this.options, {
            options: this.list,
            selectizeOptions: {
                onChange: function (slug) {
                    _this.onChange.emit({ slug: slug, instance: _this.instance });
                }
            }
        }));
    };
    ProfileSelectize.decorators = [
        { type: Directive, args: [{
                    selector: '[profileSelectize]',
                },] },
    ];
    /** @nocollapse */
    ProfileSelectize.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    ProfileSelectize.propDecorators = {
        "onChange": [{ type: Output, args: ['onChange',] },],
        "options": [{ type: Input, args: ['profileSelectize',] },],
    };
    return ProfileSelectize;
}(Selectize));
export { ProfileSelectize };
//# sourceMappingURL=ProfileSelectize.js.map