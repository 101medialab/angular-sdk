import { EventEmitter, Inject, Injectable } from '@angular/core';
var BaseEventEmitter = (function () {
    function BaseEventEmitter(name) {
        this.name = name;
        this._emitter = new EventEmitter();
    }
    Object.defineProperty(BaseEventEmitter.prototype, "emitter", {
        get: function () {
            return this._emitter;
        },
        enumerable: true,
        configurable: true
    });
    BaseEventEmitter.prototype.emit = function () {
        EventEmitter.prototype.emit.apply(this._emitter, arguments);
    };
    BaseEventEmitter.prototype.subscribe = function () {
        EventEmitter.prototype.subscribe.apply(this._emitter, arguments);
    };
    BaseEventEmitter.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BaseEventEmitter.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['',] },] },
    ]; };
    return BaseEventEmitter;
}());
export { BaseEventEmitter };
//# sourceMappingURL=BaseEventEmitter.js.map