import {SluggedEditComponent} from "./slugged-edit.cpn";
import {ObjectAttributeTypeExtractor} from "../ObjectAttributeTypeExtractor";

export class SluggedNewComponent extends SluggedEditComponent {
    ngOnInit() {

        this.onInitialized();

        super.ngOnInit();
    }

    iOnInit() {
        this.data = ObjectAttributeTypeExtractor.fixObjectAttrs(
            this.status.resource.createOne(),
            this.objectAttributeTypeExtractorOptions
        );
    }

    onInitialized() {
        this.emit('HB.resource.LOAD_DONE');

        this.state.isInitialized = true;

        super.onInitialized();
    }

    resolveUpdateUrl(data) {
        return '/' + (data.slug ? data.slug + '/' : '') + 'new';
    }
}