import {Component} from "@angular/core";
import {HbFormWidget} from './HbFormWidget';

@Component({
    selector: 'hb-form-object',
    template: `
        <div *ngIf="data.control != undefined && key != 'setValue'" 
             [formGroup]="data.control" 
             class="form-object {{ key }}"
        >
            <h2>{{ data.label }}</h2>
        
            <div class="form-object-content">
                <div *ngFor="let each of data.children | mapToIterable" class="{{ each.key }}">
                    <hb-form-widget class="expand-to-child"
                        *ngIf="each.val.groupType == undefined && each.key != 'setValue'"
                        [data]="each.val" [key]="each.key" [parent]="data"
                    ></hb-form-widget>
                    <hb-form-array  class="expand-to-child"
                        *ngIf="each.val?.groupType == 'array'"
                        [data]="each.val" [key]="each.key" [formArrayName]="each.key" [parent]="data"
                    ></hb-form-array>
                    <hb-form-object class="expand-to-child"
                        *ngIf="each.val?.groupType == 'object' && each.key != 'setValue'"
                        [data]="each.val" [key]="each.key" [parent]="data"
                    ></hb-form-object>
                </div>
        
                <span class="hints" *ngIf="data?.hints">
                    {{ data.hints }}
                </span>
            </div>
        </div>
    `,
    inputs: ['id', 'key', 'data', 'parent']
})
export class HbFormObject extends HbFormWidget {}