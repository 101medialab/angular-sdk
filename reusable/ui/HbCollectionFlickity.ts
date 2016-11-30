/// <reference path="../../../typings/angular2.d.ts" />

import {Component, ViewChild, Input, ElementRef, OnChanges, Inject}  from '@angular/core';
import {EventDispatcher} from "../../HbComponent/EventDispatcher";
import {HbFlickity} from "./HbFlickity";

@Component({
    selector: 'hb-flickity',
    template: `
        <div #container>
            <ng-content></ng-content>
        </div>
    `
})
export class HbCollectionFlickity extends HbFlickity implements OnChanges {
    @Input('options') protected options: {} = null;
    @ViewChild('container') protected container: ElementRef = null;

    constructor(@Inject(EventDispatcher) eventDispatcher: EventDispatcher) {
        super(eventDispatcher);
    }

    ngOnChanges(change) {
        if ('options' in change && change.options.currentValue) {
            this.options = change.options.currentValue;
        }

        super.ngOnChanges(change);
    }

    onInitialized() {
        this.eventDispatcher.listen('HB.flickity.select', [({target, index}) => {
            if ('name' in this.options && target == this.options.name) {
                this.instance.select(index);
            }
        }]);

        this.$slider.on('select.flickity', () => {
            this.eventDispatcher.emit('HB.flickity.select', [{
                target: this.options.name + '-nav',
                index: this.instance.selectedIndex
            }]);
        });
    }
}