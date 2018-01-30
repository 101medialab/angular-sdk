import { Injectable, EventEmitter } from '@angular/core';
var EventDispatcher = (function () {
    function EventDispatcher() {
        this.emitters = new Map();
    }
    EventDispatcher.prototype.get = function (name, createIfNotExist) {
        if (createIfNotExist === void 0) { createIfNotExist = false; }
        if (createIfNotExist && !this.emitters.has(name)) {
            this.create(name);
        }
        return this.emitters.get(name);
    };
    EventDispatcher.prototype.listen = function (name, args, createIfNotExist) {
        if (createIfNotExist === void 0) { createIfNotExist = true; }
        return EventEmitter.prototype.subscribe.apply(this.get(name, createIfNotExist), args);
    };
    EventDispatcher.prototype.emit = function (name, args, createIfNotExist) {
        if (args === void 0) { args = []; }
        if (createIfNotExist === void 0) { createIfNotExist = true; }
        EventEmitter.prototype.emit.apply(this.get(name, createIfNotExist), args);
    };
    EventDispatcher.prototype.create = function (name, force) {
        if (force === void 0) { force = false; }
        if (force && this.emitters.has(name)) {
            return false;
        }
        return this.emitters.set(name, new EventEmitter()).get(name);
    };
    EventDispatcher.prototype.remove = function (name) {
        return this.emitters.delete(name);
    };
    EventDispatcher.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    EventDispatcher.ctorParameters = function () { return []; };
    return EventDispatcher;
}());
export { EventDispatcher };
//# sourceMappingURL=EventDispatcher.js.map