import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, IAuthConfigOptional } from 'angular2-jwt';
export declare class ExtendedAuthHttpConfig {
    baseUrl: string;
    authHttpConfig: IAuthConfigOptional;
    APIs: Map<string, string>;
    refreshTokenAPI: string;
    JWToken: string;
    refreshBeforeExpire: number;
    constructor(baseUrl: string, authHttpConfig?: IAuthConfigOptional, APIs?: Map<string, string>, refreshTokenAPI?: string, JWToken?: string, refreshBeforeExpire?: number);
}
export declare class ExtendedAuthHttp extends AuthHttp {
    private extendedAuthHttpConfig;
    private jwtHelper;
    private token;
    private refreshTimeoutId;
    private httpClient;
    private currentAPIid;
    constructor(extendedAuthHttpConfig: ExtendedAuthHttpConfig, http: Http, option: RequestOptions);
    use(id: any): this;
    getCurrentAPIBaseUrl(): string;
    get(...args: any[]): any;
    post(...args: any[]): any;
    put(...args: any[]): any;
    patch(...args: any[]): any;
    delete(...args: any[]): any;
    __call(action: any, args: any): any;
    private isTokenNeedToRefresh();
    getToken(): string;
    setToken(token: any): void;
    private refreshTokenBeforeExpire(seconds?);
    private refreshToken();
}
