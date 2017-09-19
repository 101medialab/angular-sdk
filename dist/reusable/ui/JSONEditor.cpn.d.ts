import { EventEmitter, OnChanges } from '@angular/core';
export declare class JSONEditorComponent implements OnChanges {
    private name;
    private config;
    private objectAttributeTypeExtractorOptions;
    private schema;
    private schemaData;
    private schemaTransformer;
    private data;
    private isInitializable;
    onSubmit: EventEmitter<{}>;
    private container;
    private viewInitialized;
    private attrMapping;
    private factoryInstance;
    private context;
    constructor();
    ngAfterViewInit(): void;
    ngOnChanges(change: any): void;
    onReadyToInitialize(): void;
    notifyJSONEditDone(): boolean;
    dumpData(): void;
}
