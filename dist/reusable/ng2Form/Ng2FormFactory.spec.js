var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'jest';
import { FormBuilder, FormGroup } from '@angular/forms';
import { expectedMapping } from '../ObjectAttributeTypeExtractor.spec';
import { ObjectAttributeTypeExtractor as Extractor } from '../ObjectAttributeTypeExtractor';
import { Ng2FormFactory as Factory } from './Ng2FormFactory';
import { FormConfig, SetupConfig } from './NgFormFactoryAnnotations';
import { FlexibleObjectArray } from "./decorators/FlexibleObjectArray";
import '../hb-es-shim';
describe('Ng2FormFactory.generateFormGroupByOATMapping', function () {
    // it('pass', () => {
    //     let expected = Factory.generateFormGroupByOATMapping(
    //         new FormBuilder(),
    //         expectedMapping
    //     ).templateConfig;
    //
    //     expect(
    //         expected
    //     ).toEqual(null);
    // });
    it('should generate Angular form object and HBForm compatible template object from ObjectAttributeTypeExtractor mapping for a mixed renderType object with nested object array', function () {
        var expected = Factory.generateFormGroupByOATMapping(new FormBuilder(), expectedMapping);
        new FormGroup(expected.ngFormControl);
        expected.templateConfig.primitiveArrayAttributeName.add();
        // expected.templateConfig.objectArrayAttributeName.add();
        // expected.templateConfig.objectArrayAttributeName.children[0].objectArrayAttributeName.add();
        // expected.templateConfig.objectArrayAttributeName.children[0].primitiveArrayAttributeName.add();
        expect(expected.templateConfig).toMatchObject({
            "anyAttributeName": {
                "label": "Any Attribute Name",
                "renderType": "text",
                "type": "string"
            },
            "booleanAttributeName": {
                "label": "Boolean Attribute Name",
                "renderType": "checkbox",
                "type": "boolean"
            },
            "dateAttributeName": {
                "label": "Date Attribute Name",
                "renderType": "date",
                "type": "date"
            },
            "objectAttributeName": {
                "children": {
                    "attr1": {
                        "label": "Attr1",
                        "renderType": "number",
                        "type": "number"
                    }
                },
                "groupType": "object",
                "label": "Object Attribute Name"
            },
            "primitiveArrayAttributeName": {
                "children": [{
                        "primitiveArrayAttributeName": {
                            "label": "Primitive Array Attribute Name",
                            "renderType": "number",
                            "type": "number"
                        }
                    }],
                "arrayType": "primitive",
                "groupType": "array",
                "label": "Primitive Array Attribute Name"
            },
            "stringAttributeName": {
                "label": "String Attribute Name",
                "renderType": "text",
                "type": "string"
            }
        });
    });
    it('should generate form for Mixed type Array', function () {
        var A = (function () {
            function A() {
                this.name = '';
            }
            return A;
        }());
        var B = (function () {
            function B() {
                this.phoneNo = null;
            }
            __decorate([
                SetupConfig(),
                FormConfig({
                    defaultValue: ''
                }),
                __metadata("design:type", Number)
            ], B.prototype, "phoneNo", void 0);
            return B;
        }());
        var DecoratorDemo = (function () {
            function DecoratorDemo() {
                this.attr = [];
            }
            __decorate([
                SetupConfig(),
                FlexibleObjectArray({
                    objectDefinitions: [{
                            label: 'Type A',
                            structure: Extractor.generateMapping(new A())
                        }, {
                            label: 'Type B',
                            structure: Extractor.generateMapping(new B())
                        }]
                }),
                __metadata("design:type", Array)
            ], DecoratorDemo.prototype, "attr", void 0);
            return DecoratorDemo;
        }());
        var expected = Factory.generateFormGroupByOATMapping(new FormBuilder(), Extractor.generateMapping(new DecoratorDemo()));
        new FormGroup(expected.ngFormControl);
        expected.templateConfig.attr.useConfig = 1;
        expected.templateConfig.attr.add();
        expected.templateConfig.attr.useConfig = 0;
        expected.templateConfig.attr.add();
        expect(expected.templateConfig.attr.children).toMatchObject([{
                "phoneNo": {
                    "label": "Phone No",
                    "renderType": "text",
                    "type": "string"
                },
            }, {
                "name": {
                    "label": "Name",
                    "renderType": "text",
                    "type": "string"
                },
            }]);
    });
});
//# sourceMappingURL=Ng2FormFactory.spec.js.map