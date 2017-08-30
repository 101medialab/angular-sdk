import {Component} from "@angular/core";
import {HbFormWidget} from './HbFormWidget';

@Component({
    selector: 'hb-form-array',
    template: `
        <div [attr.id]="data.id" class="form-array {{ data.arrayType }} {{ data.class }}">
            <header>
                <h2>{{ data.label }}</h2>
                
                <select *ngIf="data.childrenConfigName.length > 0" class="hb-form-array-config-switch"
                        [(ngModel)]="data.useConfig" [ngModelOptions]="{standalone: true}">
                    <option *ngFor="let configName of data.childrenConfigName; let i = index" [value]="i">
                        {{ configName }}
                    </option>
                </select>

                <button class="btn btn-default hb-form-add-btn" *ngIf="data.arrayType != 'enum'" type="button" (click)="data.add()">Add</button>
            </header>

            <div [attr.id]="data.id + '-' + i" class="panel panel-default hb-form-array-cell"
                 *ngFor="let cell of (data.arrayType != 'enum' ? data.children : data.optionsTemplate); let i=index">
                <hb-form-widget *ngIf="data.arrayType == 'enum' && cell.groupType == undefined"
                                [data]="cell" [key]="i" [parent]="data"></hb-form-widget>
                
                <div *ngIf="data.arrayType != 'enum'">
                    <div *ngFor="let each of cell | mapToIterable;" class="panel panel-default">
                        <hb-form-widget *ngIf="each.val.groupType == undefined"
                                        [data]="each.val" [key]="i" [parent]="data"></hb-form-widget>
                        <hb-form-array *ngIf="each.val?.groupType == 'array'"
                                       [data]="each.val" [key]="each.key" [parent]="data"></hb-form-array>
                        <hb-form-object *ngIf="each.val?.groupType == 'object'"
                                        [data]="each.val" [key]="each.key" [parent]="data"></hb-form-object>
                    </div>
                </div>
                
                <button class="btn btn-default hb-form-add-btn"
                    type="button" 
                    *ngIf="data.arrayType != 'enum'" 
                    (click)="data.remove(i)">
                    Remove
                </button>
            </div>

            <div class="hints" *ngIf="data?.hints">
                {{ data.hints }}
            </div>
        </div>
    `,
    inputs: ['key', 'data', 'parent']
})
export class HbFormArray extends HbFormWidget {}
