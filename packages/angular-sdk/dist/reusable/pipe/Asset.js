import { Pipe } from '@angular/core';
import { Status } from '../modules/status.svc';
var Asset = (function () {
    function Asset() {
    }
    Asset.prototype.transform = function (relativePath, args) {
        if (args === void 0) { args = null; }
        return (Status.APP_ENV ? 'http://s3.store.hypebeast.com' : '') + '/media/wiki/' + relativePath;
    };
    Asset.decorators = [
        { type: Pipe, args: [{
                    name: 'asset'
                },] },
    ];
    /** @nocollapse */
    Asset.ctorParameters = function () { return []; };
    return Asset;
}());
export { Asset };
//# sourceMappingURL=Asset.js.map