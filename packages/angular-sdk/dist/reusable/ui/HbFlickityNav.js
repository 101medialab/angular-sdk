import { Component, ViewChild, Input, ElementRef, Inject } from '@angular/core';
import { EventDispatcher } from '../../HbComponent/EventDispatcher';
import { Bindable } from '../Bindable';
var HbFlickityNav = (function () {
    function HbFlickityNav(eventDispatcher) {
        this.eventDispatcher = eventDispatcher;
        this.viewInitialized = false;
        this.container = null;
        this.options = null;
        this.$el = null;
        this.instance = null;
        this.dimensions = null;
        this.isInitialized = new Bindable(false);
    }
    HbFlickityNav.prototype.ngAfterViewInit = function () {
        this.viewInitialized = true;
        this.$el = $(this.container.nativeElement).find('> .content');
        this.onReadyToInitialize();
    };
    HbFlickityNav.prototype.ngOnChanges = function (change) {
        if ('options' in change && change.options.currentValue) {
            this.options = change.options.currentValue;
            this.onReadyToInitialize();
        }
    };
    HbFlickityNav.prototype.onReadyToInitialize = function () {
        var _this = this;
        if (this.$el) {
            var $navCells_1 = this.$el.find('.carousel-cell');
            this.dimensions = {
                top: (this.$el.position()).top,
                height: this.$el.height()
            };
            this.eventDispatcher.listen('HB.flickity.select', [function (_a) {
                    var target = _a.target, index = _a.index;
                    if ('for' in _this.options && target == _this.options.for + '-nav') {
                        _this.$el.find('.current').removeClass('current');
                        var $current = $navCells_1.eq(index).addClass('current'), cellHeight = $current.height();
                        _this.$el.stop().animate({
                            scrollTop: _this.$el.scrollTop() +
                                cellHeight +
                                $current.position().top -
                                (_this.dimensions.height + cellHeight) / 2
                        });
                    }
                }]);
            this.isInitialized.value = true;
        }
    };
    HbFlickityNav.prototype.scroll = function (direction) {
        if (this.dimensions) {
            this.$el.stop().animate({
                scrollTop: this.$el.scrollTop() + (direction === 'up' ? -1 : 1) * this.dimensions.height
            });
        }
    };
    HbFlickityNav.decorators = [
        { type: Component, args: [{
                    selector: 'hb-flickity-nav',
                    template: "\n        <div #container class=\"flickity-nav\">\n            <div class=\"control-button center-align-items\" (click)=\"scroll('up')\">\n                <span class=\"sprite thin-arrow-up\"></span>\n            </div>\n            <div class=\"content\" [hb-perfect-scroll]=\"{initializable: isInitialized.value}\">\n                <ng-content></ng-content>\n            </div>\n            <div class=\"control-button center-align-items\" (click)=\"scroll('down')\">\n                <span class=\"sprite thin-arrow-down\"></span>\n            </div>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    HbFlickityNav.ctorParameters = function () { return [
        { type: EventDispatcher, decorators: [{ type: Inject, args: [EventDispatcher,] },] },
    ]; };
    HbFlickityNav.propDecorators = {
        "container": [{ type: ViewChild, args: ['container',] },],
        "options": [{ type: Input, args: ['options',] },],
    };
    return HbFlickityNav;
}());
export { HbFlickityNav };
//# sourceMappingURL=HbFlickityNav.js.map