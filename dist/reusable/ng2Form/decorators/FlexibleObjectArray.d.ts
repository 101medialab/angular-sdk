import { IBaseFormConfig } from "./FormConfig";
export interface IFlexibleObjectArrayFormConfig extends IBaseFormConfig {
    objectDefinitions: Array<{
        label: string;
        structure: any;
    }>;
}
export declare const FlexibleObjectArraySymbol: symbol;
export declare function FlexibleObjectArray(options: IFlexibleObjectArrayFormConfig): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
