import { Directive, Input, ElementRef } from '@angular/core';
import { EventDispatcher } from '../../HbComponent/EventDispatcher';
var HbHeightModifier = (function () {
    function HbHeightModifier(el, eventDispatcher) {
        this.el = el;
        this.eventDispatcher = eventDispatcher;
        this.isExpanded = false;
        this.$el = $(this.el.nativeElement);
    }
    // TODO: Support namespace in this.config.name
    HbHeightModifier.prototype.ngOnChanges = function (_a) {
        var _this = this;
        var config = _a.config;
        if (config.currentValue) {
            if (this.config.initializable) {
                setTimeout(function () {
                    var $target = $(_this.config.target), $heightSource = $(_this.config.heightSource), $defaultHeightSource = _this.config.defaultHeightSource && $(_this.config.defaultHeightSource);
                    _this.config.expandedHeight = $heightSource.height();
                    if (_this.config.event.updateDefault && $defaultHeightSource) {
                        _this.eventDispatcher.listen(_this.config.event.updateDefault, [function () {
                                $defaultHeightSource = _this.config.defaultHeightSource && $(_this.config.defaultHeightSource);
                                _this.config.default =
                                    $defaultHeightSource.position().top -
                                        $defaultHeightSource.parent().position().top;
                                _this.config.expandedHeight = $heightSource.height();
                                _this.eventDispatcher.emit(_this.config.event[_this.isExpanded ? 'expand' : 'collapse']);
                            }]);
                        _this.config.default =
                            $defaultHeightSource.position().top -
                                $defaultHeightSource.parent().position().top;
                        $target.css({ 'height': _this.config.default + 'px' });
                    }
                    _this.eventDispatcher.listen(_this.config.event.expand, [function () {
                            _this.isExpanded = true;
                            $target.animate({ 'height': _this.config.expandedHeight + 'px' });
                        }]);
                    _this.eventDispatcher.listen(_this.config.event.collapse, [function () {
                            _this.isExpanded = false;
                            $target.animate({ 'height': _this.config.default + 'px' });
                        }]);
                }, 100);
            }
        }
    };
    HbHeightModifier.prototype.ngOnDestroy = function () {
        for (var key in this.config.event) {
            this.eventDispatcher.remove(this.config.event[key]);
        }
    };
    HbHeightModifier.decorators = [
        { type: Directive, args: [{
                    selector: '[hbHeightModifier]',
                },] },
    ];
    /** @nocollapse */
    HbHeightModifier.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: EventDispatcher, },
    ]; };
    HbHeightModifier.propDecorators = {
        'config': [{ type: Input, args: ['hbHeightModifier',] },],
    };
    return HbHeightModifier;
}());
export { HbHeightModifier };
//# sourceMappingURL=HbHeightModifier.js.map