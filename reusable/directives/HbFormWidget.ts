import {Component} from "@angular/core";
import {BaseClass} from '../BaseClass';

@Component({
    selector: 'hb-form-widget',
    template: `
        <div *ngIf="data.control != undefined && data.groupType == undefined && key != 'setValue'"
             [ngClass]="{ 'error': !data.control.valid }" class="expand-to-child hb-form-widget">
            <div *ngIf="data.expandOptions == undefined">
                <label for="{{ key ? key : data.label.slugify() }}-input">{{ data.renderType !== 'checkbox' ? data.label : data.option.name }}</label>
        
                <div class="input-control-container">
                    <input id="{{ key ? key : data.label.slugify() }}-input"
                           *ngIf="!data.renderType || ['select', 'textarea'].indexOf(data.renderType) === -1"
                           [type]="data.renderType ? data.renderType : 'text'"
                           [attr.checked]="
                               parent?.arrayType === 'enum' && parent.control.value.indexOf(data.option.value) > -1 ? true : null
                           "
                           (change)="
                               parent?.arrayType === 'enum' ?
                                   updateParentValue($event, data.option) :
                                   data.control.patchValue(
                                       data.renderType === 'checkbox' ? $event.target.checked : $event.target.value
                                   );
                           "
                           placeholder="{{ data.label }}" [formControl]="data.control"/>
        
                    <textarea *ngIf="data.renderType === 'textarea'" [formControl]="data.control"
                              id="{{ key ? key : data.label.slugify() }}-input" rows="5"></textarea>
        
                    <span class="hints" *ngIf="data?.hints">
                        {{ data.hints }}
                    </span>
                </div>
            </div>
        
            <div *ngIf="data.renderType && data.expandOptions != undefined" class="options-group">
                <div *ngIf="data.renderType != 'select'">
                    <div *ngFor="let option of data.options">
                        <label for="{{ key ? key : data.label.slugify() }}-input">{{ option.name }}</label>
                        <input [type]="data.renderType" [value]="option.value"
                               [attr.checked]="data.control.value === option.value || option.id === data.control.value ? true : null"
                               [attr.name]="data.renderType == 'radio' ? (key ? key : data.label.slugify()) + '-input' : null"
                               (change)="updateParentValue($event, option)"
                               [formControl]="data.control"
                        />
                    </div>
                </div>
        
                <select *ngIf="data.renderType == 'select'" id=""
                        [attr.multiple]="data.expandOptions ? true : null"
                        [formControl]="data.control">
                    <option *ngFor="let option of data.options" [value]="option.value">
                        {{ option.name ? option.name : option.value }}
                    </option>
                </select>
            </div>
        </div>
    `,
    inputs: ['data', 'key', 'parent']
})
export class HbFormWidget extends BaseClass {
    public key;
    public data;
    public parent;

    toBoolean(val) {
        return val === 'true'
    }

    updateParentValue($event, option) {
        let isChecked = $event.target.checked;

        switch (this.data.renderType) {
            case 'checkbox':
                let parentCtrls = this.parent.control.controls;

                if (isChecked) {
                    this.parent.add();

                    parentCtrls[parentCtrls.length - 1].setValue(option.value);
                } else {
                    for (var i = 0; i < parentCtrls.length; i++) {
                        if (parentCtrls[i].value == option.value) break;
                    }

                    this.parent.remove(i);
                }

                break;

            case 'radio':
                if (isChecked) this.data.control.patchValue($event.target.value);

                break;
        }
    }
}