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
import { IdvComponent } from './idv.cpn';
var EditComponent = (function (_super) {
    __extends(EditComponent, _super);
    function EditComponent(diContainer, activatedRoute) {
        var _this = _super.call(this, diContainer, activatedRoute) || this;
        _this.JSONEditorName = 'json-edit';
        _this.objectAttributeTypeExtractorOptions = {
            keyNamingStrategy: 'snake_case',
            stripUnderscore: true
        };
        _this.uploaderBaseUrl = '';
        _this.state.JSONEditorInitializable = false;
        _this.schemaData = _this.status.resource.createOne();
        _this.routeType = _this.diContainer.config.ROUTE_TYPE_UPDATE;
        return _this;
    }
    EditComponent.prototype.onInitialized = function () {
        this.state.JSONEditorInitializable = true;
        _super.prototype.onInitialized.call(this);
    };
    EditComponent.prototype.transformJSONEditorSchemaBeforeInit = function () {
        return function (schema) {
            return schema;
        }.bind(this);
    };
    EditComponent.prototype.onEditDoneClearUpData = function (data) {
        return Object.assign({}, data);
    };
    EditComponent.prototype.resolveUpdateUrl = function (data) {
        return '/' + (data.slug ? data.slug + '/' : (data.id ? data.id + '/' : '')) + 'update';
    };
    EditComponent.prototype.onEditDone = function (data, onFinishedCb) {
        var _this = this;
        if (onFinishedCb === void 0) { onFinishedCb = null; }
        this.status.resource.post(this.resolveUpdateUrl(data), this.onEditDoneClearUpData(data)).then(function (slug) {
            onFinishedCb ? onFinishedCb(slug) : function () {
                _this.status.resource.get('/' + slug, [], true).then(function () {
                    _this.router.navigate([_this.domainConfig.route.base, slug]);
                });
            };
        });
    };
    return EditComponent;
}(IdvComponent));
export { EditComponent };
//# sourceMappingURL=edit.cpn.js.map