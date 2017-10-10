import { EventDispatcher } from './EventDispatcher';
import { BaseResource } from './BaseResource';
export declare class BaseStatus {
    protected _evtDispatcher: EventDispatcher;
    private _resource;
    protected _redirectToOnceLoggedIn: string;
    protected _current: any;
    constructor(_evtDispatcher: EventDispatcher, _resource?: BaseResource);
    reset(): void;
    readonly current: any;
    readonly evtDispatcher: EventDispatcher;
    readonly resource: BaseResource;
    setCurrentUser(value: any): void;
    getCurrentUser(): any;
    redirectToOnceLoggedIn: string;
}
