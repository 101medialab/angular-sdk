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
import { BaseClass } from '../BaseClass';
var HbFormWidget = (function (_super) {
    __extends(HbFormWidget, _super);
    function HbFormWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HbFormWidget.prototype.toBoolean = function (val) {
        return val === 'true';
    };
    HbFormWidget.prototype.updateParentValue = function ($event, option) {
        var isChecked = $event.target.checked;
        switch (this.data.renderType) {
            case 'checkbox':
                var parentCtrls = this.parent.control.controls;
                if (isChecked) {
                    this.parent.add();
                    parentCtrls[parentCtrls.length - 1].setValue(option.value);
                }
                else {
                    for (var i = 0; i < parentCtrls.length; i++) {
                        if (parentCtrls[i].value == option.value)
                            break;
                    }
                    this.parent.remove(i);
                }
                break;
            case 'radio':
                if (isChecked)
                    this.data.control.patchValue($event.target.value);
                break;
        }
    };
    HbFormWidget.decorators = [
        { type: Component, args: [{
                    selector: 'hb-form-widget',
                    template: "\n        <div *ngIf=\"data.control != undefined && data.groupType == undefined && key != 'setValue'\"\n             [ngClass]=\"{ 'error': !data.control.valid }\" class=\"expand-to-child\">\n            <div *ngIf=\"data.expandOptions == undefined\">\n                <label for=\"{{ key ? key : data.label.slugify() }}-input\">{{ data.renderType !== 'checkbox' ? data.label : data.option.name }}</label>\n        \n                <div class=\"input-control-container\">\n                    <input id=\"{{ key ? key : data.label.slugify() }}-input\"\n                           *ngIf=\"!data.renderType || ['select', 'textarea'].indexOf(data.renderType) === -1\"\n                           [type]=\"data.renderType ? data.renderType : 'text'\"\n                           [attr.checked]=\"\n                               parent?.arrayType === 'enum' && parent.control.value.indexOf(data.option.value) > -1 ? true : null\n                           \"\n                           (change)=\"\n                               parent?.arrayType === 'enum' ?\n                                   updateParentValue($event, data.option) :\n                                   data.control.patchValue(\n                                       data.renderType === 'checkbox' ? $event.target.checked : $event.target.value\n                                   );\n                           \"\n                           placeholder=\"{{ data.label }}\" [formControl]=\"data.control\"/>\n        \n                    <textarea *ngIf=\"data.renderType === 'textarea'\" [formControl]=\"data.control\"\n                              id=\"{{ key ? key : data.label.slugify() }}-input\" rows=\"5\"></textarea>\n        \n                    <span class=\"hints\" *ngIf=\"data?.hints\">\n                        {{ data.hints }}\n                    </span>\n                </div>\n            </div>\n        \n            <div *ngIf=\"data.renderType && data.expandOptions != undefined\" class=\"options-group\">\n                <div *ngIf=\"data.renderType != 'select'\">\n                    <div *ngFor=\"let option of data.options\">\n                        <label for=\"{{ key ? key : data.label.slugify() }}-input\">{{ option.name }}</label>\n                        <input [type]=\"data.renderType\" [value]=\"option.value\"\n                               [attr.checked]=\"data.control.value === option.value || option.id === data.control.value ? true : null\"\n                               [attr.name]=\"data.renderType == 'radio' ? (key ? key : data.label.slugify()) + '-input' : null\"\n                               (change)=\"updateParentValue($event, option)\"\n                               [formControl]=\"data.control\"\n                        />\n                    </div>\n                </div>\n        \n                <select *ngIf=\"data.renderType == 'select'\" id=\"\"\n                        [attr.multiple]=\"data.expandOptions ? true : null\"\n                        [formControl]=\"data.control\">\n                    <option *ngFor=\"let option of data.options\" [value]=\"option.value\">\n                        {{ option.name ? option.name : option.value }}\n                    </option>\n                </select>\n            </div>\n        </div>\n    ",
                    inputs: ['id', 'data', 'key', 'parent']
                },] },
    ];
    /** @nocollapse */
    HbFormWidget.ctorParameters = function () { return []; };
    return HbFormWidget;
}(BaseClass));
export { HbFormWidget };
//# sourceMappingURL=HbFormWidget.js.map