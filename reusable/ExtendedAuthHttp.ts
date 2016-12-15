import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthHttp, AuthConfig, JwtHelper} from 'angular2-jwt';
import HttpHeader from 'ngSDK/HbComponent/HttpHeader';

@Injectable()
export default class ExtendedAuthHttp extends AuthHttp {
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

        var now = (new Date()).getTime(),
            then = this.jwtHelper.getTokenExpirationDate(this.token).getTime(),
            diff = Math.max((then - now), 0);

        this.refreshTimeoutId = setTimeout(
            () => this.refreshToken(), (
                diff > 0x7FFFFFFF ? 0x7FFFFFFF : diff
            ) - seconds * 1000
        );
    }

    private refreshToken() {
        this.http.get(
            this.externalConfig.refreshTokenAPI, {
                headers: new Headers({
                    "Authorization": "Bearer " + this.getToken()
                })
            }
        ).subscribe(
                console.error('ExtendedAuthHttp: Token refresh fails.');
            }
        );
    }
}