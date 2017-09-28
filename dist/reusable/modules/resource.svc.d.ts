import { ExtendedAuthHttp } from '../ExtendedAuthHttp';
import { EventDispatcher } from '../../HbComponent/EventDispatcher';
import { BaseResource } from '../../HbComponent/BaseResource';
import { Config } from './Config';
export declare class Resource extends BaseResource {
    private config;
    constructor(http: ExtendedAuthHttp, config: Config, eventDispatcher: EventDispatcher);
    createOne(): any;
}
