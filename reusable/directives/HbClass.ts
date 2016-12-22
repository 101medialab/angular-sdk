import {Directive, Input, OnChanges, ElementRef} from '@angular/core';
import {BaseComponent} from '../../HbComponent/BaseComponent';
import {Status} from '../modules/status.svc';

export class HbClassConfig {
    event = '';
    action = '';
    class = '';
    delay = 0;
    emitWhenDone = null;
}

// TODO: isInitialized has not checked
@Directive({
    selector: '[hbClass]',
})
export class HbClass implements OnChanges {
    private $el;
    @Input('hbClass') public config: any;

    constructor(private el: ElementRef, private mainStatus: Status) {
        this.$el = $(this.el.nativeElement);
    }

    ngOnChanges({config}: any) {
        if (config.currentValue) {
            this.config = config.currentValue;

            if (!(this.config instanceof Array)) {
                this.config = [this.config];
            }

            let normalizedConfig = [];
            this.config.forEach((_config) => {
                let result = null;

                if ('toggle' in _config) {
                    result = this.normalizeToggleConfig(_config);
                } else if ('actions' in _config) {
                    result = this.normalizeChainConfig(_config);
                } else {
                    result = [_config];
                }

                normalizedConfig = normalizedConfig.concat(result);
            });

            normalizedConfig.forEach((config: HbClassConfig) => {
                this.registerListener(config);
            });
        }
    }

//  {
//      toggle: {
//          add: '',
//          remove: ''
//      },
//      class: '',
//      delay: 0,
//      emitWhenDone: {
//          add: '',
//          remove: ''
//      }
//  }
    normalizeToggleConfig(config) {
        let result = [];

        ['add', 'remove'].forEach((action)=> {
            if (action in config.toggle) {
                let temp = new HbClassConfig();

                temp.action = action;
                temp.event = config.toggle[action];
                temp.class = config.class;
                temp.delay = config.delay || 0;

                if ('emitWhenDone' in config && action in config.emitWhenDone) {
                    temp.emitWhenDone = config.emitWhenDone[action];
                }

                result.push(temp);
            }
        });

        return result;
    }

//  {
//      event: '',
//      actions: [{
//          action: '',
//          class: '',
//          delay: 0,
//          emitWhenDone: ''
//      }]
//  }
    normalizeChainConfig(config) {
        let result = [];

        config.actions.forEach((action) => {
            let temp = new HbClassConfig();

            for (let key in action) {
                if (key in temp) {
                    temp[key] = action[key];
                }
            }

            temp.event = config.event;

            result.push(temp);
        });

        return result;
    }

    registerListener(config: HbClassConfig) {
        config.delay = config.delay || 0;

        this.mainStatus.evtDispatcher.listen(
            config.event,
            [() => {
                setTimeout(() => {
                    let action = !('action' in config) ?
                            this.$el.hasClass(config.class) ?
                                'remove' : 'add' :
                            config.action
                        ;

                    this.$el[action + 'Class'](config.class);

                    if ('emitWhenDone' in config) {
                        this.mainStatus.evtDispatcher.emit(config.emitWhenDone);
                    }
                }, config.delay);
            }]
        );
    }
}