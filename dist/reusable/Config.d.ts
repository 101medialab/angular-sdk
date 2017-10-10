export interface IConfigObject {
    resourceName?: string;
    pluralResourceName?: string;
    ResourceClass?: any;
    apiBaseUrl?: string;
    authHttpConfig?: any;
}
export declare class Config {
    private _API_DOMAIN_URL;
    route: any;
    resourceName: string;
    pluralResourceName: string;
    ResourceClass: any;
    constructor({resourceName, pluralResourceName, ResourceClass}: IConfigObject);
    static readonly baseTemplateUrl: string;
    static readonly templateSuffix: string;
    readonly API_DOMAIN_URL: string;
    static getTemplateUrl(url: any, free?: boolean): string;
    getResourceName(isCapitalize?: boolean): string;
    getPluralResourceName(isCapitalize?: boolean): string;
}
