import {OnDestroy, EventEmitter} from '@angular/core';
import {BaseClass as Base} from '../reusable/BaseClass';
import {Status} from '../reusable/modules/status.svc';

export class BaseComponent extends Base implements OnDestroy {
    protected state: any = {
        isViewInitialized: false,
        isInitialized: false,
        current: {

        }
    };

    protected eventEmitters: Map<string, EventEmitter<() => {}>> = new Map();

    constructor(protected mainStatus: Status = null) {
        super();
    }

    ngAfterViewInit() {
        this.state.isViewInitialized = true;
    }

    listen(name: string, args: Array<() => void>, createIfNotExist: boolean = true) {
        if (!this.eventEmitters.has(name)) {
            this.eventEmitters.set(
                name,
                this.mainStatus.evtDispatcher.listen(name, args, createIfNotExist)
            );
        } else {
            console.error('BaseComponent listen: Event has been listened already.', this, arguments);
        }
    }

    emit(name: string, args: Array<() => void> = [], createIfNotExist: boolean = true) {
        this.mainStatus.evtDispatcher.emit(name, args, createIfNotExist);
    }

    mute(name) {
        if (this.eventEmitters.has(name)) {
            this.eventEmitters.get(name).unsubscribe();
        }
    }

    muteAll() {
        this.eventEmitters.forEach((subscriber) => {
            subscriber.unsubscribe();
        });

        this.eventEmitters = new Map();
    }

    ngOnDestroy() {
        this.muteAll();
    }
}