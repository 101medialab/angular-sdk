import { OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { BaseComponent } from './BaseComponent';
import { Status } from '../reusable/modules/status.svc';
import { Config } from '../reusable/modules/Config';
import { CanComponentDeactivate } from './CanDeactivateGuard';
import { DummyDIContainer } from '../reusable/modules/DummyDIContainer';
import { BaseDIContainer } from './BaseDIContainer';
import { Observable } from "rxjs";
export declare class BaseResourceComponent extends BaseComponent implements OnInit, OnDestroy, CanComponentDeactivate {
    routeType: string;
    protected dataFromPreviousRoute: any;
    protected diContainer: DummyDIContainer;
    protected baseDI: BaseDIContainer;
    domainConfig: Config;
    status: Status;
    protected titleService: Title;
    protected router: Router;
    protected activatedRoute: ActivatedRoute;
    protected ngGA: Angulartics2GoogleAnalytics;
    constructor(diContainer: DummyDIContainer, activatedRoute: ActivatedRoute);
    ngOnInit(loadingResource?: boolean): void;
    beforeInit(): void;
    onInit(): void;
    onInitialized(): void;
    ngOnDestroy(): void;
    canDeactivate(component: CanComponentDeactivate): Observable<boolean> | Promise<boolean> | boolean;
    onDestroy(): void;
    getMetaData(): {
        title: string;
        description: string;
    };
    delete(entity: any, name: any, slugOrId: any, manual?: boolean, onDeleted?: any): void;
    alert(message: any): void;
    protected onDeleted(entity: any): void;
    protected onDeletedRedirectTo(entity: any): string[];
}
