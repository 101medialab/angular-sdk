import JSONEditorFactory from './JSONEditorFactory';
import "jdorn/json-editor";

export default class ExtendedJSONEditorFactory extends JSONEditorFactory {
    constructor({config, schema, data}) {
        super({config, schema, data});
        this.setupExtendFields();
    }

    setupExtendFields() {
        let editors = window.JSONEditor.defaults.editors,
            resolvers = window.JSONEditor.defaults.resolvers;

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
    }
}
