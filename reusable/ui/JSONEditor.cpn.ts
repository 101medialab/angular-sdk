import {Component, Input, Output, ViewChild, EventEmitter, ElementRef, OnChanges} from '@angular/core';
import {ExtendedJSONEditorFactory as JSONEditorFactory} from "../JSONEditor/ExtendedJSONEditorFactory";
import {ObjectAttributeTypeExtractor} from "../ObjectAttributeTypeExtractor";

@Component({
    selector: 'json-editor',
    template: `
    <form action="" class="json-editor {{ name }}" (submit)="notifyJSONEditDone()">
        <div #container class="json-editor-container"></div>
        <button>Submit</button>
        <button class="hidden" type="button" (click)="dumpData()">Dump Data</button>
    </form>
    `
})
export class JSONEditorComponent implements OnChanges {
    @Input('name') private name: string;
    @Input('config') private config: {} = {};
    @Input('objectAttributeTypeExtractorOptions') private objectAttributeTypeExtractorOptions: {} = {};
    @Input('schema') private schema: {} = {};
    @Input('schemaData') private schemaData: {} = null;
    @Input('schemaTransformer') private schemaTransformer: (schema, context) => {} = null;
    @Input('data') private data;
    @Input('isInitializable') private isInitializable;
    @Output('onSubmit') onSubmit = new EventEmitter();
    @ViewChild('container') private container: ElementRef = null;
    private viewInitialized: boolean = false;
    private attrMapping: ObjectAttributeTypeExtractor = null;
    private factoryInstance: JSONEditorFactory = null;

    constructor() {}

    ngAfterViewInit() {
        this.viewInitialized = true;

        this.onReadyToInitialize();
    }

    ngOnChanges(change) {
        if ('isInitializable' in change && change.isInitializable) {
            this.onReadyToInitialize();
        }
    }

    onReadyToInitialize() {
        if (this.viewInitialized && this.isInitializable) {
            this.attrMapping = new ObjectAttributeTypeExtractor(
                this.schemaData ? this.schemaData : this.data,
                this.objectAttributeTypeExtractorOptions
            );
            var schema = JSONEditorFactory.generateSchemaByAttributeTypeObject(this.attrMapping);

            if (this.schemaTransformer) {
                schema = this.schemaTransformer(schema, this.context);
            }

            (this.factoryInstance = new JSONEditorFactory({
                config: this.config,
                schema,
                data: ObjectAttributeTypeExtractor.convertDataToString(this.data)
            })).setElement(this.container.nativeElement).init();
        }
    }

    notifyJSONEditDone() {
        var data = this.factoryInstance.instance.getValue();

        if (data && this.attrMapping) {
            this.onSubmit.emit(data);
        }

        return false;
    }

    dumpData() {
        console.log(this.factoryInstance.instance);
    }
}