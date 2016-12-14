import {Component} from "@angular/core";
import BaseClass from '../BaseClass';

import template from './templates/hb-form-array.tpl.html!text';

@Component({
    selector: 'hb-form-array',
    template,
    inputs: ['id', 'key', 'data']
})
export default class HbFormArray extends BaseClass {
    private id;
    private key;
    private data;
}