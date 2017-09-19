var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import URI from 'urijs';
import { BaseResourceComponent } from '../../HbComponent/BaseResourceComponent';
import { Debounce } from '../Debounce';
import { NavItem } from '../../HbComponent/NavItem';
var MainComponent = /** @class */ (function (_super) {
    __extends(MainComponent, _super);
    function MainComponent(criteriaNames, defaultCriteria, diContainer, activatedRoute) {
        if (criteriaNames === void 0) { criteriaNames = []; }
        if (defaultCriteria === void 0) { defaultCriteria = {}; }
        var _this = _super.call(this, diContainer, activatedRoute) || this;
        _this.criteriaNames = criteriaNames;
        _this.defaultCriteria = defaultCriteria;
        _this.nPerRow = 0;
        _this.routeType = diContainer.config.ROUTE_TYPE_MAIN;
        _this.criteriaChangeEventDebounce = {};
        _this.criteriaNames.forEach(function (key) {
            _this.criteriaChangeEventDebounce[key] = new Debounce();
        });
        _this.state.isUsingDefaultCriteria = true;
        _this.state.allLoaded = false;
        _this.state.isLoadingMore = false;
        _this.currentCriteria = $.extend({}, _this.defaultCriteria);
        return _this;
    }
    MainComponent.prototype.getMetaData = function () {
        return {
            title: this.domainConfig.generateHTMLTitle(),
            description: 'Talents who shape and inspire our culture'
        };
    };
    MainComponent.prototype.onInit = function () {
        var _this = this;
        this.currentCriteria = $.extend(this.currentCriteria, this.resolveCriteriaFromRouteParams());
        this.listen('HB.list_view.LOAD_ANOTHER_PAGE', [function () {
                if (_this.currentCriteria.page > 4) {
                    _this.emit('HB.list_view.LOADED_THREE_TIMES');
                    return;
                }
                _this.loadMore();
            }]);
        this.emit('HB.resource.LOAD_BEGIN');
        this.updateNPerRow();
    };
    MainComponent.prototype.updateNPerRow = function () {
        var isBrand = this.domainConfig.getResourceName() == 'brand';
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
    };
    MainComponent.prototype.loadMore = function () {
        if (this.state.isLoadingMore) {
            return;
        }
        this.state.isLoadingMore = true;
        this.currentCriteria.page++;
        this.onCriteriaChanged(true);
    };
    MainComponent.prototype.resolveCriteriaFromRouteParams = function () {
        var _this = this;
        var fromUrl = {};
        this.criteriaNames.forEach(function (key) {
            var value = key in _this.activatedRoute.snapshot.params ? _this.activatedRoute.snapshot.params[key] : null;
            if (value) {
                fromUrl[key] = decodeURIComponent(value);
            }
        });
        return fromUrl;
    };
    MainComponent.prototype.resolveRequestingNoOfResult = function (netCriteria, includePage) {
        this.state.isUsingDefaultCriteria = Object.keys(netCriteria).length === 0;
        var result = {
            num: (this.nPerRow * 6) - (this.state.isUsingDefaultCriteria &&
                this.currentCriteria.page === 1 ? 4 : 0),
            offset: this.data ? this.data.length : 0
        };
        if (!includePage) {
            delete result.offset;
        }
        return result;
    };
    MainComponent.prototype.onCriteriaChanged = function (includePage) {
        if (includePage === void 0) { includePage = false; }
        var netCriteria = this.getNetCriteria(), query = Object.assign({}, netCriteria), _a = this.resolveRequestingNoOfResult(includePage, netCriteria), num = _a.num, offset = _a.offset;
        this.state.isUsingDefaultCriteria = Object.keys(netCriteria).length === 0;
        this.sendRequest(query, num, offset, includePage);
    };
    MainComponent.prototype.sendRequest = function (query, num, offset, includePage) {
        var _this = this;
        var endpoint = new URI('/');
        for (var key in query) {
            var name_1 = key;
            if (key !== 'sortedBy') {
                name_1 = 'criteria[' + key + ']';
            }
            endpoint.addQuery(name_1, query[key]);
        }
        endpoint.addQuery('num', num);
        endpoint.addQuery('offset', includePage ? offset : 0);
        this.status.resource.get(endpoint.build().toString(), [], false, includePage).then(function (data) {
            _this.onRequestDone(data, includePage, num);
            _this.onInitialized();
        });
    };
    MainComponent.prototype.onRequestDone = function (data, includePage, num) {
        data = this.setupData(data);
        this.data = includePage ? this.data.concat(data) : data;
        this.state.isInitialized = true;
        this.state.allLoaded = data.length < num;
        this.state.isLoadingMore = false;
    };
    MainComponent.prototype.setupData = function (data) {
        return data;
    };
    MainComponent.prototype.generateRoute = function (name, config) {
        if (config === void 0) { config = null; }
        var returnArgs = false;
        if (typeof name === 'object') {
            config = name;
            returnArgs = true;
        }
        var fromConfig = this.getNetCriteria(config);
        return returnArgs ? fromConfig : new NavItem(name, fromConfig);
    };
    MainComponent.prototype.getNetCriteria = function (config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        var fromConfig = {};
        this.criteriaNames.forEach(function (key) {
            if (key in config && config[key] !== _this.defaultCriteria[key]) {
                fromConfig[key] = config[key];
            }
            else if (_this.currentCriteria && !(key in config) &&
                key in _this.currentCriteria && _this.currentCriteria[key] != _this.defaultCriteria[key]) {
                fromConfig[key] = _this.currentCriteria[key];
            }
        });
        return fromConfig;
    };
    MainComponent.prototype.updateCriteria = function (criteria, value) {
        var _this = this;
        if (criteria === 'startWith') {
            this.currentCriteria = Object.assign({}, this.defaultCriteria);
        }
        this.currentCriteria[criteria] = ('' + value).toLowerCase();
        this.criteriaChangeEventDebounce[criteria].run(function () {
            _this.ngGA.eventTrack('Profiles Criteria', {
                category: criteria,
                label: _this.currentCriteria[criteria]
            });
        }, 3000);
        this.onCriteriaChanged();
    };
    MainComponent.prototype.resetCriteria = function () {
        this.currentCriteria = Object.assign({}, this.defaultCriteria);
        this.data = [];
        this.onCriteriaChanged();
    };
    return MainComponent;
}(BaseResourceComponent));
export { MainComponent };
//# sourceMappingURL=main.cpn.js.map