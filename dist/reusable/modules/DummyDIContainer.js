var DummyDIContainer = /** @class */ (function () {
    function DummyDIContainer(baseDI, config, status) {
        this._baseDI = baseDI;
        this._config = config;
        this._status = status;
    }
    Object.defineProperty(DummyDIContainer.prototype, "baseDI", {
        get: function () {
            return this._baseDI;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DummyDIContainer.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DummyDIContainer.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });
    return DummyDIContainer;
}());
export { DummyDIContainer };
//# sourceMappingURL=DummyDIContainer.js.map