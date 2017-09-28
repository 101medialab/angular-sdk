import { ProfileSearchMixin } from '../mixin/ProfileSearchMixin';
import { SluggedIdvComponent } from './slugged-idv.cpn';
import { EditComponent } from './edit.cpn';
export declare class SluggedEditComponent extends SluggedIdvComponent implements ProfileSearchMixin, EditComponent {
    JSONEditorName: string;
    schemaData: void;
    objectAttributeTypeExtractorOptions: {
        keyNamingStrategy?: string;
        stripUnderscore?: boolean;
    };
    uploaderBaseUrl: string;
    resolveSchemaData(): void;
    handleProfileSearchResponse(resp: Array<any>, callWhenDone: any): any;
    fixProfileSelectizeValue(slug: any): {
        slug: string;
        type: string;
    } | {
        slug: any;
    };
    convertToProfileNameAndSlug(data: any, key: any): any;
    transformJSONEditorSchemaBeforeInit(): any;
    onEditDoneClearUpData(data: any): any;
    resolveUpdateUrl(data: any): string;
    onEditDone(data: any, onFinishedCb?: any): any;
}
