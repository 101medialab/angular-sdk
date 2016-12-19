import ProfileSearchMixin from '../mixin/ProfileSearchMixin';
import applyMixins from '../Mixin';
import SluggedIdvComponent from './slugged-idv.cpn';
import EditComponent from './edit.cpn';

export default class SluggedEditComponent extends SluggedIdvComponent implements ProfileSearchMixin, EditComponent {
    private JSONEditorName: string = 'json-edit';
    private schemaData = this.resolveSchemaData();
    protected objectAttributeTypeExtractorOptions = {
        keyNamingStrategy: 'snake_case',
        stripUnderscore: true
    };

    resolveSchemaData() {
        return this.status.resource.createOne();
    }
}

applyMixins(SluggedEditComponent, [ProfileSearchMixin, EditComponent], true);