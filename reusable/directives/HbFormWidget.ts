import {Component} from "@angular/core";
import BaseClass from '../BaseClass';

import template from './templates/hb-form-widget.tpl.html!text';

@Component({
    selector: 'hb-form-widget',
    template,
    inputs: ['id', 'data', 'key', 'parent']
})
export default class HbFormWidget extends BaseClass {
    protected id;
    protected key;
    protected data;
    protected parent;

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