export interface IHTMLSetting {
    id?: string;
    class?: any;
    disable?: string;
}
export declare const HTMLSettingSymbol: symbol;
export declare function HTMLSetting(options: IHTMLSetting): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
