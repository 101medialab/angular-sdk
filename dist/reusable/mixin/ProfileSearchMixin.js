var ProfileSearchMixin = /** @class */ (function () {
    function ProfileSearchMixin() {
    }
    Object.defineProperty(ProfileSearchMixin, "fromSeparator", {
        get: function () {
            return '__type__';
        },
        enumerable: true,
        configurable: true
    });
    ProfileSearchMixin.prototype.handleProfileSearchResponse = function (resp, callWhenDone) {
        resp.forEach(function (profile) {
            profile.slug = profile.slug + ProfileSearchMixin.fromSeparator + profile.type;
        });
        callWhenDone(resp);
    };
    ProfileSearchMixin.prototype.fixProfileSelectizeValue = function (slug) {
        var indexOf = slug.indexOf(ProfileSearchMixin.fromSeparator), type = slug.substring(indexOf + ProfileSearchMixin.fromSeparator.length, slug.length);
        if (indexOf > -1) {
            var result = {
                slug: slug.substring(0, indexOf).trim(),
                type: type
            };
            if (type && type == 'undefined') {
                delete result.type;
            }
            return result;
        }
        return { slug: slug };
    };
    ProfileSearchMixin.prototype.convertToProfileNameAndSlug = function (data, key) {
        var _this = this;
        if (data[key].indexOf(',') > -1) {
            var eachSlug = data[key].split(',');
            data[key] = [];
            eachSlug.forEach(function (slug) {
                data[key].push(_this.fixProfileSelectizeValue(slug));
            });
        }
        else {
            var slug = data[key];
            if (slug != '') {
                data[key] = [this.fixProfileSelectizeValue(slug)];
            }
            else if (key in data) {
                data[key] = [];
            }
        }
    };
    ;
    return ProfileSearchMixin;
}());
export { ProfileSearchMixin };
//# sourceMappingURL=ProfileSearchMixin.js.map