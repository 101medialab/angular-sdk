import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Status } from "./status.svc";
import { ExtendedAuthHttp } from '../ExtendedAuthHttp';
import { BaseComponent } from '../../HbComponent/BaseComponent';
import { Status as MainStatus } from './status.svc';
import { Response } from "@angular/http";
export declare class LoginComponent extends BaseComponent implements OnInit {
    protected status: Status;
    protected router: Router;
    protected authHttp: ExtendedAuthHttp;
    protected mainStatus: MainStatus;
    username: string;
    password: string;
    protected loginBaseUrl: string;
    constructor(status: Status, router: Router, authHttp: ExtendedAuthHttp, mainStatus: MainStatus);
    ngOnInit(): void;
    resolveLoginPayload(): any;
    resolveLoginOptions(): any;
    login(): boolean;
    resolveIsLoggedIn(res: Response): boolean;
    onLoggedIn(res: Response): void;
    onLoginFailed(res: Response): void;
}
