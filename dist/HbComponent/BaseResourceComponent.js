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
import { BaseComponent } from './BaseComponent';
var BaseResourceComponent = (function (_super) {
    __extends(BaseResourceComponent, _super);
    function BaseResourceComponent(diContainer, activatedRoute) {
        var _this = _super.call(this, diContainer.baseDI.mainStatus) || this;
        _this.routeType = '';
        _this.dataFromPreviousRoute = null;
        _this.diContainer = diContainer;
        _this.baseDI = _this.diContainer.baseDI;
        _this.domainConfig = _this.diContainer.config;
        _this.status = _this.diContainer.status;
        _this.titleService = _this.diContainer.baseDI.titleService;
        _this.router = _this.diContainer.baseDI.router;
        _this.activatedRoute = activatedRoute;
        _this.ngGA = _this.diContainer.baseDI.ngGA;
        _this.routeType = _this.domainConfig.ROUTE_TYPE_MAIN;
        _this.dataFromPreviousRoute = _this.mainStatus.getDataPassedFromPreviousRoute();
        return _this;
    }
    BaseResourceComponent.prototype.ngOnInit = function (loadingResource) {
        if (loadingResource === void 0) { loadingResource = true; }
        this.beforeInit();
        this.emit('HB.page.view.INIT_BEGIN');
        this.emit('HB.show.NAV_SEARCH');
        this.emit('HB.page.view.DATA_LOADING');
        this.mainStatus.setMetaData({
            title: '',
            description: ''
        });
        this.onInit();
    };
    BaseResourceComponent.prototype.beforeInit = function () { };
    BaseResourceComponent.prototype.onInit = function () { };
    BaseResourceComponent.prototype.onInitialized = function () {
        var _a = this.getMetaData(), title = _a.title, description = _a.description;
        this.titleService.setTitle(title);
        this.mainStatus.setMetaData({ title: title, description: description });
        window.prerenderReady = true;
        this.state.isInitialized = true;
    };
    BaseResourceComponent.prototype.ngOnDestroy = function () {
        this.status.resource.cancelAllCurrentLoading();
        this.onDestroy();
        _super.prototype.ngOnDestroy.call(this);
    };
    BaseResourceComponent.prototype.canDeactivate = function (component) {
        this.state.isInitialized = false;
        this.emit('HB.page.on.DEACTIVATE');
        return new Promise(function (res, rej) { return setTimeout(function () { return res(true); }, 200); });
    };
    BaseResourceComponent.prototype.onDestroy = function () { };
    BaseResourceComponent.prototype.getMetaData = function () {
        return {
            title: 'HYPEDB',
            description: ''
        };
    };
    BaseResourceComponent.prototype.delete = function (entity, name, slugOrId, manual, onDeleted) {
        var _this = this;
        if (manual === void 0) { manual = false; }
        if (onDeleted === void 0) { onDeleted = null; }
        if (this.mainStatus.isEditor &&
            confirm('Confirm: Delete ' + this.domainConfig.getResourceName(true) + ' - ' + name)) {
            this.mainStatus.resource.post(!manual ? this.domainConfig.pluralResourceName + '/' + slugOrId + '/delete' : slugOrId, []).then(function (response) {
                if (response === 'RESULT_DELETED') {
                    onDeleted ? onDeleted(entity) : _this.onDeleted(entity);
                }
            });
        }
    };
    BaseResourceComponent.prototype.alert = function (message) {
        alert(message);
    };
    BaseResourceComponent.prototype.onDeleted = function (entity) {
        this.router.navigate(this.onDeletedRedirectTo(entity));
    };
    BaseResourceComponent.prototype.onDeletedRedirectTo = function (entity) {
        return ['/' + this.domainConfig.getPluralResourceName()];
    };
    return BaseResourceComponent;
}(BaseComponent));
export { BaseResourceComponent };
//# sourceMappingURL=BaseResourceComponent.js.map