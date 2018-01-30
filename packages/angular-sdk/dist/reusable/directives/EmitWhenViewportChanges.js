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
import * as RxDOM from 'rx-dom';
var EmitWhenViewportChanges = (function (_super) {
    __extends(EmitWhenViewportChanges, _super);
    function EmitWhenViewportChanges(status, el) {
        var _this = _super.call(this, status) || this;
        _this.el = el;
        _this.isInitialized = false;
        _this.$el = $(_this.el.nativeElement);
        return _this;
    }
    EmitWhenViewportChanges.prototype.ngOnChanges = function (_a) {
        var _this = this;
        var config = _a.config;
        if (!this.isInitialized) {
            this.config = config.currentValue;
            if (!('refreshRate' in this.config)) {
                this.config.refreshRate = 100;
            }
            var $target = $(this.config.target ? this.config.target : window), prevIsAppearedStatus_1 = false, prevIsDisappearedStatus_1 = false, $window_1 = $(window);
            var observable_1 = RxDOM.DOM.scroll($target[0]);
            if (this.config.refreshRate !== 0) {
                observable_1.throttle(this.config.refreshRate);
            }
            this.config = $.extend(true, {
                offsetViewport: {
                    top: 0,
                    bottom: 0
                }
            }, this.config);
            observable_1.subscribe(function () {
                var docViewTop = $window_1.scrollTop() + _this.config.offsetViewport.top, docViewBottom = docViewTop + $window_1.outerHeight() + _this.config.offsetViewport.bottom, elemTop = _this.$el.offset().top, elemBottom = elemTop + _this.$el.outerHeight(), isAppeared = elemBottom >= docViewTop && elemTop <= docViewBottom, isDisappeared = elemBottom <= docViewTop || elemTop >= docViewBottom;
                if (prevIsAppearedStatus_1 != isAppeared) {
                    if (isAppeared && 'appear' in _this.config) {
                        (_this.config.appear instanceof Array ?
                            _this.config.appear :
                            [_this.config.appear]).forEach(function (event) {
                            _this.emit(event);
                        });
                    }
                    prevIsAppearedStatus_1 = isAppeared;
                }
                if (prevIsDisappearedStatus_1 != isDisappeared) {
                    if (isDisappeared && 'disappear' in _this.config) {
                        (_this.config.disappear instanceof Array ?
                            _this.config.disappear :
                            [_this.config.disappear]).forEach(function (event) {
                            _this.emit(event);
                        });
                    }
                    prevIsDisappearedStatus_1 = isDisappeared;
                }
            });
            // TODO: This part is not working. Event emitted but not disposed.
            this.listen(config.stopEmitWhen, [function () {
                    observable_1.dispose();
                }]);
            this.isInitialized = true;
        }
    };
    EmitWhenViewportChanges.decorators = [
        { type: Directive, args: [{
                    selector: '[emitWhenViewportChanges]'
                },] },
    ];
    /** @nocollapse */
    EmitWhenViewportChanges.ctorParameters = function () { return [
        { type: Status, },
        { type: ElementRef, },
    ]; };
    EmitWhenViewportChanges.propDecorators = {
        "config": [{ type: Input, args: ['emitWhenViewportChanges',] },],
    };
    return EmitWhenViewportChanges;
}(BaseComponent));
export { EmitWhenViewportChanges };
//# sourceMappingURL=EmitWhenViewportChanges.js.map