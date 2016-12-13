import {Component} from "@angular/core";

@Component({
    selector: 'hb-form-object',
    template: `
        <div *ngIf="data.control != undefined" [formGroup]="data.control" class="form-object key" style="display: inline-block; width: 100%; border: 5px solid red;">
            <h2>Object: {{ key }}</h2>
        
            <div *ngFor="let each of data.children | mapToIterable" class="panel panel-default">
                <hb-form-widget *ngIf="each.groupType == undefined" [data]="each.val" [key]="each.key"></hb-form-widget>
                <hb-form-array *ngIf="each?.groupType == 'array'" [data]="each.val" [key]="each.key" [formArrayName]="each.key"></hb-form-array>
                <hb-form-object *ngIf="each?.groupType == 'object'" [data]="each.val" [key]="each.key"></hb-form-object>
            </div>
        </div>
    `, 
    inputs: ['data', 'key']
})
export default class HbFormObject {
    private data;
    private key;

    log(){
        console.log(arguments);
    }
}