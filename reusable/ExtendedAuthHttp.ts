import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig, JwtHelper, IAuthConfigOptional } from 'angular2-jwt';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class ExtendedAuthHttpConfig {
    constructor(
        public baseUrl: string,
        public authHttpConfig: IAuthConfigOptional = {},
        public APIs: Map<string, string> = new Map(),
        public refreshTokenAPI: string = '',
        public JWToken: string = null,
        public refreshBeforeExpire: number = 60,
    ) {
    }
}

@Injectable()
export class ExtendedAuthHttp extends AuthHttp {
    private jwtHelper: JwtHelper;
    private token: string;
    private refreshTimeoutId;
    private httpClient;
    private currentAPIid: string = null;
    tokenStream: BehaviorSubject<string>;

    constructor(
        private extendedAuthHttpConfig: ExtendedAuthHttpConfig,
        http: Http, option: RequestOptions
    ) {
        super(new AuthConfig(
            Object.assign(extendedAuthHttpConfig.authHttpConfig, {
                tokenGetter: () => this.getToken(),
                noJwtError: true
            })
        ), http, option);

        this.httpClient = http;
        this.jwtHelper = new JwtHelper();
        this.setToken(this.extendedAuthHttpConfig.JWToken || '');
        this.tokenStream = new BehaviorSubject(null);
    }

    use(id) {
        this.currentAPIid = id;

        return this;
    }

    getCurrentAPIBaseUrl() {
        return this.extendedAuthHttpConfig.APIs.has(this.currentAPIid) ? this.extendedAuthHttpConfig.APIs.get(this.currentAPIid) : '';
    }

    get(...args) {
        return this.__call('get', args);
    }

    post(...args) {
        return this.__call('post', args);
    }

    put(...args) {
        return this.__call('put', args);
    }

    patch(...args) {
        return this.__call('patch', args);
    }

    delete(...args) {
        return this.__call('delete', args);
    }

    __call(action, args) {
        args[0] =
            !/^(https?:\/\/|\/\/)/.test(args[0]) ?
                this.extendedAuthHttpConfig.baseUrl + this.getCurrentAPIBaseUrl() + (args[0] !== '' ? '/' + args[0] : '') :
                args[0]
        ;

        return super[action](...args);
    }

    private isTokenNeedToRefresh() {
        return !this.token || this.jwtHelper.isTokenExpired(this.token, this.extendedAuthHttpConfig.refreshBeforeExpire);
    }

    public getToken() {
        return this.token;
    }

    public setToken(token) {
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            this.token = token;
            this.tokenStream.next(token);
        }

        if (this.token) {
            if (this.isTokenNeedToRefresh()) {
                this.refreshToken();
            }

            this.refreshTokenBeforeExpire();
        }
    }

    private refreshTokenBeforeExpire(seconds = 0) {
        seconds = seconds === 0 ? this.extendedAuthHttpConfig.refreshBeforeExpire : seconds;

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
            this.extendedAuthHttpConfig.refreshTokenAPI, {
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