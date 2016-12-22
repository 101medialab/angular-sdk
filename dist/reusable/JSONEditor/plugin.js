import 'selectize';
export function setupProfileSelectizeField(options) {
    options = $.extend({
        onSetupDone: null,
        selectizeOptions: null,
        apiEndPoint: null,
        resolveResponse: null,
        manuallySetValue: false,
    }, options);
    options.field.type = 'autocomplete';
    options.field.setup = function (cpn) {
        options.selectizeOptions = options.selectizeOptions || {};
        options.selectizeOptions.onChange = function (value) {
            // Set it to '' or JSONEditor will not run setValue().
            // Selectize will update value. We must set it to '',
            // otherwise JSONEditor will consider it as the same as sanitized value.
            // See JSONEditor setValue() [ (this.input.value === sanitized) ] if condition
            cpn.input.value = '';
            cpn.setValue(value);
        };
        options.selectizeOptions.onItemRemove = function (value) {
            var replace = cpn.getValue().replace(value, '').replace(/^,|,$/gm, '');
            cpn.input.value = Date.now().toString();
            cpn.setValue(replace);
        };
        setupProfileSelectize(cpn.input, options);
        options.onSetupDone ? options.onSetupDone(cpn) : (0);
        if (!options.manuallySetValue) {
            options.list.forEach(function (_a) {
                var slug = _a.slug;
                return cpn.input.selectize.addItem(slug);
            });
        }
    };
}
export function setupProfileSelectize(input, options) {
    var $el = $(input);
    $el.selectize($.extend(true, {
        valueField: 'slug',
        labelField: 'name',
        searchField: 'name',
        maxItems: 1,
        options: options.list,
        create: false,
        render: {
            item: function (item, escape) {
                return "\n                        <div>\n                            <span class=\"title\">\n                                <span class=\"name\">" + escape(item.name) + "</span>\n                                " + ('type' in item ? "<span class=\"type\">" + escape(item.type.capitalize()) + "</span>" : '') + "\n                            </span>\n                        </div>\n                    ";
            },
            option: function (item, escape) {
                return "\n                        <div>\n                            <span class=\"title\">\n                                <span class=\"name\">" + escape(item.name) + "</span>\n                                " + ('type' in item ? "<span class=\"type\">" + escape(item.type.capitalize()) + "</span>" : '') + "\n                            </span>\n                        </div>\n                    ";
            }
        },
        load: function (query, callback) {
            if (!query.length)
                return callback();
            var instance = $el[0].selectize;
            options.resource.get((options.apiEndPoint ? options.apiEndPoint : '/search/by-name/') + query, [], true).then(function (result) {
                if (result instanceof Array) {
                    if (options.resolveResponse) {
                        options.resolveResponse(result, callback, instance);
                    }
                    else {
                        callback(result);
                    }
                }
                else {
                    callback();
                }
            });
        }
    }, options.selectizeOptions));
    return (input instanceof HTMLInputElement ? input : input[0]).selectize;
}
//# sourceMappingURL=plugin.js.map