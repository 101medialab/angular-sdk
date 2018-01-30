import { EventEmitter } from '@angular/core';
export declare class BaseEventEmitter {
    private name;
    protected _emitter: EventEmitter<() => {}>;
    constructor(name: string);
    readonly emitter: EventEmitter<() => {}>;
    emit(): void;
    subscribe(): void;
}
