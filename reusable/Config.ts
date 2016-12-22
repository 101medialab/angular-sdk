import {Inject} from "@angular/core";

export interface IConfigObject {
    resourceName?: string;
    pluralResourceName?: string;
    ResourceClass?: any;
    apiBaseUrl?: string;
    authHttpConfig?: any;
}

export class Config {
    private _API_DOMAIN_URL: string = '';
    public route;
    public resourceName: string = '';
    public pluralResourceName: string = '';
    public ResourceClass = null;

    constructor(@Inject({})
        {
            resourceName,
            pluralResourceName,
            ResourceClass
        }: IConfigObject) {
        this.resourceName = resourceName;
        this.pluralResourceName = pluralResourceName;
        this.ResourceClass = ResourceClass;

        if (resourceName != '' && pluralResourceName === '') {
            this.pluralResourceName = resourceName + 's';
        }

        this._API_DOMAIN_URL = (resourceName && resourceName != '' ? this.pluralResourceName : '');
    }

    public static get baseTemplateUrl(): string {
        return '/bundles/hypebeastwiki/scripts/templates/';
    }

    public static get templateSuffix(): string {
        return '.tpl.html';
    }

    public get API_DOMAIN_URL() {
        return this._API_DOMAIN_URL;
    }

    public static getTemplateUrl(url, free: boolean = false) {
        return Config.baseTemplateUrl + url + (free ? '' : Config.templateSuffix) + '?' + window._hypebeast.version;
    }

    public getResourceName(isCapitalize: boolean = false) {
        return isCapitalize ?
            this.resourceName.capitalize() :
            this.resourceName;
    }

    public getPluralResourceName(isCapitalize: boolean = false) {
        return isCapitalize ?
            this.pluralResourceName.capitalize() :
            this.pluralResourceName;
    }
}