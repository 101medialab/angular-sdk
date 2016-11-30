/// <reference path="../../typings/angular2.d.ts" />

import {Bindable} from "../reusable/Bindable";
import {Status} from '../reusable/modules/status.svc';
import {BaseComponent} from "../HbComponent/BaseComponent";

export class SlideMenuComponent extends BaseComponent {
    constructor(status: Status) {
        super(status);

        this.state.isOpened = new Bindable(false);

        this.listen('HB.show.SLIDE_MENU', [() => {
            this.state.isOpened.value = true;
        }], true);
    }

    dismissSlideMenu() {
        this.emit('HB.hide.SLIDE_MENU');

        this.state.isOpened.value = false;
    }
}
