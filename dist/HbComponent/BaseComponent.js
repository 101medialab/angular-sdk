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
import { BaseClass as Base } from '../reusable/BaseClass';
var BaseComponent = /** @class */ (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent(mainStatus) {
        if (mainStatus === void 0) { mainStatus = null; }
        var _this = _super.call(this) || this;
        _this.mainStatus = mainStatus;
        _this.state = {
            isViewInitialized: false,
            isInitialized: false,
            current: {}
        };
        _this.eventEmitters = new Map();
        return _this;
    }
    BaseComponent.prototype.ngAfterViewInit = function () {
        this.state.isViewInitialized = true;
    };
    BaseComponent.prototype.listen = function (name, args, createIfNotExist) {
        if (createIfNotExist === void 0) { createIfNotExist = true; }
        if (!this.eventEmitters.has(name)) {
            this.eventEmitters.set(name, this.mainStatus.evtDispatcher.listen(name, args, createIfNotExist));
        }
        else {
            console.error('BaseComponent listen: Event has been listened already.', this, arguments);
        }
    };
    BaseComponent.prototype.emit = function (name, args, createIfNotExist) {
        if (args === void 0) { args = []; }
        if (createIfNotExist === void 0) { createIfNotExist = true; }
        this.mainStatus.evtDispatcher.emit(name, args, createIfNotExist);
    };
    BaseComponent.prototype.mute = function (name) {
        if (this.eventEmitters.has(name)) {
            this.eventEmitters.get(name).unsubscribe();
        }
    };
    BaseComponent.prototype.muteAll = function () {
        this.eventEmitters.forEach(function (subscriber) {
            subscriber.unsubscribe();
        });
        this.eventEmitters = new Map();
    };
    BaseComponent.prototype.ngOnDestroy = function () {
        this.muteAll();
    };
    return BaseComponent;
}(Base));
export { BaseComponent };
//# sourceMappingURL=BaseComponent.js.map