import {Component} from "@angular/core";
import BaseClass from '../BaseClass';

import template from './templates/hb-form-widget.tpl.html!text';

@Component({
    selector: 'hb-form-widget',
    template,
    inputs: ['id', 'data', 'key']
})
export default class HbFormWidget extends BaseClass {
    protected id;
    protected key;
    protected data;

    toBoolean(val) {
        console.log(val === 'true');
        return val === 'true'
    }
}