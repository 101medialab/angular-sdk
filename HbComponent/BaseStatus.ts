import {Injectable} from '@angular/core';
import {EventDispatcher} from "./EventDispatcher";
import {BaseResource} from "./BaseResource";

@Injectable()
export class BaseStatus {
    constructor(protected _evtDispatcher: EventDispatcher, private _resource?: BaseResource = null) {}

    get evtDispatcher(): EventDispatcher {
        return this._evtDispatcher;
    }

    get resource(): BaseResource {
        return this._resource;
    }
}