import { ElementRef } from '@angular/core';
export declare class ShareButton {
    private el;
    data: {
        name: string;
        href: string;
    };
    constructor(el: ElementRef);
    onClick(evt: any): void;
}
