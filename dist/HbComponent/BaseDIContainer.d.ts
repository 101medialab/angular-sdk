import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Status as MainStatus } from '../reusable/modules/status.svc';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
export declare class BaseDIContainer {
    private _router;
    private _titleService;
    private _mainStatus;
    private _ngGA;
    constructor(router: Router, titleService: Title, mainStatus: MainStatus, ngGA: Angulartics2GoogleAnalytics);
    readonly router: Router;
    readonly titleService: Title;
    readonly mainStatus: MainStatus;
    readonly ngGA: Angulartics2GoogleAnalytics;
}
