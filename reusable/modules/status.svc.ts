/// <reference path="../../../typings/angular2.d.ts" />

import {Injectable, Inject} from '@angular/core';
import {BaseStatus} from '../../HbComponent/BaseStatus';
import {EventDispatcher} from "../../HbComponent/EventDispatcher";
import {Resource} from './resource.svc';
import {Bindable} from "../Bindable";
import * as RxDOM from 'rx-dom';

@Injectable()
export class Status extends BaseStatus {
    private static appEnv = $('body').hasClass('env-prod');
    private deviceType = new Bindable('');
    private deviceHeight = new Bindable('');
    private $win;
    private $head;
    private $metas = {};
    private dataForNextRoute: any = null;

    // Use this to hide UI only, it is very easy to hack
    private _isEditor = window._hypebeast.isEditor || false;
    
    get isEditor() {
        return this._isEditor;
    }

    constructor(
        eventDispatcher: EventDispatcher,
        resource: Resource
    ) {
        super(eventDispatcher, resource);

        this.$win = $(window);
        this.$head = $('head');

        RxDOM.DOM
            .resize(window)
            .throttle(200)
            .subscribe(() => {
                this.onWindowResize();
            });

        this.onWindowResize();
    }

    passDataToNextRoute(data) {
        this.dataForNextRoute = data;
    }

    getDataPassingToNextRoute() {
        return this.dataForNextRoute;
    }

    getDataPassedFromPreviousRoute() {
        var clone = this.getDataPassingToNextRoute() ? Object.assign(this.getDataPassingToNextRoute()) : null;
        this.dataForNextRoute = null;

        return clone;
    }

    /**
     * Format:
     * {
     *     name: 'content'
     *     name: {
     *         attr1 : 'value1',
     *         attr2 : 'value2'
     *     }
     * }
     */
    setMetaData(attrs) {
        for (var name in attrs) {
            if (!(name in this.$metas)) {
                this.$metas[name] = this.$head.find('meta[name=' + name + ']');

                if (!this.$metas[name].length) {
                    this.$metas[name] = $('<meta name="' + name + '" />');

                    this.$head.append(this.$metas[name]);
                }
            }

            if (typeof attrs[name] === 'string') {
                this.$metas[name].attr('content', attrs[name]);
            } else {
                for (var attr in attrs[name]) {
                    this.$metas[name].attr(attr, attrs[name][attr]);
                }
            }
        }
    }

    private onWindowResize() {
        var width = this.$win.width();

        if (width <= 480) {
            this.deviceType.value = 'mobile';
        } else if (width <= 768) {
            this.deviceType.value = 'xs';
        } else if (width <= 992) {
            this.deviceType.value = 'sm';
        } else if (width <= 1200) {
            this.deviceType.value = 'md';
        } else if (width <= 1440) {
            this.deviceType.value = 'lg';
        } else {
            this.deviceType.value = 'exlg';
        }

        this.deviceHeight.value = this.$win.height();

        this.evtDispatcher.emit('WINDOW_RESIZED');
    }

    // Never use this static attribute to do anything normal user must not see.
    // All code compile and send to users, it is simple to exploit the application.
    static get APP_ENV() {
        return Status.appEnv;
    }

    get DEVICE_TYPE() {
        return this.deviceType;
    }

    get WIN_HEIGHT() {
        return this.deviceHeight;
    }
}
