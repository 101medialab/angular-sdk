import {Directive, Input, ElementRef, OnChanges, OnDestroy} from '@angular/core';
import {EventDispatcher} from '../../HbComponent/EventDispatcher';

@Directive({
    selector: '[hbHeightModifier]',
})
export class HbHeightModifier implements OnChanges, OnDestroy {
    private $el;
    @Input('hbHeightModifier') private config;
    private isExpanded = false;

    constructor(private el: ElementRef, private eventDispatcher: EventDispatcher) {
        this.$el = $(this.el.nativeElement);
    }

    // TODO: Support namespace in this.config.name
    ngOnChanges({config}: any) {
        if (config.currentValue) {
            if (this.config.initializable) {
                setTimeout(()=> {
                    let $target = $(this.config.target),
                        $heightSource = $(this.config.heightSource),
                        $defaultHeightSource = this.config.defaultHeightSource && $(this.config.defaultHeightSource);

                    this.config.expandedHeight = $heightSource.height();

                    if (this.config.event.updateDefault && $defaultHeightSource) {
                        this.eventDispatcher.listen(this.config.event.updateDefault, [() => {
                            $defaultHeightSource = this.config.defaultHeightSource && $(this.config.defaultHeightSource);

                            this.config.default =
                                $defaultHeightSource.position().top -
                                $defaultHeightSource.parent().position().top;

                            this.config.expandedHeight = $heightSource.height();

                            this.eventDispatcher.emit(this.config.event[this.isExpanded ? 'expand' : 'collapse']);
                        }]);

                        this.config.default =
                            $defaultHeightSource.position().top -
                            $defaultHeightSource.parent().position().top;

                        $target.css({'height': this.config.default + 'px'});
                    }

                    this.eventDispatcher.listen(this.config.event.expand, [() => {
                        this.isExpanded = true;

                        $target.animate({'height': this.config.expandedHeight + 'px'});
                    }]);

                    this.eventDispatcher.listen(this.config.event.collapse, [() => {
                        this.isExpanded = false;

                        $target.animate({'height': this.config.default + 'px'});
                    }]);
                }, 100);
            }
        }
    }

    ngOnDestroy() {
        for (let key in this.config.event) {
            this.eventDispatcher.remove(this.config.event[key]);
        }
    }
}