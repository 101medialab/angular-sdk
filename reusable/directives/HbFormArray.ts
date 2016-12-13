import {Component} from "@angular/core";

@Component({
    selector: 'hb-form-array',
    template: `
        <div  class="form-array" style="display: inline-block; width: 100%; border: 5px solid green;">
        
        <h2>Array: {{ key }}</h2>
            <div *ngFor="let cell of data.children; let i=index" class="panel panel-default">
                <div *ngFor="let each of cell | mapToIterable;" class="panel panel-default">
                    <hb-form-widget *ngIf="each.val.groupType == undefined" [data]="each.val" [key]="i"></hb-form-widget>
                    <hb-form-array *ngIf="each.val?.groupType == 'array'" [data]="each.val" [key]="each.key"></hb-form-array>
                    <hb-form-object *ngIf="each.val?.groupType == 'object'" [data]="each.val" [key]="each.key"></hb-form-object>
                </div>
            </div>
        </div>
    `,
    inputs: ['data', 'key']
})
export default class HbFormArray {
    private data;
    private key;

    log() {
        console.log(arguments);
    }
}