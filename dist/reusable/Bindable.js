var Bindable = /** @class */ (function () {
    function Bindable(_value) {
        this._value = _value;
    }
    Object.defineProperty(Bindable.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    return Bindable;
}());
export { Bindable };
//# sourceMappingURL=Bindable.js.map