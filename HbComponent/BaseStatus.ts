import {Injectable} from '@angular/core';
import EventDispatcher from './EventDispatcher';
import BaseResource from './BaseResource';

@Injectable()
export default class BaseStatus {
    protected _redirectToOnceLoggedIn = '';
    protected _current = {
        username: null,
    };

    constructor(protected _evtDispatcher: EventDispatcher, private _resource?: BaseResource = null) {}

    reset() {
        this._current.username = null;
    }

    get current(): any {
        return this._current;
    }

    get evtDispatcher(): EventDispatcher {
        return this._evtDispatcher;
    }

    get resource(): BaseResource {
        return this._resource;
    }

    setCurrentUser(value: any) {
        this.current.username = value;
    }

    getCurrentUser(): any {
        return this.current.username;
    }

    get redirectToOnceLoggedIn(): string {
        return this._redirectToOnceLoggedIn;
    }

    set redirectToOnceLoggedIn(value: string) {
        this._redirectToOnceLoggedIn = value;
    }
}