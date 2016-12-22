import { OnInit, OnChanges, ElementRef } from '@angular/core';
export declare class BackToTop implements OnInit, OnChanges {
    private el;
    private $el;
    private target;
    private $target;
    constructor(el: ElementRef);
    ngOnInit(): void;
    ngOnChanges({target}: {
        target;
    }): void;
}
