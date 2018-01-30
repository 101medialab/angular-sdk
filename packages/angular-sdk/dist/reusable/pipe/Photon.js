import { Pipe } from '@angular/core';
import { Status } from '../modules/status.svc';
var Photon = (function () {
    function Photon() {
    }
    Photon.prototype.transform = function (path, args) {
        if (args === void 0) { args = null; }
        if (!path) {
            return '';
        }
        path = path.replace(/https?:\/\//, '');
        path = path.replace(/[\/]{2,}/, '/');
        var external = path.match(/https?:\/\//, '');
        return Status.APP_ENV ?
            'http://i0.wp.com/' + path + '?' + args :
            (external ? '//' : '') + path;
    };
    Photon.decorators = [
        { type: Pipe, args: [{
                    name: 'photon'
                },] },
    ];
    /** @nocollapse */
    Photon.ctorParameters = function () { return []; };
    return Photon;
}());
export { Photon };
//# sourceMappingURL=Photon.js.map