
import { IBaseFormConfig } from "./FormConfig";

export interface IFlexibleObjectArrayFormConfig extends IBaseFormConfig {
    objectDefinitions: Array<{
        label: string,
        structure: any // The class with decorator or data object
    }>
}

export const FlexibleObjectArraySymbol = Symbol('IFlexibleObjectArrayFormConfig');

export function FlexibleObjectArray(options: IFlexibleObjectArrayFormConfig) {
    return Reflect.metadata(
        FlexibleObjectArraySymbol,
        Object.assign(
            {}, options, {
                arrayType: 'object',
            }
        )
    );
}