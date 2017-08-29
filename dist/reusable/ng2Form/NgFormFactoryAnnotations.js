export * from './decorators/FormConfig';
export * from './decorators/MultiOptions';
export * from './decorators/HTMLSetting';
export * from './decorators/FlexibleObjectArray';
import { FormConfigSymbol } from './decorators/FormConfig';
import { MultiOptionsSymbol } from './decorators/MultiOptions';
import { HTMLSettingSymbol } from "./decorators/HTMLSetting";
import { FlexibleObjectArraySymbol } from "./decorators/FlexibleObjectArray";
import { OnOATResolved } from "../ObjectAttributeTypeExtractor";
export function SetupConfig() {
    return OnOATResolved(function (target, key, resolved) {
        if (!resolved.formFactory) {
            resolved.formFactory = {};
        }
        [
            FormConfigSymbol,
            MultiOptionsSymbol,
            HTMLSettingSymbol,
            FlexibleObjectArraySymbol
        ].forEach(function (eachSymbol) {
            if (Reflect.hasMetadata(eachSymbol, target, key)) {
                resolved.formFactory = Object.assign({}, resolved.formFactory, Reflect.getMetadata(eachSymbol, target, key));
            }
        });
    });
}
//# sourceMappingURL=NgFormFactoryAnnotations.js.map