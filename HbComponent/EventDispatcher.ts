import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export default class EventDispatcher {
    private emitters: Map = new Map();

    constructor() {}

    get(name: string, createIfNotExist?: boolean = false) {
        if (createIfNotExist && !this.emitters.has(name)) {
            this.create(name);
        }

        return this.emitters.get(name);
    }

    listen(name: string, args: Array, createIfNotExist?: boolean = true) {
        return EventEmitter.prototype.subscribe.apply(this.get(name, createIfNotExist), args);
    }

    emit(name: string, args: Array = [], createIfNotExist?: boolean = true) {
        EventEmitter.prototype.emit.apply(this.get(name, createIfNotExist), args);
    }

    create(name: string, force?: boolean = false) {
        if (force && this.emitters.has(name)) {
            return false;
        }

        return this.emitters.set(name, new EventEmitter()).get(name);
    }

    remove(name: string) {
        return this.emitters.delete(name);
    }
}