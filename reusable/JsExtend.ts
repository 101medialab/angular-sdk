// Extend Native JS, skip if function name has been used.
export default class JsExtend {
    constructor(extend, exportTo: {} = window) {
        if (typeof extend !== 'object') {
            console.error('JSExtend: First argument in constructor is not typeof object.');

            return;
        }

        for (let key in extend) {
            if (key in exportTo) {
                let target = exportTo[key];

                for (let fnKey in extend[key]) {
                    if (fnKey !== 'prototype' && !(fnKey in target)) {
                        target[fnKey] = extend[key][fnKey];
                    }
                }

                if ('prototype' in extend[key]) {
                    for (let fnKey in extend[key]['prototype']) {
                        if (!(fnKey in target)) {
                            target['prototype'][fnKey] = extend[key]['prototype'][fnKey];
                        }
                    }
                }
            }
        }
    }
}