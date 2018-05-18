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
import { Bindable } from '../reusable/Bindable';
import { BaseComponent } from '../HbComponent/BaseComponent';
var SlideMenuComponent = /** @class */ (function (_super) {
    __extends(SlideMenuComponent, _super);
    function SlideMenuComponent(status) {
        var _this = _super.call(this, status) || this;
        _this.state.isOpened = new Bindable(false);
        _this.listen('HB.show.SLIDE_MENU', [function () {
                _this.state.isOpened.value = true;
            }], true);
        return _this;
    }
    SlideMenuComponent.prototype.dismissSlideMenu = function () {
        this.emit('HB.hide.SLIDE_MENU');
        this.state.isOpened.value = false;
    };
    return SlideMenuComponent;
}(BaseComponent));
export { SlideMenuComponent };
//# sourceMappingURL=SlideMenuComponent.js.map