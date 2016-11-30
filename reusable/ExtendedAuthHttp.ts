/// <reference path="../../typings/angular2.d.ts" />

import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {AuthHttp, AuthConfig, JwtHelper} from 'angular2-jwt';

@Injectable()
export class ExtendedAuthHttp extends AuthHttp {
    private jwtHelper: JwtHelper;
    private externalConfig;
    private token: string;
    private refreshTimeoutId;

    constructor(config, private http: Http) {
        this.jwtHelper = new JwtHelper();

        this.externalConfig = $.extend({
            JWToken: null,
            refreshBeforeExpire: 60
        }, config);

        this.setToken(this.externalConfig.JWToken || '');
        super(new AuthConfig({
            tokenGetter: () => {
                return this.getToken();
            },
            noJwtError: true
        }), http);
    }

    private isTokenNeedToRefresh() {
        return !this.token || this.jwtHelper.isTokenExpired(this.token, this.externalConfig.refreshBeforeExpire);
    }

    private getToken() {
        return this.token;
    }

    private setToken(token) {
        this.token = token;

        if (this.token) {
            if (this.isTokenNeedToRefresh()) {
                this.refreshToken();
            }

            this.refreshTokenBeforeExpire();
        }
    }

    private refreshTokenBeforeExpire(seconds = 0) {
        seconds = seconds === 0 ? this.externalConfig.refreshBeforeExpire : seconds;

        if (this.refreshTimeoutId) {
            clearTimeout(this.refreshTimeoutId);
        }

        this.refreshTimeoutId = setTimeout(
            () => this.refreshToken(),
            (this.jwtHelper.getTokenExpirationDate(this.token) - Date.now()) - seconds * 1000
        );
    }

    private refreshToken() {
        this.http.get(this.externalConfig.refreshTokenAPI).subscribe(
            (res: Response) => this.setToken(res.text()),
            () => {
                console.error('ExtendedAuthHttp: Token refresh fails.');
            }
        );
    }
}