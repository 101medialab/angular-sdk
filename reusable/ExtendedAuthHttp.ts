import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthHttp, AuthConfig, JwtHelper} from 'angular2-jwt';

@Injectable()
export class ExtendedAuthHttp extends AuthHttp {
    private jwtHelper: JwtHelper;
    private externalConfig;
    private token: string;
    private refreshTimeoutId;
    private httpClient;

    constructor(config: any, http: Http) {
        let externalConfig = Object.assign({
            JWToken: null,
            refreshBeforeExpire: 60,
            authHttpConfig: {}
        }, config);

        super(new AuthConfig(
            Object.assign(externalConfig.authHttpConfig, {
                tokenGetter: () => this.getToken(),
                noJwtError: true
            })
        ), http);

        this.httpClient = http;
        this.jwtHelper = new JwtHelper();
        this.setToken(externalConfig.JWToken || '');
        this.externalConfig = externalConfig;
    }

    private isTokenNeedToRefresh() {
        return !this.token || this.jwtHelper.isTokenExpired(this.token, this.externalConfig.refreshBeforeExpire);
    }

    private getToken() {
        return this.token;
    }

    public setToken(token) {
        if (token && !this.jwtHelper.isTokenExpired(token)) this.token = token;

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

        let now = (new Date()).getTime(),
            then = this.jwtHelper.getTokenExpirationDate(this.token).getTime(),
            diff = Math.max((then - now), 0);

        this.refreshTimeoutId = setTimeout(
            () => this.refreshToken(), (
                diff > 0x7FFFFFFF ? 0x7FFFFFFF : diff
            ) - seconds * 1000
        );
    }

    private refreshToken() {
        this.httpClient.get(
            this.externalConfig.refreshTokenAPI, {
                headers: new Headers({
                    "Authorization": "Bearer " + this.getToken()
                })
            }
        ).subscribe(
            (res: Response) => {
                this.setToken(res.json()['token'])
            }, () => {
                console.error('ExtendedAuthHttp: Token refresh fails.');
            }
        );
    }
}