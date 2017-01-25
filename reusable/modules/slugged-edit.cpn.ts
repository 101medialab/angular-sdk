import {ProfileSearchMixin} from '../mixin/ProfileSearchMixin';
import {applyMixins} from '../Mixin';
import {SluggedIdvComponent} from './slugged-idv.cpn';
import {EditComponent} from './edit.cpn';

export class SluggedEditComponent extends SluggedIdvComponent implements ProfileSearchMixin, EditComponent {
    public JSONEditorName: string = 'json-edit';
    public schemaData = this.resolveSchemaData();
    public objectAttributeTypeExtractorOptions = {
        keyNamingStrategy: 'snake_case',
        stripUnderscore: true
    };
    public uploaderBaseUrl = '';

    resolveSchemaData() {
        return this.status.resource.createOne();
    }

    handleProfileSearchResponse(resp: Array<any>, callWhenDone): any {
        return null;
    }

    fixProfileSelectizeValue(slug): {slug: string; type: string}|{slug: any} {
        return null;
    }

    convertToProfileNameAndSlug(data, key): any {
        return null;
    }

    transformJSONEditorSchemaBeforeInit(): any {
        return null;
    }

    onEditDoneClearUpData(data): any {
        return null;
    }

    resolveUpdateUrl(data): string {
        return null;
    }

    onEditDone(data, onFinishedCb: any = null): any {
        return null;
    }
}

applyMixins(SluggedEditComponent, [ProfileSearchMixin, EditComponent], true);