import {Inject, Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {HttpHeader} from './HttpHeader';
import {ExtendedAuthHttp} from '../reusable/ExtendedAuthHttp';
import {EventDispatcher} from './EventDispatcher';

@Injectable()
export class BaseResource {
    private _isCancelIfLoading: boolean = true;
    private headers = new Headers();
    private cache: Map<string, any> = new Map();
    private currentLoading: Map<string, any> = new Map();

    constructor(
        @Inject(ExtendedAuthHttp) protected http: ExtendedAuthHttp,
        @Inject('') private _baseUrl: string,
        @Inject([]) headers: HttpHeader[] = [],
        @Inject(EventDispatcher) private eventDispatcher: EventDispatcher
    ) {
        this.headers = new Headers();

        this.addDefaultHeaders(headers);
    }

    createOne() {
    }

    addDefaultHeader(header: HttpHeader) {
        this.headers.append(header.name, header.value);

        return this;
    }

    addDefaultHeaders(headers: Array<HttpHeader>) {
        headers.forEach((header: HttpHeader) => this.addDefaultHeader(header));

        return this;
    }

    removeDefaultHeader(header: HttpHeader | string) {
        this.headers.delete(typeof header === 'string' ? header : header.name);

        return this;
    }

    removeDefaultHeaders(headers: Array<HttpHeader | string>) {
        headers.forEach((header: HttpHeader) => this.removeDefaultHeader(header));

        return this;
    }

    get baseUrl(): string {
        return this._baseUrl;
    }

    set baseUrl(value: string) {
        this._baseUrl = value;
    }

    get isCancelIfLoading(): boolean {
        return this._isCancelIfLoading;
    }

    set isCancelIfLoading(value: boolean) {
        this._isCancelIfLoading = value;
    }

    isLoading() {
        return this.currentLoading.size > 0;
    }

    cancelIfLoading(url: string) {
        if (this.isLoading() && this.currentLoading.has(url)) {
            this.cancelCurrentLoading(url);
        }
    }

    get(url: string, headers: Array<HttpHeader> = [], forceReload: boolean = false, noLoadingScreen = false): any {
        let reqHeaders = this.extendBaseHeader(headers),
            requestUrl = this._baseUrl + url;

        if (this.isCancelIfLoading) {
            this.cancelIfLoading(url);
        }

        if (!forceReload && this.cache.has(requestUrl)) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(this.cache.get(requestUrl));

                    this.eventDispatcher.emit('HB.resource.LOAD_DONE');
                }, 250);
            });
        }

        return new Promise((resolve, reject) => {
            if (!noLoadingScreen) {
                this.eventDispatcher.emit('HB.resource.LOAD_BEGIN');
            }

            let containQuestionMark = requestUrl.indexOf('?') > -1,
                request = this.http.get(
                    requestUrl + (
                        forceReload ? (
                            containQuestionMark ? '&' : '?'
                        ) + 'force=1&_cache_busting=' + Date.now() : ''
                    ),
                    {headers: reqHeaders}
                );

            request
                .subscribe(
                    (res) => {
                        res = res.json();

                        let notCancelYet = this.currentLoading.has(requestUrl);

                        this.currentLoading.delete(requestUrl);
                        this.cache.set(requestUrl, res);

                        resolve(res);

                        if (!noLoadingScreen && notCancelYet) {
                            this.eventDispatcher.emit('HB.resource.LOAD_DONE');
                        }
                    }, (error) => {
                        reject(error);
                    }
                );

            this.currentLoading.set(requestUrl, {request, resolve, reject});
        });
    }

    post(url: string, body: any | '', headers: Array<HttpHeader> = []): any {
        return this.send('post', url, body, headers);
    }

    send(action: string, url: string, body: any | '', headers: Array<HttpHeader> = [], skipJSONConverting = false): any {
        let reqHeaders = this.extendBaseHeader(headers),
            reqBody = typeof body === 'object' ? JSON.stringify(body) : body;

        if (this.isCancelIfLoading) {
            this.cancelIfLoading(url);
        }

        return new Promise((resolve, reject) => {
            let request =
                this.http[action](this._baseUrl + url, reqBody, {headers: reqHeaders})
                    .subscribe(
                        (res) => {
                            if (!skipJSONConverting) {
                                res = res.json();
                            }

                            this.currentLoading.delete(url);

                            resolve(res);
                        },
                        (error) => {
                            reject(error);
                        }
                    );

            this.currentLoading.set(url, {request, resolve, reject});
        });
    }

    // This function might over kill some requests.
    // TODO: Currently when component destroys, it will call this method to prevent any callback to component no longer exist(as destroyed)
    //       However this method will trigger `EXCEPTION: Error: Uncaught (in promise): undefined` error, may be it need to terminate L83 and L109's promises by calling promise.done();
    //       http://stackoverflow.com/questions/28001722/how-to-catch-uncaught-exception-in-promise
    cancelAllCurrentLoading() {
        this.currentLoading.forEach((currentLoading, url) => {
            this.cancelCurrentLoading(url);
        });
    }

    cancelCurrentLoading(url) {
        let currentLoading = this.currentLoading.get(url);

        currentLoading.reject(new Error('BaseResource is cancelling loading. URL: ' + this.baseUrl + url));
    }

    private extendBaseHeader(headers): Headers {
        let reqHeaders = new Headers(this.headers);
        headers.forEach((header: HttpHeader) => reqHeaders.append(header.name, header.value));

        return reqHeaders;
    };
}