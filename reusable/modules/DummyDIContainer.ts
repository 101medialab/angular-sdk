import {BaseDIContainer} from "../../HbComponent/BaseDIContainer";
import {Config} from "./Config";
import {Status} from "./status.svc";

export class DummyDIContainer {
    private _baseDI: BaseDIContainer;
    private _config: Config;
    private _status: Status;

    constructor(baseDI: BaseDIContainer, config: Config, status: Status) {
        this._baseDI = baseDI;
        this._config = config;
        this._status = status;
    }

    get baseDI(): BaseDIContainer {
        return this._baseDI;
    }

    get config(): Config {
        return this._config;
    }

    get status(): Status {
        return this._status;
    }
}