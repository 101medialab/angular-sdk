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
import { Directive, Input, ElementRef } from '@angular/core';
import { Status } from '../modules/status.svc';
import { BaseComponent } from '../../HbComponent/BaseComponent';
var ScrollToWhen = (function (_super) {
    __extends(ScrollToWhen, _super);
    function ScrollToWhen(status, el) {
        var _this = _super.call(this, status) || this;
        _this.el = el;
        _this.isInitialize = false;
        _this.$el = $(_this.el.nativeElement);
        return _this;
    }
    ScrollToWhen.prototype.scrollOnce = function () {
        var scrollTo = 'scrollTo' in this.data ?
            this.data.scrollTo :
            'childTarget' in this.data ?
                this.$el.find(this.data.childTarget).scrollTop()
                : null;
        if (scrollTo === null) {
            console.error('Directive ScrollToWhen cannot resolve scrollTo.', this, this.data);
        }
        this.$el.scrollTop(scrollTo);
    };
    ScrollToWhen.prototype.ngAfterViewInit = function () {
        this.scrollOnce();
    };
    ScrollToWhen.prototype.ngOnChanges = function (_a) {
        var _this = this;
        var data = _a.data;
        if (!this.isInitialize) {
            this.data = data.currentValue;
            if ('triggerNow' in this.data && this.data.triggerNow) {
                this.scrollOnce();
            }
            this.listen(this.data.event, [function () {
                    _this.scrollOnce();
                }], true);
            this.isInitialize = true;
        }
    };
    ScrollToWhen.decorators = [
        { type: Directive, args: [{
                    selector: '[scrollToWhen]'
                },] },
    ];
    /** @nocollapse */
    ScrollToWhen.ctorParameters = function () { return [
        { type: Status, },
        { type: ElementRef, },
    ]; };
    ScrollToWhen.propDecorators = {
        "data": [{ type: Input, args: ['scrollToWhen',] },],
    };
    return ScrollToWhen;
}(BaseComponent));
export { ScrollToWhen };
//# sourceMappingURL=ScrollToWhen.js.map