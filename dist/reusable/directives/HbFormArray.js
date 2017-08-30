var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component } from "@angular/core";
import { HbFormWidget } from './HbFormWidget';
var HbFormArray = (function (_super) {
    __extends(HbFormArray, _super);
    function HbFormArray() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HbFormArray.decorators = [
        { type: Component, args: [{
                    selector: 'hb-form-array',
                    template: "\n        <div [attr.id]=\"data.id\" class=\"form-array {{ data.arrayType }} {{ data.class }}\">\n            <header>\n                <h2>{{ data.label }}</h2>\n                \n                <select *ngIf=\"data.childrenConfigName.length > 0\" class=\"hb-form-array-config-switch\"\n                        [(ngModel)]=\"data.useConfig\" [ngModelOptions]=\"{standalone: true}\">\n                    <option *ngFor=\"let configName of data.childrenConfigName; let i = index\" [value]=\"i\">\n                        {{ configName }}\n                    </option>\n                </select>\n\n                <button class=\"btn btn-default hb-form-add-btn\" *ngIf=\"data.arrayType != 'enum'\" type=\"button\" (click)=\"data.add()\">Add</button>\n            </header>\n\n            <div [attr.id]=\"data.id + '-' + i\" class=\"panel panel-default hb-form-array-cell\"\n                 *ngFor=\"let cell of (data.arrayType != 'enum' ? data.children : data.optionsTemplate); let i=index\">\n                <hb-form-widget *ngIf=\"data.arrayType == 'enum' && cell.groupType == undefined\"\n                                [data]=\"cell\" [key]=\"i\" [parent]=\"data\"></hb-form-widget>\n                \n                <div *ngIf=\"data.arrayType != 'enum'\">\n                    <div *ngFor=\"let each of cell | mapToIterable;\" class=\"panel panel-default\">\n                        <hb-form-widget *ngIf=\"each.val.groupType == undefined\"\n                                        [data]=\"each.val\" [key]=\"i\" [parent]=\"data\"></hb-form-widget>\n                        <hb-form-array *ngIf=\"each.val?.groupType == 'array'\"\n                                       [data]=\"each.val\" [key]=\"each.key\" [parent]=\"data\"></hb-form-array>\n                        <hb-form-object *ngIf=\"each.val?.groupType == 'object'\"\n                                        [data]=\"each.val\" [key]=\"each.key\" [parent]=\"data\"></hb-form-object>\n                    </div>\n                </div>\n                \n                <button class=\"btn btn-default hb-form-add-btn\"\n                    type=\"button\" \n                    *ngIf=\"data.arrayType != 'enum'\" \n                    (click)=\"data.remove(i)\">\n                    Remove\n                </button>\n            </div>\n\n            <div class=\"hints\" *ngIf=\"data?.hints\">\n                {{ data.hints }}\n            </div>\n        </div>\n    ",
                    inputs: ['key', 'data', 'parent']
                },] },
    ];
    /** @nocollapse */
    HbFormArray.ctorParameters = function () { return []; };
    return HbFormArray;
}(HbFormWidget));
export { HbFormArray };
//# sourceMappingURL=HbFormArray.js.map