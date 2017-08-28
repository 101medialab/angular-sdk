export * from './decorators/FormConfig';
export * from './decorators/MultiOptions';
export * from './decorators/HTMLSetting';

import { FormConfigSymbol } from './decorators/FormConfig';
import { MultiOptionsSymbol } from './decorators/MultiOptions';
import { HTMLSettingSymbol } from "./decorators/HTMLSetting";
import { OnOATResolved } from "../ObjectAttributeTypeExtractor";

export function SetupConfig() {
    return OnOATResolved((target, key, resolved) => {
        if (!resolved.formFactory) {
            resolved.formFactory = {};
        }

        [
            FormConfigSymbol,
            MultiOptionsSymbol,
            HTMLSettingSymbol
        ].forEach((eachSymbol) => {
            if (Reflect.hasMetadata(eachSymbol, target, key)) {
                resolved.formFactory = Object.assign({},
                    resolved.formFactory,
                    Reflect.getMetadata(eachSymbol, target, key)
                );
            }
        });
    });
}