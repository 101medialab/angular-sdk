import {ActivatedRoute} from '@angular/router';
import IdvComponent from './idv.cpn';
import DummyDIContainer from './DummyDIContainer';

export default class SluggedIdvComponent extends IdvComponent {
    constructor(
        diContainer: DummyDIContainer,
        activatedRoute: ActivatedRoute
    ) {
        super(diContainer, activatedRoute);
    }

    onInit() {
        this.titleService.setTitle(this.domainConfig.generateHTMLTitle('Loading...'));

        this.status.resource.isCancelIfLoading = false;

        let isForceReload = this.routeType !== this.domainConfig.ROUTE_TYPE_VIEW;

        try {
            if (this.activatedRoute.parent.url.value[0].path !== 'collections') {
                this.emit('HB.loading_screen.theme.WHITE');
            }
        } catch (e) {}

        this.activatedRoute.params.subscribe(({slug, from, index}) => {
            if (from) {
                this.ngGA.eventTrack('Visit ' + this.domainConfig.getResourceName(true), {
                    category: 'From Homepage',
                    label:
                        from === 'trending' ?
                        'Trending - Position ' + index :
                            from === 'featured' ?
                            'Featured ' + this.domainConfig.getResourceName(true) :
                            'Up & Coming'
                });
            }

            if (typeof slug !== 'undefined') {
                this.status.resource.get(
                    '/' + this.resolveBaseUrl(slug), [], isForceReload
                ).then((data) => {
                    this.data = this.setupData(
                        Object.assign({}, data)
                    );

                    this.status.resource.isCancelIfLoading = true;

                    this.state.isInitialized = true;

                    this.onInitialized();
                }, (error) => {
                    this.onResourceNotFound(error);
                });
            }

            super.onInit();
        });
    }

    resolveBaseUrl(slug) {
        return slug;
    }

    onResourceNotFound(error) {
        this.router.navigateByUrl('/404', {skipLocationChange: true});
    }

    getMetaData() {
        return {
            title: this.domainConfig.generateHTMLTitle(this.data.name),
            description: this.data.description
        }
    }
}
