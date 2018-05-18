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
import { IdvComponent } from './idv.cpn';
var SluggedIdvComponent = /** @class */ (function (_super) {
    __extends(SluggedIdvComponent, _super);
    function SluggedIdvComponent(diContainer, activatedRoute) {
        return _super.call(this, diContainer, activatedRoute) || this;
    }
    SluggedIdvComponent.prototype.onInit = function () {
        var _this = this;
        this.titleService.setTitle(this.domainConfig.generateHTMLTitle('Loading...'));
        this.status.resource.isCancelIfLoading = false;
        var isForceReload = this.routeType !== this.domainConfig.ROUTE_TYPE_VIEW;
        try {
            if (this.activatedRoute.parent.url.value[0].path !== 'collections') {
                this.emit('HB.loading_screen.theme.WHITE');
            }
        }
        catch (e) { }
        this.activatedRoute.params.subscribe(function (_a) {
            var slug = _a.slug, from = _a.from, index = _a.index;
            if (from) {
                _this.ngGA.eventTrack('Visit ' + _this.domainConfig.getResourceName(true), {
                    category: 'From Homepage',
                    label: from === 'trending' ?
                        'Trending - Position ' + index :
                        from === 'featured' ?
                            'Featured ' + _this.domainConfig.getResourceName(true) :
                            'Up & Coming'
                });
            }
            if (typeof slug !== 'undefined') {
                _this.status.resource.get(_this.resolveBaseUrl(slug), [], isForceReload).then(function (data) {
                    _this.data = _this.setupData(Object.assign({}, data));
                    _this.status.resource.isCancelIfLoading = true;
                    _this.state.isInitialized = true;
                    _this.onInitialized();
                }, function (error) {
                    _this.onResourceNotFound(error);
                });
            }
            _super.prototype.onInit.call(_this);
        });
    };
    SluggedIdvComponent.prototype.resolveBaseUrl = function (slug) {
        return slug;
    };
    SluggedIdvComponent.prototype.onResourceNotFound = function (error) {
        this.router.navigateByUrl('/404', { skipLocationChange: true });
    };
    SluggedIdvComponent.prototype.getMetaData = function () {
        return {
            title: this.domainConfig.generateHTMLTitle(this.data.name),
            description: this.data.description
        };
    };
    return SluggedIdvComponent;
}(IdvComponent));
export { SluggedIdvComponent };
//# sourceMappingURL=slugged-idv.cpn.js.map