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
import { JSONEditorFactory } from './JSONEditorFactory';
import "json-editor";
var ExtendedJSONEditorFactory = /** @class */ (function (_super) {
    __extends(ExtendedJSONEditorFactory, _super);
    function ExtendedJSONEditorFactory(_a) {
        var config = _a.config, schema = _a.schema, data = _a.data;
        var _this = _super.call(this, { config: config, schema: schema, data: data }) || this;
        _this.setupExtendFields();
        return _this;
    }
    ExtendedJSONEditorFactory.prototype.setupExtendFields = function () {
        var editors = window.JSONEditor.defaults.editors, resolvers = window.JSONEditor.defaults.resolvers;
        editors.autocomplete = editors.string.extend({
            build: function () {
                this._super();
                if (this.schema.setup) {
                    this.schema.setup(this);
                }
            }
        });
        editors.ckeditor = editors.string.extend({
            build: function () {
                this._super();
                if (this.schema.setup) {
                    this.schema.setup(this);
                }
            }
        });
        resolvers.unshift(function (schema) {
            if (schema.type === 'autocomplete') {
                return 'autocomplete';
            }
            if (schema.type === 'ckeditor') {
                return 'ckeditor';
            }
        });
    };
    return ExtendedJSONEditorFactory;
}(JSONEditorFactory));
export { ExtendedJSONEditorFactory };
//# sourceMappingURL=ExtendedJSONEditorFactory.js.map