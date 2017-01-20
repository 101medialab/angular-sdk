export class Config {
    private _API_BASE_URL: string = '';
    private _API_DOMAIN_URL: string = '';
    public route;
    public resourceName: string = '';
    public pluralResourceName: string = '';
    public ResourceClass = null;

    constructor({
        resourceName,
        pluralResourceName,
        ResourceClass,
        apiBaseUrl
    }) {
        this.resourceName = resourceName;
        this.pluralResourceName = pluralResourceName;
        this.ResourceClass = ResourceClass;
        this._API_BASE_URL = apiBaseUrl;

        if (resourceName != '' && pluralResourceName === '') {
            this.pluralResourceName = resourceName + 's';
        }

        this._API_DOMAIN_URL = this.API_BASE_URL + (resourceName && resourceName != '' ? '/' + this.pluralResourceName : '');
    }

    public static get baseTemplateUrl(): string {
        return '/bundles/hypebeastwiki/scripts/templates/';
    }

    public static get templateSuffix(): string {
        return '.tpl.html';
    }

    public get API_BASE_URL() {
        return this._API_BASE_URL;
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