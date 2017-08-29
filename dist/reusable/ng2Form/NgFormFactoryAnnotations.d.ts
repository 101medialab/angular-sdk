export * from './decorators/FormConfig';
export * from './decorators/MultiOptions';
export * from './decorators/HTMLSetting';
export * from './decorators/FlexibleObjectArray';
export declare function SetupConfig(): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
