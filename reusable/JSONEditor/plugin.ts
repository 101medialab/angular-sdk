import {BaseResource} from '../../HbComponent/BaseResource';

export function setupProfileSelectizeField(
    options: {
        field,
        resource: BaseResource,
        list: Array<any>,
        onSetupDone?: (cpn) => {},
        selectizeOptions?: any,
        apiEndPoint?: string,
        resolveResponse?: (resp, callWhenDone) => {}
        manuallySetValue?: boolean
    }
) {
    options = $.extend({
        onSetupDone: null,
        selectizeOptions: null,
        apiEndPoint: null,
        resolveResponse: null,
        manuallySetValue: false,
    }, options);

    options.field.type = 'autocomplete';
    options.field.setup = (cpn) => {
        options.selectizeOptions = options.selectizeOptions || {};

        options.selectizeOptions.onChange = (value) => {
            // Set it to '' or JSONEditor will not run setValue().
            // Selectize will update value. We must set it to '',
            // otherwise JSONEditor will consider it as the same as sanitized value.
            // See JSONEditor setValue() [ (this.input.value === sanitized) ] if condition
            cpn.input.value = '';

            cpn.setValue(value);
        };

        options.selectizeOptions.onItemRemove = (value) => {
            let replace = cpn.getValue().replace(value, '').replace(/^,|,$/gm, '');

            cpn.input.value = Date.now().toString();
            cpn.setValue(replace);
        };

        setupProfileSelectize(cpn.input, options);

        options.onSetupDone ? options.onSetupDone(cpn) : (0);

        if (!options.manuallySetValue) {
            options.list.forEach(({slug}) => cpn.input.selectize.addItem(slug));
        }
    };
}

export function setupProfileSelectize(
    input,
    options: {
        resource: BaseResource,
        list: Array<any>,
        selectizeOptions?: any,
        apiEndPoint?: string,
        resolveResponse?: (resp, callWhenDone, instance) => {}
    }
) {
    let $el = $(input);

    $el.selectize(
        $.extend(true, {
            valueField: 'slug',
            labelField: 'name',
            searchField: 'name',
            maxItems: 1,
            options: options.list,
            create: false,
            render: {
                item: function (item, escape) {
                    return `
                        <div>
                            <span class="title">
                                <span class="name">${escape(item.name)}</span>
                                ` + ('type' in item ? `<span class="type">${escape(item.type.capitalize())}</span>` : '' ) + `
                            </span>
                        </div>
                    `;
                },
                option: function (item, escape) {
                    return `
                        <div>
                            <span class="title">
                                <span class="name">${escape(item.name)}</span>
                                ` + ('type' in item ? `<span class="type">${escape(item.type.capitalize())}</span>` : '' ) + `
                            </span>
                        </div>
                    `;
                }
            },
            load: (query, callback) => {
                if (!query.length) return callback();

                let instance = $el[0].selectize;

                options.resource.get(
                    (options.apiEndPoint ? options.apiEndPoint : '/search/by-name/') + query, [], true
                ).then((result) => {
                    if (result instanceof Array) {
                        if (options.resolveResponse) {
                            options.resolveResponse(result, callback, instance);
                        } else {
                            callback(result);
                        }
                    } else {
                        callback();
                    }
                });
            }
        }, options.selectizeOptions)
    );

    return (input instanceof HTMLInputElement ? input : input[0]).selectize;
}