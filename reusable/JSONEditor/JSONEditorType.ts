export class Type {
    constructor(public type: string, public title: string = '', config: {} = null) {
        if (config) {
            for (let key in config) {
                if (!(key in this)) {
                    this[key] = config[key];
                }
            }
        }
    }
}

export class String extends Type {
    constructor(title: string, config: {} = null) {
        super('string', title, config);
    }
}

export class Object extends Type {
    constructor(title, public properties: {} = {}, config: {} = null) {
        super('object', title, config);
    }
}

export class Array extends Type {
    constructor(title, public items: {} = {}, public format: string = 'tabs', config: {} = null) {
        super('array', title, config);
    }
}

export class Boolean extends Type {
    constructor(title, public format: string = 'checkbox', config: {} = null) {
        super('boolean', title, config);
    }
}

export class Date extends String {
    constructor(title: string, config: {} = {}) {
        config.format = 'date';

        super(title, config);
    }
}

export class Number extends String {
    constructor(title: string, config: {} = {}) {
        config.format = 'number';

        super(title, config);
    }
}