import { OnDestroy, EventEmitter } from '@angular/core';
import { BaseClass as Base } from '../reusable/BaseClass';
import { Status } from '../reusable/modules/status.svc';
export declare class BaseComponent extends Base implements OnDestroy {
    protected mainStatus: Status;
    state: any;
    protected eventEmitters: Map<string, EventEmitter<() => {}>>;
    constructor(mainStatus?: Status);
    ngAfterViewInit(): void;
    listen(name: string, args: Array<any>, createIfNotExist?: boolean): void;
    emit(name: string, args?: Array<any>, createIfNotExist?: boolean): void;
    mute(name: any): void;
    muteAll(): void;
    ngOnDestroy(): void;
}
