import "reflect-metadata";

enum decorators {
    format
};

function format(formatString: string) {
    return Reflect.metadata(decorators.format, formatString);
}

function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(decorators.format, target, propertyKey);
}