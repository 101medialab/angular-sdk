import {OnInit, OnDestroy}  from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Angulartics2GoogleAnalytics} from 'angulartics2';

import {BaseComponent} from './BaseComponent';

import {Status} from '../reusable/modules/status.svc';
import {Config} from '../reusable/modules/Config';
import {CanComponentDeactivate} from './CanDeactivateGuard';
import {DummyDIContainer} from '../reusable/modules/DummyDIContainer';
import {BaseDIContainer} from './BaseDIContainer';
import {Observable} from "rxjs";

export class BaseResourceComponent extends BaseComponent implements OnInit, OnDestroy, CanComponentDeactivate {
    public routeType = '';
    protected dataFromPreviousRoute: any = null;

    protected diContainer: DummyDIContainer;
    protected baseDI: BaseDIContainer;
    public domainConfig: Config;
    public status: Status;
    protected titleService: Title;
    protected router: Router;
    protected activatedRoute: ActivatedRoute;
    protected ngGA: Angulartics2GoogleAnalytics;

    constructor(diContainer: DummyDIContainer, activatedRoute: ActivatedRoute) {
        super(diContainer.baseDI.mainStatus);

        this.diContainer = diContainer;
        this.baseDI = this.diContainer.baseDI;

        this.domainConfig = this.diContainer.config;
        this.status = this.diContainer.status;
        this.titleService = this.diContainer.baseDI.titleService;
        this.router = this.diContainer.baseDI.router;
        this.activatedRoute = activatedRoute;
        this.ngGA = this.diContainer.baseDI.ngGA;
        this.routeType = this.domainConfig.ROUTE_TYPE_MAIN;

        this.dataFromPreviousRoute = this.mainStatus.getDataPassedFromPreviousRoute();
    }

    ngOnInit(loadingResource = true) {
        this.beforeInit();
        this.emit('HB.page.view.INIT_BEGIN');
        this.emit('HB.show.NAV_SEARCH');
        this.emit('HB.page.view.DATA_LOADING');

        this.mainStatus.setMetaData({
            title: '',
            description: ''
        });

        this.onInit();
    }

    beforeInit() {}

    onInit() {}

    onInitialized() {
        let {title, description} = this.getMetaData();

        this.titleService.setTitle(title);
        this.mainStatus.setMetaData({title, description});

        window.prerenderReady = true;
        this.state.isInitialized = true;
    }

    ngOnDestroy() {
        this.status.resource.cancelAllCurrentLoading();

        this.onDestroy();

        super.ngOnDestroy();
    }

    canDeactivate(component: CanComponentDeactivate): Observable<boolean> | Promise<boolean> | boolean {
        this.state.isInitialized = false;
        this.emit('HB.page.on.DEACTIVATE');

        return new Promise((res, rej) => setTimeout(() => res(true), 200));
    }

    onDestroy() {}

    getMetaData() {
        return {
            title: 'HYPEDB',
            description: ''
        }
    }

    delete(entity, name, slugOrId, manual = false, onDeleted = null) {
        if (
            this.mainStatus.isEditor &&
            confirm('Confirm: Delete ' + this.domainConfig.getResourceName(true) + ' - ' + name)
        ) {
            this.mainStatus.resource.post(
                !manual ? this.domainConfig.pluralResourceName + '/' + slugOrId + '/delete' : slugOrId, []
            ).then((response) => {
                if (response === 'RESULT_DELETED') {
                    onDeleted ? onDeleted(entity) : this.onDeleted(entity);
                }
            });
        }
    }

    alert(message) {
        alert(message);
    }

    protected onDeleted(entity) {
        this.router.navigate(this.onDeletedRedirectTo(entity));
    }

    protected onDeletedRedirectTo(entity) {
        return ['/' + this.domainConfig.getPluralResourceName()];
    }
}