import { HttpHeader } from './HttpHeader';
import { ExtendedAuthHttp } from '../reusable/ExtendedAuthHttp';
import { EventDispatcher } from './EventDispatcher';
export declare class BaseResource {
    protected http: ExtendedAuthHttp;
    private _baseUrl;
    private eventDispatcher;
    private _isCancelIfLoading;
    private headers;
    private cache;
    private currentLoading;
    constructor(http: ExtendedAuthHttp, _baseUrl: string, headers: HttpHeader[], eventDispatcher: EventDispatcher);
    createOne(): void;
    addDefaultHeader(header: HttpHeader): this;
    addDefaultHeaders(headers: Array<HttpHeader>): this;
    removeDefaultHeader(header: HttpHeader | string): this;
    removeDefaultHeaders(headers: Array<HttpHeader | string>): this;
    baseUrl: string;
    isCancelIfLoading: boolean;
    isLoading(): boolean;
    cancelIfLoading(url: string): void;
    get(url: string, headers?: Array<HttpHeader>, forceReload?: boolean, noLoadingScreen?: boolean): Promise<{}>;
    post(url: string, body: any | '', headers?: Array<HttpHeader>): Promise<{}>;
    send(action: string, url: string, body: any | '', headers?: Array<HttpHeader>, skipJSONConverting?: boolean): Promise<{}>;
    cancelAllCurrentLoading(): void;
    cancelCurrentLoading(url: any): void;
    private extendBaseHeader(headers);
}
