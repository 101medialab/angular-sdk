import { BaseDIContainer } from '../../HbComponent/BaseDIContainer';
import { Config } from './Config';
import { Status } from './status.svc';
export declare class DummyDIContainer {
    private _baseDI;
    private _config;
    private _status;
    constructor(baseDI: BaseDIContainer, config: Config, status: Status);
    readonly baseDI: BaseDIContainer;
    readonly config: Config;
    readonly status: Status;
}
