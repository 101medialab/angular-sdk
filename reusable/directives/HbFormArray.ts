import {Component} from "@angular/core";
import {HbFormWidget} from './HbFormWidget';

@Component({
    selector: 'hb-form-array',
    templateUrl: './templates/hb-form-array.tpl.html',
    inputs: ['id', 'key', 'data', 'parent']
})
export class HbFormArray extends HbFormWidget {}
