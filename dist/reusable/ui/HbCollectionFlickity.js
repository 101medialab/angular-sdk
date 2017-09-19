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
import { Component, ViewChild, Input, Inject } from '@angular/core';
import { EventDispatcher } from '../../HbComponent/EventDispatcher';
import { HbFlickity } from './HbFlickity';
var HbCollectionFlickity = /** @class */ (function (_super) {
    __extends(HbCollectionFlickity, _super);
    function HbCollectionFlickity(eventDispatcher) {
        var _this = _super.call(this, eventDispatcher) || this;
        _this.options = null;
        _this.container = null;
        return _this;
    }
    HbCollectionFlickity.prototype.ngOnChanges = function (change) {
        if ('options' in change && change.options.currentValue) {
            this.options = change.options.currentValue;
        }
        _super.prototype.ngOnChanges.call(this, change);
    };
    HbCollectionFlickity.prototype.onInitialized = function () {
        var _this = this;
        this.eventDispatcher.listen('HB.flickity.select', [function (_a) {
                var target = _a.target, index = _a.index;
                if ('name' in _this.options && target == _this.options.name) {
                    _this.instance.select(index);
                }
            }]);
        this.$slider.on('select.flickity', function () {
            _this.eventDispatcher.emit('HB.flickity.select', [{
                    target: _this.options.name + '-nav',
                    index: _this.instance.selectedIndex
                }]);
        });
    };
    HbCollectionFlickity.decorators = [
        { type: Component, args: [{
                    selector: 'hb-collection-flickity',
                    template: "\n        <div #container>\n            <ng-content></ng-content>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    HbCollectionFlickity.ctorParameters = function () { return [
        { type: EventDispatcher, decorators: [{ type: Inject, args: [EventDispatcher,] },] },
    ]; };
    HbCollectionFlickity.propDecorators = {
        'options': [{ type: Input, args: ['options',] },],
        'container': [{ type: ViewChild, args: ['container',] },],
    };
    return HbCollectionFlickity;
}(HbFlickity));
export { HbCollectionFlickity };
//# sourceMappingURL=HbCollectionFlickity.js.map