// This function support methods mixin only, you still need to copy essential attributes to derived class
export function applyMixins(derivedClass, baseClasses, includeConstructor, skipMethods) {
    if (includeConstructor === void 0) { includeConstructor = false; }
    if (skipMethods === void 0) { skipMethods = []; }
    baseClasses.forEach(function (baseClass) {
        Object.getOwnPropertyNames(baseClass.prototype).forEach(function (name) {
            if ((includeConstructor || name !== 'constructor') && skipMethods.indexOf(name) === -1) {
                derivedClass.prototype[name] = baseClass.prototype[name];
            }
        });
    });
}
//# sourceMappingURL=Mixin.js.map