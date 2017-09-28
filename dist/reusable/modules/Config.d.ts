import { Config as BaseConfig } from '../Config';
import { NavItem } from '../../HbComponent/NavItem';
export declare class Config extends BaseConfig {
    route: {
        base: string;
        main: string;
    };
    private routeTypes;
    readonly ROUTE_TYPE_MAIN: string;
    readonly ROUTE_TYPE_CREATE: string;
    readonly ROUTE_TYPE_LIST: string;
    readonly ROUTE_TYPE_VIEW: string;
    readonly ROUTE_TYPE_UPDATE: string;
    constructor(resourceName: string, pluralResourceName: string, ResourceClass: any);
    private generateRouteNames();
    getDomainTemplateUrl(url: any): string;
    getBaseDomainBreadcrumb(): NavItem[];
    generateHTMLTitle(name?: string): string;
}
