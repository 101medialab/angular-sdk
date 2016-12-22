import {Component, ViewChild, Input, ElementRef, OnChanges, Inject}  from '@angular/core';
import {EventDispatcher} from '../../HbComponent/EventDispatcher';
import Flickity from 'flickity/js/flickity.js';
import 'flickity-bg-lazyload';

@Component({
    selector: 'hb-flickity',
    template: `
        <div #container>
            <ng-content></ng-content>
        </div>
    `
})
export class HbFlickity implements OnChanges {
    protected viewInitialized: boolean = false;
    @ViewChild('container') protected container: ElementRef = null;
    @Input('options') protected options: any = null;
    protected $el = null;
    protected $slider = null;
    protected Flickity = null;
    protected instance = null;

    constructor(@Inject(EventDispatcher) protected eventDispatcher: EventDispatcher) {}

    ngAfterViewInit() {
        this.viewInitialized = true;

        this.$el = $(this.container.nativeElement);

        this.Flickity = Flickity;

        this.onReadyToInitialize();
    }

    ngOnChanges(change) {
        if ('options' in change && change.options.currentValue) {
            this.options = change.options.currentValue;

            this.onReadyToInitialize();
        }
    }

    onReadyToInitialize() {
        if (
            this.viewInitialized &&
            this.Flickity &&
            this.$el &&
            this.options
        ) {
            if (!this.$slider) {
                this.$slider = this.$el.find('.flickity')
            }

            setTimeout(()=> {
                this.instance = new this.Flickity(this.$slider[0], this.options.flickity);

                this.onInitialized();
            }, 1000);
        }
    }

    onInitialized() {}
}