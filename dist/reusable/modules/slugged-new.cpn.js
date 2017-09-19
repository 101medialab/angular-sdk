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
import { SluggedEditComponent } from './slugged-edit.cpn';
import { ObjectAttributeTypeExtractor } from '../ObjectAttributeTypeExtractor';
var SluggedNewComponent = /** @class */ (function (_super) {
    __extends(SluggedNewComponent, _super);
    function SluggedNewComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SluggedNewComponent.prototype.ngOnInit = function () {
        this.onInitialized();
        _super.prototype.ngOnInit.call(this);
    };
    SluggedNewComponent.prototype.iOnInit = function () {
        this.data = ObjectAttributeTypeExtractor.fixNamingConvention(this.status.resource.createOne(), this.objectAttributeTypeExtractorOptions);
    };
    SluggedNewComponent.prototype.onInitialized = function () {
        this.emit('HB.resource.LOAD_DONE');
        this.state.isInitialized = true;
        _super.prototype.onInitialized.call(this);
    };
    SluggedNewComponent.prototype.resolveUpdateUrl = function (data) {
        return '/' + (data.slug ? data.slug + '/' : '') + 'new';
    };
    return SluggedNewComponent;
}(SluggedEditComponent));
export { SluggedNewComponent };
//# sourceMappingURL=slugged-new.cpn.js.map