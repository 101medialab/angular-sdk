export class BaseClass {
    static isDefinedNotNull(obj) {
        return typeof obj !== 'undefined' && obj != null;
    }

    isDefinedNotNull(obj) {
        return BaseClass.isDefinedNotNull(obj);
    }
}