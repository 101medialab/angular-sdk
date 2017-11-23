var Debounce = (function () {
    function Debounce() {
        this.timer = 0;
    }
    Debounce.prototype.run = function (callback, ms) {
        clearTimeout(this.timer);
        this.timer = setTimeout(callback, ms);
    };
    return Debounce;
}());
export { Debounce };
//# sourceMappingURL=Debounce.js.map