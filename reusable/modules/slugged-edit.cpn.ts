import {ProfileSearchMixin} from "../../reusable/mixin/ProfileSearchMixin";
import {applyMixins} from "../Mixin";
import {SluggedIdvComponent} from "./slugged-idv.cpn";
import {EditComponent} from "./edit.cpn";

export class SluggedEditComponent extends SluggedIdvComponent implements ProfileSearchMixin, EditComponent {
    private JSONEditorName: string = 'json-edit';
    private schemaData = this.status.resource.createOne();
    protected objectAttributeTypeExtractorOptions = {
        keyNamingStrategy: 'snake_case',
        stripUnderscore: true
    };
}

applyMixins(SluggedEditComponent, [ProfileSearchMixin, EditComponent], true);