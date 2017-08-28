export interface IHTMLSetting {
    id?: string;
    class?: any;
    disable?: string;
}

export const HTMLSettingSymbol = Symbol('HTMLSetting');

export function HTMLSetting(options: IHTMLSetting) {
    return Reflect.metadata(HTMLSettingSymbol, options);
}
