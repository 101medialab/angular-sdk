// Extend Native JS, skip if function name has been used.
var JsExtend = (function () {
    function JsExtend(extend, exportTo) {
        if (exportTo === void 0) { exportTo = window; }
        if (typeof extend !== 'object') {
            console.error('JSExtend: First argument in constructor is not typeof object.');
            return;
        }
        for (var key in extend) {
            if (key in exportTo) {
                var target = exportTo[key];
                for (var fnKey in extend[key]) {
                    if (fnKey !== 'prototype' && !(fnKey in target)) {
                        target[fnKey] = extend[key][fnKey];
                    }
                }
                if ('prototype' in extend[key]) {
                    for (var fnKey in extend[key]['prototype']) {
                        if (!(fnKey in target)) {
                            target['prototype'][fnKey] = extend[key]['prototype'][fnKey];
                        }
                    }
                }
            }
        }
    }
    return JsExtend;
}());
export { JsExtend };
//# sourceMappingURL=JsExtend.js.map