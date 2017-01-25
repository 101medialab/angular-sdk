import {ActivatedRoute} from '@angular/router';

import {IdvComponent} from './idv.cpn';
import {DummyDIContainer} from './DummyDIContainer';

export class EditComponent extends IdvComponent {
    public JSONEditorName: string = 'json-edit';
    public schemaData;
    public objectAttributeTypeExtractorOptions = {
        keyNamingStrategy: 'snake_case',
        stripUnderscore: true
    };
    public uploaderBaseUrl = '';

    constructor(
        diContainer: DummyDIContainer, activatedRoute: ActivatedRoute
    ) {
        super(diContainer, activatedRoute);

        this.state.JSONEditorInitializable = false;
        this.schemaData = this.status.resource.createOne();
        this.routeType = this.diContainer.config.ROUTE_TYPE_UPDATE;
    }

    onInitialized() {
        this.state.JSONEditorInitializable = true;

        super.onInitialized();
    }

    transformJSONEditorSchemaBeforeInit() {
        return function (schema) {
            return schema;
        }.bind(this);
    }

    onEditDoneClearUpData(data) {
        return Object.assign({}, data);
    }

    resolveUpdateUrl(data) {
        return '/' + (data.slug ? data.slug + '/' : (data.id ? data.id + '/' : '')) + 'update';
    }

    onEditDone(data, onFinishedCb = null) {
        this.status.resource.post(
            this.resolveUpdateUrl(data),
            this.onEditDoneClearUpData(data)
        ).then((slug) => {
            onFinishedCb ? onFinishedCb(slug) : () => {
                this.status.resource.get('/' + slug, [], true).then(() => {
                    this.router.navigate([this.domainConfig.route.base, slug]);
                });
            }
        });
    }
}
