import { ActivatedRoute } from '@angular/router';
import { IdvComponent } from './idv.cpn';
import { DummyDIContainer } from './DummyDIContainer';
export declare class EditComponent extends IdvComponent {
    JSONEditorName: string;
    schemaData: any;
    objectAttributeTypeExtractorOptions: {
        keyNamingStrategy?: string;
        stripUnderscore?: boolean;
    };
    uploaderBaseUrl: string;
    constructor(diContainer: DummyDIContainer, activatedRoute: ActivatedRoute);
    onInitialized(): void;
    transformJSONEditorSchemaBeforeInit(): any;
    onEditDoneClearUpData(data: any): any;
    resolveUpdateUrl(data: any): string;
    onEditDone(data: any, onFinishedCb?: any): void;
}
