export class ProfileSearchMixin {
    public static get fromSeparator() {
        return '__type__';
    }

    protected handleProfileSearchResponse(resp: Array, callWhenDone) {
        resp.forEach((profile) => {
            profile.slug = profile.slug + ProfileSearchMixin.fromSeparator + profile.type;
        });

        callWhenDone(resp);
    }

    protected fixProfileSelectizeValue(slug) {
        let indexOf = slug.indexOf(ProfileSearchMixin.fromSeparator),
            type = slug.substring(indexOf + ProfileSearchMixin.fromSeparator.length, slug.length);

        if (indexOf > -1) {
            let result = {
                slug: slug.substring(0, indexOf).trim(),
                type
            };

            if (type && type == 'undefined') {
                delete result.type;
            }

            return result;
        }

        return {slug}
    }

    protected convertToProfileNameAndSlug(data, key) {
        if (data[key].indexOf(',') > -1) {
            let eachSlug = data[key].split(',');
            data[key] = [];

            eachSlug.forEach((slug) => {
                data[key].push(this.fixProfileSelectizeValue(slug));
            });
        } else {
            let slug = data[key];

            if (slug != '') {
                data[key] = [this.fixProfileSelectizeValue(slug)];
            } else if (key in data) {
                data[key] = [];
            }
        }
    };
}