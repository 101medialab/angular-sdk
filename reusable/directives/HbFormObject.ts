import {Component} from "@angular/core";
import BaseClass from '../BaseClass';

import template from './templates/hb-form-object.tpl.html!text';

@Component({
    selector: 'hb-form-object',
    template,
    inputs: ['id', 'key', 'data']
})
export default class HbFormObject extends BaseClass {
    private id;
    private key;
    private data;
}