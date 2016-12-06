import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import MainStatus from '../reusable/modules/status.svc';
import {Angulartics2GoogleAnalytics} from 'angulartics2/dist/providers/ga/angulartics2-ga';

@Injectable()
export default class BaseDIContainer {
    private _router: Router;
    private _titleService: Title;
    private _mainStatus: MainStatus;
    private _ngGA: Angulartics2GoogleAnalytics;

    constructor(
        router: Router,
        titleService: Title,
        mainStatus: MainStatus,
        ngGA: Angulartics2GoogleAnalytics
    ) {
        this._router = router;
        this._titleService = titleService;
        this._mainStatus = mainStatus;
        this._ngGA = ngGA;
    }

    get router(): Router {
        return this._router;
    }

    get titleService(): Title {
        return this._titleService;
    }

    get mainStatus(): MainStatus {
        return this._mainStatus;
    }

    get ngGA(): Angulartics2GoogleAnalytics {
        return this._ngGA;
    }
}