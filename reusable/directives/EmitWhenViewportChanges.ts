import {Directive, Input, ElementRef, Inject, OnChanges, OnDestroy} from '@angular/core';
import {Status} from "../modules/status.svc";
import {BaseComponent} from "../../HbComponent/BaseComponent";
import * as RxDOM from 'rx-dom';

@Directive({
    selector: '[emitWhenViewportChanges]'
})

export class EmitWhenViewportChanges extends BaseComponent implements OnChanges {
    private $el;
    private isInitialized: boolean = false;
    @Input('emitWhenViewportChanges') private config: {};

    constructor(
        status: Status,
        private el: ElementRef
    ) {
        super(status);

        this.$el = $(this.el.nativeElement);
    }

    ngOnChanges({config}) {
        if (!this.isInitialized) {
            this.config = config.currentValue;

            if (!('refreshRate' in this.config)) {
                this.config.refreshRate = 100;
            }

            var $target = $(this.config.target ? this.config.target : window),
                prevIsAppearedStatus = false,
                prevIsDisappearedStatus = false,
                $window = $(window);

            var observable = RxDOM.DOM.scroll($target[0]);

            if (this.config.refreshRate !== 0) {
                observable.throttle(this.config.refreshRate)
            }

            this.config = $.extend(true, {
                offsetViewport: {
                    top: 0,
                    bottom: 0
                }
            }, this.config);

            observable.subscribe(() => {
                var docViewTop = $window.scrollTop() + this.config.offsetViewport.top,
                    docViewBottom = docViewTop + $window.outerHeight() + this.config.offsetViewport.bottom,
                    elemTop = this.$el.offset().top,
                    elemBottom = elemTop + this.$el.outerHeight(),
                    isAppeared = elemBottom >= docViewTop && elemTop <= docViewBottom,
                    isDisappeared = elemBottom <= docViewTop || elemTop >= docViewBottom;

                if (prevIsAppearedStatus != isAppeared) {
                    if (isAppeared && 'appear' in this.config) {
                        (
                            this.config.appear instanceof Array ?
                                this.config.appear :
                                [this.config.appear]
                        ).forEach((event) => {
                            this.emit(event);
                        });
                    }

                    prevIsAppearedStatus = isAppeared;
                }

                if (prevIsDisappearedStatus != isDisappeared) {
                    if (isDisappeared && 'disappear' in this.config) {
                        (
                            this.config.disappear instanceof Array ?
                                this.config.disappear :
                                [this.config.disappear]
                        ).forEach((event) => {
                            this.emit(event);
                        });
                    }

                    prevIsDisappearedStatus = isDisappeared;
                }
            });

            // TODO: This part is not working. Event emitted but not disposed.
            this.listen(config.stopEmitWhen, [() => {
                observable.dispose();
            }]);

            this.isInitialized = true;
        }
    }
}