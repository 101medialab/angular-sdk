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
import { Injectable } from '@angular/core';
import { BaseStatus } from '../../HbComponent/BaseStatus';
import { EventDispatcher } from '../../HbComponent/EventDispatcher';
import { Resource } from './resource.svc';
import { Bindable } from '../Bindable';
import RxDOM from 'rx-dom';
var Status = /** @class */ (function (_super) {
    __extends(Status, _super);
    function Status(eventDispatcher, resource) {
        var _this = _super.call(this, eventDispatcher, resource) || this;
        _this.deviceType = new Bindable('');
        _this.deviceHeight = new Bindable('');
        _this.$metas = {};
        _this.dataForNextRoute = null;
        // Use this to hide UI only, it is very easy to hack in browser console
        _this._isEditor = window._hypebeast.isEditor || false;
        _this.$win = $(window);
        _this.$head = $('head');
        RxDOM.DOM
            .resize(window)
            .throttle(200)
            .subscribe(function () {
            _this.onWindowResize();
        });
        _this.onWindowResize();
        return _this;
    }
    Object.defineProperty(Status.prototype, "isEditor", {
        get: function () {
            return this._isEditor;
        },
        set: function (value) {
            this._isEditor = value;
        },
        enumerable: true,
        configurable: true
    });
    Status.prototype.passDataToNextRoute = function (data) {
        this.dataForNextRoute = data;
    };
    Status.prototype.getDataPassingToNextRoute = function () {
        return this.dataForNextRoute;
    };
    Status.prototype.getDataPassedFromPreviousRoute = function () {
        var clone = this.getDataPassingToNextRoute() ? Object.assign(this.getDataPassingToNextRoute()) : null;
        this.dataForNextRoute = null;
        return clone;
    };
    /**
     * Format:
     * {
     *     name: 'content'
     *     name: {
     *         attr1 : 'value1',
     *         attr2 : 'value2'
     *     }
     * }
     */
    Status.prototype.setMetaData = function (attrs) {
        for (var name_1 in attrs) {
            if (!(name_1 in this.$metas)) {
                this.$metas[name_1] = this.$head.find('meta[name=' + name_1 + ']');
                if (!this.$metas[name_1].length) {
                    this.$metas[name_1] = $('<meta name="' + name_1 + '" />');
                    this.$head.append(this.$metas[name_1]);
                }
            }
            if (typeof attrs[name_1] === 'string') {
                this.$metas[name_1].attr('content', attrs[name_1]);
            }
            else {
                for (var attr in attrs[name_1]) {
                    this.$metas[name_1].attr(attr, attrs[name_1][attr]);
                }
            }
        }
    };
    Status.prototype.onWindowResize = function () {
        var width = this.$win.width();
        if (width <= 480) {
            this.deviceType.value = 'mobile';
        }
        else if (width <= 768) {
            this.deviceType.value = 'xs';
        }
        else if (width <= 992) {
            this.deviceType.value = 'sm';
        }
        else if (width <= 1200) {
            this.deviceType.value = 'md';
        }
        else if (width <= 1440) {
            this.deviceType.value = 'lg';
        }
        else {
            this.deviceType.value = 'exlg';
        }
        this.deviceHeight.value = this.$win.height();
        this.evtDispatcher.emit('WINDOW_RESIZED');
    };
    Object.defineProperty(Status, "APP_ENV", {
        // Never use this static attribute to do anything normal user must not see.
        // All code compile and send to users, it is simple to exploit the application.
        get: function () {
            return Status.appEnv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "DEVICE_TYPE", {
        get: function () {
            return this.deviceType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "WIN_HEIGHT", {
        get: function () {
            return this.deviceHeight;
        },
        enumerable: true,
        configurable: true
    });
    Status.appEnv = $('body').hasClass('env-prod');
    Status.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Status.ctorParameters = function () { return [
        { type: EventDispatcher, },
        { type: Resource, },
    ]; };
    return Status;
}(BaseStatus));
export { Status };
//# sourceMappingURL=status.svc.js.map