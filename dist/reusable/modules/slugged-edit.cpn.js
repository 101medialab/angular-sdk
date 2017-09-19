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
import { ProfileSearchMixin } from '../mixin/ProfileSearchMixin';
import { applyMixins } from '../Mixin';
import { SluggedIdvComponent } from './slugged-idv.cpn';
import { EditComponent } from './edit.cpn';
var SluggedEditComponent = /** @class */ (function (_super) {
    __extends(SluggedEditComponent, _super);
    function SluggedEditComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.JSONEditorName = 'json-edit';
        _this.schemaData = _this.resolveSchemaData();
        _this.objectAttributeTypeExtractorOptions = {
            keyNamingStrategy: 'snake_case',
            stripUnderscore: true
        };
        _this.uploaderBaseUrl = '';
        return _this;
    }
    SluggedEditComponent.prototype.resolveSchemaData = function () {
        return this.status.resource.createOne();
    };
    SluggedEditComponent.prototype.handleProfileSearchResponse = function (resp, callWhenDone) {
        return null;
    };
    SluggedEditComponent.prototype.fixProfileSelectizeValue = function (slug) {
        return null;
    };
    SluggedEditComponent.prototype.convertToProfileNameAndSlug = function (data, key) {
        return null;
    };
    SluggedEditComponent.prototype.transformJSONEditorSchemaBeforeInit = function () {
        return null;
    };
    SluggedEditComponent.prototype.onEditDoneClearUpData = function (data) {
        return null;
    };
    SluggedEditComponent.prototype.resolveUpdateUrl = function (data) {
        return null;
    };
    SluggedEditComponent.prototype.onEditDone = function (data, onFinishedCb) {
        if (onFinishedCb === void 0) { onFinishedCb = null; }
        return null;
    };
    return SluggedEditComponent;
}(SluggedIdvComponent));
export { SluggedEditComponent };
applyMixins(SluggedEditComponent, [ProfileSearchMixin, EditComponent], true);
//# sourceMappingURL=slugged-edit.cpn.js.map