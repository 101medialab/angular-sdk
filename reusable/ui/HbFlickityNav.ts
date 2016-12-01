import {Component, ViewChild, Input, ElementRef, OnChanges, Inject}  from '@angular/core';
import {EventDispatcher} from "../../HbComponent/EventDispatcher";
import {HbPerfectScroll} from "../directives/HbPerfectScroll";
import {Bindable} from "../Bindable";

@Component({
    selector: 'hb-flickity-nav',
    template: `
        <div #container class="flickity-nav">
            <div class="control-button center-align-items" (click)="scroll('up')">
                <span class="sprite thin-arrow-up"></span>
            </div>
            <div class="content" [hb-perfect-scroll]="{initializable: isInitialized.value}">
                <ng-content></ng-content>
            </div>
            <div class="control-button center-align-items" (click)="scroll('down')">
                <span class="sprite thin-arrow-down"></span>
            </div>
        </div>
    `,
    directives: [HbPerfectScroll]
})
export class HbFlickityNav implements OnChanges {
    protected viewInitialized: boolean = false;
    @ViewChild('container') protected container: ElementRef = null;
    @Input('options') protected options: {} = null;
    protected $el = null;
    protected instance = null;
    protected dimensions = null;
    protected isInitialized: Bindable = new Bindable(false);

    constructor(
        @Inject(EventDispatcher) protected eventDispatcher: EventDispatcher
    ) {}

    ngAfterViewInit() {
        this.viewInitialized = true;

        this.$el = $(this.container.nativeElement).find('> .content');

        this.onReadyToInitialize();
    }

    ngOnChanges(change) {
        if ('options' in change && change.options.currentValue) {
            this.options = change.options.currentValue;

            this.onReadyToInitialize();
        }
    }

    onReadyToInitialize() {
        if (this.$el) {
            var $navCells = this.$el.find('.carousel-cell');
            this.dimensions = {
                top: (this.$el.position()).top,
                height: this.$el.height()
            };

            this.eventDispatcher.listen('HB.flickity.select', [({target, index}) => {
                if ('for' in this.options && target == this.options.for + '-nav') {
                    this.$el.find('.current').removeClass('current');

                    var $current = $navCells.eq(index).addClass('current'),
                        cellHeight = $current.height();

                    this.$el.stop().animate({
                        scrollTop:
                            this.$el.scrollTop() +
                            cellHeight +
                            $current.position().top -
                            ( this.dimensions.height + cellHeight ) / 2
                    });
                }
            }]);

            this.isInitialized.value = true;
        }
    }

    scroll(direction) {
        if (this.dimensions) {
            this.$el.stop().animate({
                scrollTop: this.$el.scrollTop() + (direction === 'up' ? -1 : 1) * this.dimensions.height
            });
        }
    }
}