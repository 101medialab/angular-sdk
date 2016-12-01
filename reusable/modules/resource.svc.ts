import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {ExtendedAuthHttp} from '../ExtendedAuthHttp';
import {EventDispatcher} from "../../HbComponent/EventDispatcher";
import {BaseResource} from '../../HbComponent/BaseResource';
import {HttpHeader} from "../../HbComponent/HttpHeader";
import {Config} from "./Config";

@Injectable()
export class Resource extends BaseResource {
    constructor(
        http: ExtendedAuthHttp,
        private config: Config,
        eventDispatcher: EventDispatcher
    ) {
        super(http, config.API_DOMAIN_URL, [
            new HttpHeader('Accept', 'application/json'),
            new HttpHeader('Content-Type', 'application/json')
        ], eventDispatcher);
    }

    createOne() {
        return new this.config.ResourceClass();
    }
}
