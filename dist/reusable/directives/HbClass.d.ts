import { OnChanges, ElementRef } from '@angular/core';
import { Status } from '../modules/status.svc';
export declare class HbClassConfig {
    event: string;
    action: string;
    class: string;
    delay: number;
    emitWhenDone: any;
}
export declare class HbClass implements OnChanges {
    private el;
    private mainStatus;
    private $el;
    config: any;
    constructor(el: ElementRef, mainStatus: Status);
    ngOnChanges({config}: any): void;
    normalizeToggleConfig(config: any): any[];
    normalizeChainConfig(config: any): any[];
    registerListener(config: HbClassConfig): void;
}
