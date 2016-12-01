import {Component, Input} from '@angular/core';
import {Bindable} from '../Bindable';

@Component({
    selector: 'backdrop',
    template: `
        <div [ngClass]="{'cover-screen': mode === 'screen', 'cover-container': mode === 'container' }"
             [hidden]="!data.value" (click)="data.value = false"></div>
     `
})
export class Backdrop {
    @Input('showWhen') data: Bindable;
    @Input('mode') mode: string = 'screen';

    constructor() {}
}
