/**
* @fileoverview This file is generated by the Angular template compiler.
* Do not edit.
* @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
* tslint:disable
*/ 
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./Backdrop.cpn";
var styles_Backdrop = [];
var RenderType_Backdrop = i0.ɵcrt({ encapsulation: 2, styles: styles_Backdrop, data: {} });
export { RenderType_Backdrop as RenderType_Backdrop };
export function View_Backdrop_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵeld(1, 0, null, null, 2, "div", [], [[8, "hidden", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.data.value = false) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(2, 278528, null, 0, i1.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngClass: [0, "ngClass"] }, null), i0.ɵpod(3, { "cover-screen": 0, "cover-container": 1 }), (_l()(), i0.ɵted(-1, null, ["\n     "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _ck(_v, 3, 0, (_co.mode === "screen"), (_co.mode === "container")); _ck(_v, 2, 0, currVal_1); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = !_co.data.value; _ck(_v, 1, 0, currVal_0); }); }
export function View_Backdrop_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "backdrop", [], null, null, null, View_Backdrop_0, RenderType_Backdrop)), i0.ɵdid(1, 49152, null, 0, i2.Backdrop, [], null, null)], null, null); }
var BackdropNgFactory = i0.ɵccf("backdrop", i2.Backdrop, View_Backdrop_Host_0, { data: "showWhen", mode: "mode" }, {}, []);
export { BackdropNgFactory as BackdropNgFactory };
//# sourceMappingURL=Backdrop.cpn.ngfactory.js.map