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
import { BaseResourceComponent } from '../../HbComponent/BaseResourceComponent';
var IdvComponent = (function (_super) {
    __extends(IdvComponent, _super);
    function IdvComponent(diContainer, activatedRoute) {
        var _this = _super.call(this, diContainer, activatedRoute) || this;
        _this.data = {};
        _this.routeType = diContainer.config.ROUTE_TYPE_VIEW;
        _this.reset();
        return _this;
    }
    IdvComponent.prototype.reset = function () { };
    IdvComponent.prototype.onInit = function () {
        this.reset();
        this.status.resource.isCancelIfLoading = false;
    };
    IdvComponent.prototype.setupData = function (data) {
        // Be careful not to pollute caches stored in Resource. Avoid it by cloning data with Object.assign({}, data) or JSON.parse(JSON.stringify(data));
        this.onSetupData(data);
        return data;
    };
    IdvComponent.prototype.onSetupData = function (data) { };
    return IdvComponent;
}(BaseResourceComponent));
export { IdvComponent };
//# sourceMappingURL=idv.cpn.js.map