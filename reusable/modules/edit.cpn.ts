/// <reference path="../../../typings/angular2.d.ts" />

import {Component}  from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Status as MainStatus} from './status.svc';

import {IdvComponent} from './idv.cpn.ts';
import {Status} from './status.svc';
import {Config} from "./Config";
import {BaseDIContainer} from "../../HbComponent/BaseDIContainer";
import {DummyDIContainer} from "./DummyDIContainer";

export class EditComponent extends IdvComponent {
    private JSONEditorName: string = 'json-edit';
    private schemaData;
    protected objectAttributeTypeExtractorOptions = {
        keyNamingStrategy: 'snake_case',
        stripUnderscore: true
    };
    private uploaderBaseUrl = '';

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
        return JSON.parse(JSON.stringify(data));
    }

    resolveUpdateUrl(data) {
        return '/' + (data.slug ? data.slug + '/' : '') + 'update';
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
