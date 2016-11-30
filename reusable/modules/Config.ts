import {Injectable, Inject} from '@angular/core';
import {Config as BaseConfig} from '../../reusable/Config';
import {NavItem} from "../../Entity/NavItem";
import {Profile} from "../../Entity/Resource/Profile";

@Injectable()
export class Config extends BaseConfig {
    public route = {};
    private routeTypes: Array = [
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
        resourceName: string = '',
        pluralResourceName: string = '',
        ResourceClass
    ) {
        super({
            resourceName,
            pluralResourceName,
            ResourceClass,
            apiBaseUrl: '/api'
        });

        this.generateRouteNames();
    }

    private generateRouteNames() {
        this.route.base = '/' + this.getPluralResourceName();

        //var name = this.getPluralResourceName(true);
        //
        //this.routeTypes.forEach((routeType) => {
        //    this.route[routeType] = name + routeType.capitalize();
        //});
    }

    public static getProfileTemplateUrl(ProfileName) {
        return Config.getTemplateUrl('profile/' + ProfileName);
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

    public getProfileBreadcrumbStack(profile: Profile, routeType = '') {
        var base = this.getBaseDomainBreadcrumb();

        base.push(
            new NavItem(profile.name, this.route.view, {
                slug: profile.slug
            })
        );

        if ([this.ROUTE_TYPE_CREATE, this.ROUTE_TYPE_UPDATE].indexOf(routeType) > -1) {
            base.push(
                new NavItem(routeType.capitalize(), this.route[routeType],
                    this.ROUTE_TYPE_UPDATE ? {
                        slug: profile.slug
                    } : null
                )
            );
        }

        return base;
    }

    public generateHTMLTitle(name: string = null) {
        return (
                name ? name + ' | ' : ''
            ) + this.getPluralResourceName(true) + ' | HypeDB'
    }
}