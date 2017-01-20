import {ActivatedRoute} from '@angular/router';
import URI from 'urijs';

import {BaseResourceComponent} from '../../HbComponent/BaseResourceComponent';
import {DummyDIContainer} from './DummyDIContainer';
import {Debounce} from '../Debounce';
import {NavItem} from '../../HbComponent/NavItem';

export class MainComponent extends BaseResourceComponent {
    protected data;
    protected currentCriteria;
    protected defaultCriteria;
    protected nPerRow = 0;
    private criteriaChangeEventDebounce;

    constructor(
        protected criteriaNames = [],
        diContainer: DummyDIContainer,
        activatedRoute: ActivatedRoute
    ) {
        super(diContainer, activatedRoute);

        this.routeType = diContainer.config.ROUTE_TYPE_MAIN;

        this.criteriaChangeEventDebounce = {};
        this.criteriaNames.forEach((key) => {
            this.criteriaChangeEventDebounce[key] = new Debounce();
        });

        this.state.isUsingDefaultCriteria = true;
        this.state.allLoaded = false;
        this.state.isLoadingMore = false;

        this.currentCriteria = $.extend({}, this.defaultCriteria);
    }

    getMetaData() {
        return {
            title: this.domainConfig.generateHTMLTitle(),
            description: 'Talents who shape and inspire our culture'
        }
    }

    onInit() {
        this.currentCriteria = $.extend(this.currentCriteria, this.resolveCriteriaFromRouteParams());

        this.listen('HB.list_view.LOAD_ANOTHER_PAGE', [()=> {
            if (this.currentCriteria.page > 4) {
                this.emit('HB.list_view.LOADED_THREE_TIMES');

                return;
            }

            this.loadMore();
        }]);

        this.emit('HB.resource.LOAD_BEGIN');

        this.updateNPerRow();
    }

    updateNPerRow() {
        let isBrand = this.domainConfig.getResourceName() == 'brand';
        switch (this.mainStatus.DEVICE_TYPE.value) {
            case 'mobile':
            case 'xs':
                this.nPerRow = 12;
                break;

            case 'sm':
                this.nPerRow = isBrand ? 4 : 2;
                break;

            case 'md':
                this.nPerRow = isBrand ? 6 : 3;
                break;

            case 'lg':
                this.nPerRow = isBrand ? 7 : 4;
                break;

            case 'exlg':
                this.nPerRow = isBrand ? 7 : 4;
                break;
        }
    }

    loadMore() {
        if (this.state.isLoadingMore) {
            return;
        }

        this.state.isLoadingMore = true;
        this.currentCriteria.page++;

        this.onCriteriaChanged(true);
    }

    resolveCriteriaFromRouteParams() {
        let fromUrl = {};
        this.criteriaNames.forEach((key) => {
            let value = key in this.activatedRoute.snapshot.params ? this.activatedRoute.snapshot.params[key] : null;

            if (value) {
                fromUrl[key] = decodeURIComponent(value);
            }
        });

        return fromUrl;
    }

    resetCriteria() {
        this.currentCriteria = Object.assign({}, this.defaultCriteria);

        this.onCriteriaChanged();
    }

    resolveRequestingNoOfResult(netCriteria, includePage) {
        this.state.isUsingDefaultCriteria = Object.keys(netCriteria).length === 0;

        let result = {
            num: (this.nPerRow * 6) - (
                this.state.isUsingDefaultCriteria &&
                this.currentCriteria.page === 1 ? 4 : 0
            ),
            offset: this.data ? this.data.length : 0
        };

        if (!includePage) {
            delete result.offset;
        }

        return result;
    }

    onCriteriaChanged(includePage = false) {
        let netCriteria = this.getNetCriteria(),
            query = Object.assign({}, netCriteria),
            {num, offset} = this.resolveRequestingNoOfResult(includePage, netCriteria);

        this.state.isUsingDefaultCriteria = Object.keys(netCriteria).length === 0;

        this.sendRequest(query, num, offset, includePage);
    }

    sendRequest(query, num, offset, includePage) {
        let endpoint = new URI('/');

        for (let key in query) {
            let name = key;

            if (key !== 'sortedBy') {
                name = 'criteria[' + key + ']';
            }

            endpoint.addQuery(name, query[key]);
        }

        endpoint.addQuery('num', num);
        endpoint.addQuery('offset', includePage ? offset : 0);

        this.status.resource.get(endpoint.build().toString(), [], false, includePage).then((data) => {
            this.onRequestDone(data, includePage, num);

            this.onInitialized();
        });
    }

    onRequestDone(data, includePage, num) {
        let data = this.setupData(data);

        this.data = includePage ? this.data.concat(data) : data;
        this.state.isInitialized = true;
        this.state.allLoaded = data.length < num;
        this.state.isLoadingMore = false;
    }

    setupData(data) {
        return data;
    }

    private generateRoute(name, config = null) {
        let returnArgs = false;

        if (typeof name === 'object') {
            config = name;
            returnArgs = true;
        }

        let fromConfig = this.getNetCriteria(config);

        return returnArgs ? fromConfig : new NavItem(name, fromConfig);
    }

    protected getNetCriteria(config = {}) {
        let fromConfig = {};

        this.criteriaNames.forEach((key) => {
            if (
                key in config && config[key] !== this.defaultCriteria[key]
            ) {
                fromConfig[key] = config[key];
            } else if ( // If currentCriteria is not the same as default, set it to fromConfig too
                this.currentCriteria && !(key in config) &&
                key in this.currentCriteria && this.currentCriteria[key] != this.defaultCriteria[key]
            ) {
                fromConfig[key] = this.currentCriteria[key];
            }
        });

        return fromConfig;
    }

    updateCriteria(criteria, value) {
        if (criteria === 'startWith') {
            this.currentCriteria = Object.assign({}, this.defaultCriteria);
        }

        this.currentCriteria[criteria] = ('' + value).toLowerCase();

        this.criteriaChangeEventDebounce[criteria].run(() => {
            this.ngGA.eventTrack('Profiles Criteria', {
                category: criteria,
                label: this.currentCriteria[criteria]
            })
        }, 3000);

        this.onCriteriaChanged();
    }

    resetCriteria() {
        this.currentCriteria = Object.assign({}, this.defaultCriteria);
        this.data = [];

        this.onCriteriaChanged();
    }
}