import {ProfileSearchMixin} from '../mixin/ProfileSearchMixin';
import {applyMixins} from '../Mixin';
import {SluggedIdvComponent} from './slugged-idv.cpn';
import {EditComponent} from './edit.cpn';

export class SluggedEditComponent extends SluggedIdvComponent implements ProfileSearchMixin, EditComponent {
    protected JSONEditorName: string = 'json-edit';
    protected schemaData = this.resolveSchemaData();
    protected objectAttributeTypeExtractorOptions = {
        keyNamingStrategy: 'snake_case',
        stripUnderscore: true
    };

    resolveSchemaData() {
        return this.status.resource.createOne();
    }
}

applyMixins(SluggedEditComponent, [ProfileSearchMixin, EditComponent], true);