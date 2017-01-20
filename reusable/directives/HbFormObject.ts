import {Component} from "@angular/core";
import HbFormWidget from './HbFormWidget';

@Component({
    selector: 'hb-form-object',
    templateUrl: './templates/hb-form-object.tpl.html',
    inputs: ['id', 'key', 'data', 'parent']
})
export default class HbFormObject extends HbFormWidget {}