import { EventEmitter } from '@angular/core';
export declare class EventDispatcher {
    private emitters;
    constructor();
    get(name: string, createIfNotExist?: boolean): EventEmitter<() => {}>;
    listen(name: string, args: Array<(args: any) => void>, createIfNotExist?: boolean): any;
    emit(name: string, args?: Array<any>, createIfNotExist?: boolean): void;
    create(name: string, force?: boolean): false | EventEmitter<() => {}>;
    remove(name: string): boolean;
}
