export var MultiOptionsSymbol = Symbol('IMultipleOptionsFormConfig');
export function MultiOptions(options) {
    return Reflect.metadata(MultiOptionsSymbol, Object.assign({
        expandOptions: true
    }, options));
}
//# sourceMappingURL=MultiOptions.js.map