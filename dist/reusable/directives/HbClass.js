import { Directive, Input, ElementRef } from '@angular/core';
import { Status } from '../modules/status.svc';
var HbClassConfig = /** @class */ (function () {
    function HbClassConfig() {
        this.event = '';
        this.action = '';
        this.class = '';
        this.delay = 0;
        this.emitWhenDone = null;
    }
    return HbClassConfig;
}());
export { HbClassConfig };
// TODO: isInitialized has not checked
var HbClass = /** @class */ (function () {
    function HbClass(el, mainStatus) {
        this.el = el;
        this.mainStatus = mainStatus;
        this.$el = $(this.el.nativeElement);
    }
    HbClass.prototype.ngOnChanges = function (_a) {
        var _this = this;
        var config = _a.config;
        if (config.currentValue) {
            this.config = config.currentValue;
            if (!(this.config instanceof Array)) {
                this.config = [this.config];
            }
            var normalizedConfig_1 = [];
            this.config.forEach(function (_config) {
                var result = null;
                if ('toggle' in _config) {
                    result = _this.normalizeToggleConfig(_config);
                }
                else if ('actions' in _config) {
                    result = _this.normalizeChainConfig(_config);
                }
                else {
                    result = [_config];
                }
                normalizedConfig_1 = normalizedConfig_1.concat(result);
            });
            normalizedConfig_1.forEach(function (config) {
                _this.registerListener(config);
            });
        }
    };
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
    HbClass.prototype.normalizeToggleConfig = 
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
    function (config) {
        var result = [];
        ['add', 'remove'].forEach(function (action) {
            if (action in config.toggle) {
                var temp = new HbClassConfig();
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
    };
    //  {
    //      event: '',
    //      actions: [{
    //          action: '',
    //          class: '',
    //          delay: 0,
    //          emitWhenDone: ''
    //      }]
    //  }
    //  {
    //      event: '',
    //      actions: [{
    //          action: '',
    //          class: '',
    //          delay: 0,
    //          emitWhenDone: ''
    //      }]
    //  }
    HbClass.prototype.normalizeChainConfig = 
    //  {
    //      event: '',
    //      actions: [{
    //          action: '',
    //          class: '',
    //          delay: 0,
    //          emitWhenDone: ''
    //      }]
    //  }
    function (config) {
        var result = [];
        config.actions.forEach(function (action) {
            var temp = new HbClassConfig();
            for (var key in action) {
                if (key in temp) {
                    temp[key] = action[key];
                }
            }
            temp.event = config.event;
            result.push(temp);
        });
        return result;
    };
    HbClass.prototype.registerListener = function (config) {
        var _this = this;
        config.delay = config.delay || 0;
        this.mainStatus.evtDispatcher.listen(config.event, [function () {
                setTimeout(function () {
                    var action = !('action' in config) ?
                        _this.$el.hasClass(config.class) ?
                            'remove' : 'add' :
                        config.action;
                    _this.$el[action + 'Class'](config.class);
                    if ('emitWhenDone' in config) {
                        _this.mainStatus.evtDispatcher.emit(config.emitWhenDone);
                    }
                }, config.delay);
            }]);
    };
    HbClass.decorators = [
        { type: Directive, args: [{
                    selector: '[hbClass]',
                },] },
    ];
    /** @nocollapse */
    HbClass.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Status, },
    ]; };
    HbClass.propDecorators = {
        "config": [{ type: Input, args: ['hbClass',] },],
    };
    return HbClass;
}());
export { HbClass };
//# sourceMappingURL=HbClass.js.map