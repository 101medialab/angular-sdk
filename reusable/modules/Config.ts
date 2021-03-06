import {Inject, Injectable} from '@angular/core';
import {Config as BaseConfig} from '../Config';
import {NavItem} from '../../HbComponent/NavItem';

@Injectable()
export class Config extends BaseConfig {
    public route: {
        base: string,
        main: string
    } = {base: '', main: ''};
    private routeTypes: Array<string> = [
        this.ROUTE_TYPE_MAIN,
        this.ROUTE_TYPE_CREATE,
        this.ROUTE_TYPE_LIST,
        this.ROUTE_TYPE_VIEW,
        this.ROUTE_TYPE_UPDATE
    ];

    public get ROUTE_TYPE_MAIN(): string {
        return 'main';
    }

    public get ROUTE_TYPE_CREATE(): string {
        return 'create';
    }

    public get ROUTE_TYPE_LIST(): string {
        return 'list';
    }

    public get ROUTE_TYPE_VIEW(): string {
        return 'view';
    }

    public get ROUTE_TYPE_UPDATE(): string {
        return 'update';
    }

    constructor(
        @Inject('') resourceName: string = '',
        @Inject('') pluralResourceName: string = '',
        @Inject({}) ResourceClass: any,
    ) {
        super({
            resourceName,
            pluralResourceName,
            ResourceClass
        });

        this.generateRouteNames();
    }

    private generateRouteNames() {
        this.route.base = '/' + this.getPluralResourceName();

        //let name = this.getPluralResourceName(true);
        //
        //this.routeTypes.forEach((routeType) => {
        //    this.route[routeType] = name + routeType.capitalize();
        //});
    }

    public getDomainTemplateUrl(url) {
        return Config.getTemplateUrl('/' + this.getPluralResourceName() + '/' + url);
    }

    public getBaseDomainBreadcrumb() {
        return [
            new NavItem('Home', 'Home'),
            new NavItem(this.getPluralResourceName(true), this.route.main),
        ]
    }

    public generateHTMLTitle(name: string = null) {
        return (
                name ? name + ' | ' : ''
            ) + this.getPluralResourceName(true) + ' | HypeDB'
    }
}