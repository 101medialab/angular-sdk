export class JSONEditorType {
    constructor(public type: string, public title: string = '', config: any = null) {
        if (config) {
            for (let key in config) {
                if (!(key in this)) {
                    this[key] = config[key];
                }
            }
        }
    }
}

export class StringType extends JSONEditorType {
    constructor(title: string, config: any = null) {
        super('string', title, config);
    }
}

export class ObjectType extends JSONEditorType {
    constructor(title, public properties: any = {}, config: any = null) {
        super('object', title, config);
    }
}

export class ArrayType extends JSONEditorType {
    constructor(title, public items: any = {}, public format: string = 'tabs', config: any = null) {
        super('array', title, config);
    }
}

export class BooleanType extends JSONEditorType {
    constructor(title, public format: string = 'checkbox', config: any = null) {
        super('boolean', title, config);
    }
}

export class DateType extends StringType {
    constructor(title: string, config: any = {}) {
        config.format = 'date';

        super(title, config);
    }
}

export class NumberType extends StringType {
    constructor(title: string, config: any = {}) {
        config.format = 'number';

        super(title, config);
    }
}