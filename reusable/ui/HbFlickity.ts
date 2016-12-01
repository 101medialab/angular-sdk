import {NgFor} from '@angular/common';
import {Component, ViewChild, Input, ElementRef, OnChanges, Inject}  from '@angular/core';
import {Asset} from "../../reusable/pipe/Asset";
import {Photon} from "../../reusable/pipe/Photon";
//import 'woothemes/FlexSlider';
import {EventDispatcher} from "../../HbComponent/EventDispatcher";

@Component({
    selector: 'hb-flickity',
    template: `
        <div #container>
            <ng-content></ng-content>
        </div>
    `,
    directives: [NgFor],
    pipes: [Asset, Photon]
})
export class HbFlickity implements OnChanges {
    protected viewInitialized: boolean = false;
    @ViewChild('container') protected container: ElementRef = null;
    @Input('options') protected options: {} = null;
    protected $el = null;
    protected $slider = null;
    protected Flickity = null;
    protected instance = null;

    constructor(@Inject(EventDispatcher) protected eventDispatcher: EventDispatcher) {}

    ngAfterViewInit() {
        this.viewInitialized = true;

        this.$el = $(this.container.nativeElement);

        System.import('flickity/js/flickity.js').then(() => {
            System.import('flickity-bg-lazyload').then((Flickity) => {
                this.Flickity = Flickity;

                this.onReadyToInitialize();
            })
        });
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