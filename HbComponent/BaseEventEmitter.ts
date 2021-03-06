import {EventEmitter, Inject, Injectable} from '@angular/core';

@Injectable()
export class BaseEventEmitter {
    protected _emitter: EventEmitter<() => {}> = new EventEmitter();

    constructor(@Inject('') private name: string) {}

    get emitter(): EventEmitter<() => {}> {
        return this._emitter;
    }

    emit() {
        EventEmitter.prototype.emit.apply(this._emitter, arguments);
    }

    subscribe() {
        EventEmitter.prototype.subscribe.apply(this._emitter, arguments);
    }
}
