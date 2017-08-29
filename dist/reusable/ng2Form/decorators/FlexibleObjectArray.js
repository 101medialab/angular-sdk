export var FlexibleObjectArraySymbol = Symbol('IFlexibleObjectArrayFormConfig');
export function FlexibleObjectArray(options) {
    return Reflect.metadata(FlexibleObjectArraySymbol, Object.assign({}, options, {
        arrayType: 'object',
    }));
}
//# sourceMappingURL=FlexibleObjectArray.js.map