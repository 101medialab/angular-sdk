/**
* @fileoverview This file is generated by the Angular template compiler.
* Do not edit.
* @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
* tslint:disable
*/ 
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ng2-file-upload/file-upload/file-drop.directive";
import * as i3 from "ng2-file-upload/file-upload/file-select.directive";
import * as i4 from "./Uploader.cpn";
import * as i5 from "../ExtendedAuthHttp";
var styles_UploaderComponent = [];
var RenderType_UploaderComponent = i0.ɵcrt({ encapsulation: 2, styles: styles_UploaderComponent, data: {} });
export { RenderType_UploaderComponent as RenderType_UploaderComponent };
function View_UploaderComponent_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "td", [["nowrap", ""]], null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", " MB"])), i0.ɵppd(2, 2)], null, function (_ck, _v) { var currVal_0 = i0.ɵunv(_v, 1, 0, _ck(_v, 2, 0, i0.ɵnov(_v.parent.parent, 0), ((((_v.parent.context.$implicit == null) ? null : ((_v.parent.context.$implicit.file == null) ? null : _v.parent.context.$implicit.file.size)) / 1024) / 1024), ".2")); _ck(_v, 1, 0, currVal_0); }); }
function View_UploaderComponent_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 8, "td", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                            "])), (_l()(), i0.ɵeld(2, 0, null, null, 5, "div", [["class", "progress"], ["style", "margin-bottom: 0;"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                                "])), (_l()(), i0.ɵeld(4, 0, null, null, 2, "div", [["class", "progress-bar"], ["role", "progressbar"]], null, null, null, null, null)), i0.ɵdid(5, 278528, null, 0, i1.NgStyle, [i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngStyle: [0, "ngStyle"] }, null), i0.ɵpod(6, { "width": 0 }), (_l()(), i0.ɵted(-1, null, ["\n                            "])), (_l()(), i0.ɵted(-1, null, ["\n                        "]))], function (_ck, _v) { var currVal_0 = _ck(_v, 6, 0, (_v.parent.context.$implicit.progress + "%")); _ck(_v, 5, 0, currVal_0); }, null); }
function View_UploaderComponent_4(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["Uploaded."]))], null, null); }
function View_UploaderComponent_5(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["Canceled."]))], null, null); }
function View_UploaderComponent_6(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["Error occurs. Contact Developers"]))], null, null); }
function View_UploaderComponent_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 36, "tr", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵeld(2, 0, null, null, 2, "td", [], null, null, null, null, null)), (_l()(), i0.ɵeld(3, 0, null, null, 1, "strong", [], null, null, null, null, null)), (_l()(), i0.ɵted(4, null, ["", ""])), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_UploaderComponent_2)), i0.ɵdid(7, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_UploaderComponent_3)), i0.ɵdid(10, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵeld(12, 0, null, null, 10, "td", [["class", "text-center"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                            "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_UploaderComponent_4)), i0.ɵdid(15, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n                            "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_UploaderComponent_5)), i0.ɵdid(18, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n                            "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_UploaderComponent_6)), i0.ɵdid(21, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵeld(24, 0, null, null, 11, "td", [["nowrap", ""]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                            "])), (_l()(), i0.ɵeld(26, 0, null, null, 3, "button", [["class", "btn btn-success btn-xs"], ["type", "button"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_v.context.$implicit.upload() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                                "])), (_l()(), i0.ɵeld(28, 0, null, null, 0, "span", [["class", "glyphicon glyphicon-upload"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, [" Upload\n                            "])), (_l()(), i0.ɵted(-1, null, ["\n                            "])), (_l()(), i0.ɵeld(31, 0, null, null, 3, "button", [["class", "btn btn-danger btn-xs"], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_v.context.$implicit.remove() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                                "])), (_l()(), i0.ɵeld(33, 0, null, null, 0, "span", [["class", "glyphicon glyphicon-trash"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, [" Remove\n                            "])), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵted(-1, null, ["\n                    "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.uploader.isHTML5; _ck(_v, 7, 0, currVal_1); var currVal_2 = _co.uploader.isHTML5; _ck(_v, 10, 0, currVal_2); var currVal_3 = _v.context.$implicit.isSuccess; _ck(_v, 15, 0, currVal_3); var currVal_4 = _v.context.$implicit.isCancel; _ck(_v, 18, 0, currVal_4); var currVal_5 = _v.context.$implicit.isError; _ck(_v, 21, 0, currVal_5); }, function (_ck, _v) { var currVal_0 = ((_v.context.$implicit == null) ? null : ((_v.context.$implicit.file == null) ? null : _v.context.$implicit.file.name)); _ck(_v, 4, 0, currVal_0); var currVal_6 = ((_v.context.$implicit.isReady || _v.context.$implicit.isUploading) || _v.context.$implicit.isSuccess); _ck(_v, 26, 0, currVal_6); }); }
export function View_UploaderComponent_0(_l) { return i0.ɵvid(0, [i0.ɵpid(0, i1.DecimalPipe, [i0.LOCALE_ID]), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵeld(2, 0, null, null, 7, "div", [["class", "navbar navbar-default"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵeld(4, 0, null, null, 4, "div", [["class", "navbar-header"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                "])), (_l()(), i0.ɵeld(6, 0, null, null, 1, "span", [["class", "navbar-brand"]], null, null, null, null, null)), (_l()(), i0.ɵted(7, null, ["", ""])), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵted(-1, null, ["\n\n        "])), (_l()(), i0.ɵeld(11, 0, null, null, 74, "div", [["class", "expand-to-child"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵeld(13, 0, null, null, 10, "div", [["class", "col-md-3"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                "])), (_l()(), i0.ɵeld(15, 0, null, null, 4, "div", [["class", "well my-drop-zone"], ["ng2FileDrop", ""]], null, [[null, "fileOver"], [null, "drop"], [null, "dragover"], [null, "dragleave"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("drop" === en)) {
        var pd_0 = (i0.ɵnov(_v, 18).onDrop($event) !== false);
        ad = (pd_0 && ad);
    } if (("dragover" === en)) {
        var pd_1 = (i0.ɵnov(_v, 18).onDragOver($event) !== false);
        ad = (pd_1 && ad);
    } if (("dragleave" === en)) {
        var pd_2 = (i0.ɵnov(_v, 18).onDragLeave($event) !== false);
        ad = (pd_2 && ad);
    } if (("fileOver" === en)) {
        var pd_3 = (_co.fileOverBase($event) !== false);
        ad = (pd_3 && ad);
    } return ad; }, null, null)), i0.ɵdid(16, 278528, null, 0, i1.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(17, { "nv-file-over": 0 }), i0.ɵdid(18, 16384, null, 0, i2.FileDropDirective, [i0.ElementRef], { uploader: [0, "uploader"] }, { fileOver: "fileOver" }), (_l()(), i0.ɵted(-1, null, ["\n                     Drag & drop\n                "])), (_l()(), i0.ɵted(-1, null, ["\n\n                "])), (_l()(), i0.ɵeld(21, 0, null, null, 1, "input", [["multiple", ""], ["ng2FileSelect", ""], ["type", "file"]], null, [[null, "change"]], function (_v, en, $event) { var ad = true; if (("change" === en)) {
        var pd_0 = (i0.ɵnov(_v, 22).onChange() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(22, 16384, null, 0, i3.FileSelectDirective, [i0.ElementRef], { uploader: [0, "uploader"] }, null), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵted(-1, null, ["\n\n            "])), (_l()(), i0.ɵeld(25, 0, null, null, 59, "div", [["class", "col-md-9"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                "])), (_l()(), i0.ɵeld(27, 0, null, null, 28, "table", [["class", "table"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵeld(29, 0, null, null, 19, "thead", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵeld(31, 0, null, null, 16, "tr", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵeld(33, 0, null, null, 1, "th", [["width", "50%"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["Name"])), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵeld(36, 0, null, null, 1, "th", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["Size"])), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵeld(39, 0, null, null, 1, "th", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["Progress"])), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵeld(42, 0, null, null, 1, "th", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["Status"])), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵeld(45, 0, null, null, 1, "th", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["Actions"])), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵeld(50, 0, null, null, 4, "tbody", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_UploaderComponent_1)), i0.ɵdid(53, 802816, null, 0, i1.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵted(-1, null, ["\n                "])), (_l()(), i0.ɵted(-1, null, ["\n\n                "])), (_l()(), i0.ɵeld(57, 0, null, null, 26, "div", [["class", "col-xs-12"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵeld(59, 0, null, null, 8, "div", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                        Queue progress:\n                        "])), (_l()(), i0.ɵeld(61, 0, null, null, 5, "div", [["class", "progress"], ["style", ""]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                            "])), (_l()(), i0.ɵeld(63, 0, null, null, 2, "div", [["class", "progress-bar"], ["role", "progressbar"]], null, null, null, null, null)), i0.ɵdid(64, 278528, null, 0, i1.NgStyle, [i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngStyle: [0, "ngStyle"] }, null), i0.ɵpod(65, { "width": 0 }), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵeld(69, 0, null, null, 3, "button", [["class", "btn btn-success btn-s"], ["type", "button"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.uploader.uploadAll() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵeld(71, 0, null, null, 0, "span", [["class", "glyphicon glyphicon-upload"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, [" Upload all\n                    "])), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵeld(74, 0, null, null, 3, "button", [["class", "btn btn-warning btn-s"], ["type", "button"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.uploader.cancelAll() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵeld(76, 0, null, null, 0, "span", [["class", "glyphicon glyphicon-ban-circle"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, [" Cancel all\n                    "])), (_l()(), i0.ɵted(-1, null, ["\n                    "])), (_l()(), i0.ɵeld(79, 0, null, null, 3, "button", [["class", "btn btn-danger btn-s"], ["type", "button"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.uploader.clearQueue() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                        "])), (_l()(), i0.ɵeld(81, 0, null, null, 0, "span", [["class", "glyphicon glyphicon-trash"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, [" Remove all\n                    "])), (_l()(), i0.ɵted(-1, null, ["\n                "])), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵted(-1, null, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = "well my-drop-zone"; var currVal_2 = _ck(_v, 17, 0, _co.hasBaseDropZoneOver); _ck(_v, 16, 0, currVal_1, currVal_2); var currVal_3 = _co.uploader; _ck(_v, 18, 0, currVal_3); var currVal_4 = _co.uploader; _ck(_v, 22, 0, currVal_4); var currVal_5 = _co.uploader.queue; _ck(_v, 53, 0, currVal_5); var currVal_6 = _ck(_v, 65, 0, (_co.uploader.progress + "%")); _ck(_v, 64, 0, currVal_6); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.title; _ck(_v, 7, 0, currVal_0); var currVal_7 = !_co.uploader.getNotUploadedItems().length; _ck(_v, 69, 0, currVal_7); var currVal_8 = !_co.uploader.isUploading; _ck(_v, 74, 0, currVal_8); var currVal_9 = !_co.uploader.queue.length; _ck(_v, 79, 0, currVal_9); }); }
export function View_UploaderComponent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "uploader", [], null, null, null, View_UploaderComponent_0, RenderType_UploaderComponent)), i0.ɵdid(1, 573440, null, 0, i4.UploaderComponent, [i5.ExtendedAuthHttp], null, null)], null, null); }
var UploaderComponentNgFactory = i0.ɵccf("uploader", i4.UploaderComponent, View_UploaderComponent_Host_0, { isInitializable: "isInitializable", baseUrl: "baseUrl", title: "title", uploadLimit: "uploadLimit" }, {}, []);
export { UploaderComponentNgFactory as UploaderComponentNgFactory };
//# sourceMappingURL=Uploader.cpn.ngfactory.js.map