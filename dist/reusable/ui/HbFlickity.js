import { Component, ViewChild, Input, Inject } from '@angular/core';
import { EventDispatcher } from '../../HbComponent/EventDispatcher';
import Flickity from 'flickity/js/flickity.js';
import 'flickity-bg-lazyload';
var HbFlickity = /** @class */ (function () {
    function HbFlickity(eventDispatcher) {
        this.eventDispatcher = eventDispatcher;
        this.viewInitialized = false;
        this.container = null;
        this.options = null;
        this.$el = null;
        this.$slider = null;
        this.Flickity = null;
        this.instance = null;
    }
    HbFlickity.prototype.ngAfterViewInit = function () {
        this.viewInitialized = true;
        this.$el = $(this.container.nativeElement);
        this.Flickity = Flickity;
        this.onReadyToInitialize();
    };
    HbFlickity.prototype.ngOnChanges = function (change) {
        if ('options' in change && change.options.currentValue) {
            this.options = change.options.currentValue;
            this.onReadyToInitialize();
        }
    };
    HbFlickity.prototype.onReadyToInitialize = function () {
        var _this = this;
        if (this.viewInitialized &&
            this.Flickity &&
            this.$el &&
            this.options) {
            if (!this.$slider) {
                this.$slider = this.$el.find('.flickity');
            }
            setTimeout(function () {
                _this.instance = new _this.Flickity(_this.$slider[0], _this.options.flickity);
                _this.onInitialized();
            }, 1000);
        }
    };
    HbFlickity.prototype.onInitialized = function () { };
    HbFlickity.decorators = [
        { type: Component, args: [{
                    selector: 'hb-flickity',
                    template: "\n        <div #container>\n            <ng-content></ng-content>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    HbFlickity.ctorParameters = function () { return [
        { type: EventDispatcher, decorators: [{ type: Inject, args: [EventDispatcher,] },] },
    ]; };
    HbFlickity.propDecorators = {
        'container': [{ type: ViewChild, args: ['container',] },],
        'options': [{ type: Input, args: ['options',] },],
    };
    return HbFlickity;
}());
export { HbFlickity };
//# sourceMappingURL=HbFlickity.js.map