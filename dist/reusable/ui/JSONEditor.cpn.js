import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ExtendedJSONEditorFactory as JSONEditorFactory } from '../JSONEditor/ExtendedJSONEditorFactory';
import { ObjectAttributeTypeExtractor } from '../ObjectAttributeTypeExtractor';
var JSONEditorComponent = (function () {
    function JSONEditorComponent() {
        this.config = {};
        this.objectAttributeTypeExtractorOptions = {};
        this.schema = {};
        this.schemaData = null;
        this.schemaTransformer = null;
        this.onSubmit = new EventEmitter();
        this.container = null;
        this.viewInitialized = false;
        this.attrMapping = null;
        this.factoryInstance = null;
    }
    JSONEditorComponent.prototype.ngAfterViewInit = function () {
        this.viewInitialized = true;
        this.onReadyToInitialize();
    };
    JSONEditorComponent.prototype.ngOnChanges = function (change) {
        if ('isInitializable' in change && change.isInitializable) {
            this.onReadyToInitialize();
        }
    };
    JSONEditorComponent.prototype.onReadyToInitialize = function () {
        if (this.viewInitialized && this.isInitializable) {
            this.attrMapping = new ObjectAttributeTypeExtractor(this.schemaData ? this.schemaData : this.data, this.objectAttributeTypeExtractorOptions);
            var schema = JSONEditorFactory.generateSchemaByAttributeTypeObject(this.attrMapping);
            if (this.schemaTransformer) {
                schema = this.schemaTransformer(schema, this.context);
            }
            (this.factoryInstance = new JSONEditorFactory({
                config: this.config,
                schema: schema,
                data: ObjectAttributeTypeExtractor.convertDataToString(this.data)
            })).setElement(this.container.nativeElement).init();
        }
    };
    JSONEditorComponent.prototype.notifyJSONEditDone = function () {
        var data = this.factoryInstance.instance.getValue();
        if (data && this.attrMapping) {
            this.onSubmit.emit(data);
        }
        return false;
    };
    JSONEditorComponent.prototype.dumpData = function () {
        console.log(this.factoryInstance.instance);
    };
    JSONEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'json-editor',
                    template: "\n    <form action=\"\" class=\"json-editor {{ name }}\" (submit)=\"notifyJSONEditDone()\">\n        <div #container class=\"json-editor-container\"></div>\n        <button>Submit</button>\n        <button class=\"hidden\" type=\"button\" (click)=\"dumpData()\">Dump Data</button>\n    </form>\n    "
                },] },
    ];
    /** @nocollapse */
    JSONEditorComponent.ctorParameters = function () { return []; };
    JSONEditorComponent.propDecorators = {
        'name': [{ type: Input, args: ['name',] },],
        'config': [{ type: Input, args: ['config',] },],
        'objectAttributeTypeExtractorOptions': [{ type: Input, args: ['objectAttributeTypeExtractorOptions',] },],
        'schema': [{ type: Input, args: ['schema',] },],
        'schemaData': [{ type: Input, args: ['schemaData',] },],
        'schemaTransformer': [{ type: Input, args: ['schemaTransformer',] },],
        'data': [{ type: Input, args: ['data',] },],
        'isInitializable': [{ type: Input, args: ['isInitializable',] },],
        'onSubmit': [{ type: Output, args: ['onSubmit',] },],
        'container': [{ type: ViewChild, args: ['container',] },],
    };
    return JSONEditorComponent;
}());
export { JSONEditorComponent };
//# sourceMappingURL=JSONEditor.cpn.js.map