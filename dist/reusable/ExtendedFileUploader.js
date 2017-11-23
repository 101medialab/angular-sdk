var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { FileUploader } from 'ng2-file-upload/file-upload/file-uploader.class';
var ExtendedFileUploader = (function (_super) {
    __extends(ExtendedFileUploader, _super);
    function ExtendedFileUploader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtendedFileUploader.prototype.onCompleteItem = function (item, response, status, headers) { };
    return ExtendedFileUploader;
}(FileUploader));
export { ExtendedFileUploader };
//# sourceMappingURL=ExtendedFileUploader.js.map