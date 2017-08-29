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
import { NonPrimitiveTypeMeta, ObjectAttributeTypeExtractor as Extractor, OnOATResolved, PrimitiveTypeMeta } from './ObjectAttributeTypeExtractor';
import { FormConfig, SetupConfig } from './ng2Form/NgFormFactoryAnnotations';
export var expectedMapping = {
    "anyAttributeName": new PrimitiveTypeMeta(null),
    "booleanAttributeName": new PrimitiveTypeMeta(true),
    "dateAttributeName": new NonPrimitiveTypeMeta('date', null, new Date('2017-08-24')),
    "objectArrayAttributeName": {
        "_mapping": {
            "anyAttributeName": new PrimitiveTypeMeta(null),
            "booleanAttributeName": new PrimitiveTypeMeta(true),
            "dateAttributeName": new NonPrimitiveTypeMeta('date', null, new Date('2017-08-24')),
            "objectArrayAttributeName": {
                "_mapping": {
                    "attr1": new PrimitiveTypeMeta(1)
                },
                "_type": "array"
            },
            "objectAttributeName": {
                "_mapping": {
                    "attr1": new PrimitiveTypeMeta(1)
                },
                "_type": "object"
            },
            "primitiveArrayAttributeName": new NonPrimitiveTypeMeta('array', new PrimitiveTypeMeta(1)),
            "stringAttributeName": new PrimitiveTypeMeta("some characters")
        },
        "_type": "array"
    },
    "objectAttributeName": {
        "_mapping": {
            "attr1": new PrimitiveTypeMeta(1)
        },
        "_type": "object"
    },
    "primitiveArrayAttributeName": {
        "_mapping": new PrimitiveTypeMeta(1),
        "_type": "array"
    },
    "stringAttributeName": new PrimitiveTypeMeta("some characters")
};
describe('ObjectAttributeTypeExtractor.generateMapping', function () {
    it('should generate mapping for a mixed type object with nested object array', function () {
        expect(Extractor.generateMapping({
            stringAttributeName: 'some characters',
            booleanAttributeName: true,
            dateAttributeName: new Date('2017-08-24'),
            objectArrayAttributeName: [{
                    stringAttributeName: 'some characters',
                    booleanAttributeName: true,
                    dateAttributeName: new Date('2017-08-24'),
                    objectArrayAttributeName: [{ attr1: 1 }],
                    primitiveArrayAttributeName: [1],
                    objectAttributeName: { attr1: 1 },
                    anyAttributeName: null
                }],
            primitiveArrayAttributeName: [1],
            objectAttributeName: { attr1: 1 },
            anyAttributeName: null
        })).toMatchObject(expectedMapping);
    });
    it('should support callback on config resolved. Example usage: Decorator', function () {
        var decorator = 'DemoDecorator';
        var DecoratorDemo = (function () {
            function DecoratorDemo() {
                this.attr = null;
                this.inner = [new InsideObjectArrayDecoratorDemo()];
            }
            __decorate([
                SetupConfig(),
                FormConfig({
                    label: 'This is a attribute',
                    defaultValue: 99
                }),
                Reflect.metadata(decorator, 'demo decorator value'),
                __metadata("design:type", String)
            ], DecoratorDemo.prototype, "attr", void 0);
            return DecoratorDemo;
        }());
        var InsideObjectArrayDecoratorDemo = (function () {
            function InsideObjectArrayDecoratorDemo() {
                this.innerAttr = '';
            }
            __decorate([
                OnOATResolved(function (target, key, resolved) {
                    resolved.anythingYouWantToAdd = 'this attribute is actually type of number';
                }),
                __metadata("design:type", String)
            ], InsideObjectArrayDecoratorDemo.prototype, "innerAttr", void 0);
            return InsideObjectArrayDecoratorDemo;
        }());
        expect(Extractor.generateMapping(new DecoratorDemo(), {
            onResolved: function (target, key, resolved) {
                resolved.decorators = {};
                var decoratorValue = Reflect.getMetadata(decorator, target, key);
                if (decoratorValue) {
                    resolved.decorators[decorator] = decoratorValue;
                }
            }
        })).toMatchObject({
            "attr": {
                "_type": "any",
                "_value": null,
                "formFactory": {
                    "defaultValue": 99,
                    "label": "This is a attribute"
                }
            },
            "inner": {
                "_mapping": {
                    "innerAttr": {
                        "_type": "string",
                        "_value": "",
                        "anythingYouWantToAdd": "this attribute is actually type of number"
                    }
                },
                "_type": "array",
                "_value": null,
            }
        });
    });
});
//# sourceMappingURL=ObjectAttributeTypeExtractor.spec.js.map