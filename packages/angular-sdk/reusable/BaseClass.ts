export class BaseClass {
    log() {
        console.log(arguments);
    }

    static isDefinedNotNull(obj) {
        return typeof obj !== 'undefined' && obj != null;
    }

    isDefinedNotNull(obj) {
        return BaseClass.isDefinedNotNull(obj);
    }

    typeof(obj) {
        return typeof obj;
    }
}