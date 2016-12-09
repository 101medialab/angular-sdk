import {Component} from "@angular/core";
@Component({
    selector: 'hb-form-widget',
    template: `
        <div *ngIf="data.control != undefined && data.groupType == undefined">
            <label for="{{ key ? key : data.label.slugify() }}-input">{{ data.label }}</label>
        
            <input id="{{ key ? key : data.label.slugify() }}-input" type="text" placeholder="{{ data.label }}" [formControl]="data.control">
        
            <div *ngIf="!data.control.valid" class="ui error message">
                {{ data.label }} is invalid
            </div>
        
            <div *ngIf="data.control.hasError('required')" class="ui error message">
                {{ data.label }} is required
            </div>
        </div>
    `, 
    inputs: ['data', 'key']
})
export default class HbFormWidget {
    private data;
    private key;
}