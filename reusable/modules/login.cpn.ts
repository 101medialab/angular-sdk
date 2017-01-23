import {OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Status} from "./status.svc";
import {ExtendedAuthHttp} from './ExtendedAuthHttp';
import {BaseComponent} from '../../HbComponent/BaseComponent';
import {Status as MainStatus} from './status.svc';
import {Response} from "@angular/http";

export class LoginComponent extends BaseComponent implements OnInit {
    protected username: string = '';
    protected password: string = '';
    protected loginBaseUrl = this.status.resource.baseUrl + '/auth/';

    constructor(
        protected status: Status,
        protected router: Router,
        protected authHttp: ExtendedAuthHttp,
        protected mainStatus: MainStatus
    ) {
        super(status);
    }

    ngOnInit() {
        this.username = '';
        this.password = '';
    }

    resolveLoginPayload():any {
        return {
            '_username': this.username,
            '_password': this.password
        };
    }

    resolveLoginOptions() {
        return null;
    }

    login() {
        this.authHttp.post(
            this.loginBaseUrl,
            this.resolveLoginPayload(),
            this.resolveLoginOptions()
        ).subscribe(
            (res: Response) => {
                if (this.resolveIsLoggedIn(res)) {
                    this.password = '';

                    this.status.setCurrentUser(this.username);

                    this.onLoggedIn(res);
                } else {
                    this.onLoginFailed(res);
                }
            }
        );

        return false;
    }

    resolveIsLoggedIn(res: Response) {
        return true;
    }

    onLoggedIn(res: Response) {
        let url = this.status.redirectToOnceLoggedIn;
        url = url && url != '' ? url : this.status.redirectToOnceLoggedInDefault;

        if (url) this.router.navigateByUrl(url);

        this.emit('HB.user.LOGGED_IN');
    }

    onLoginFailed(res: Response) {
        this.emit('HB.user.LOGIN_FAILED');
    }
}