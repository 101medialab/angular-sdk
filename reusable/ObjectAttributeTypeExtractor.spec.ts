import 'jest';
import {
    NonPrimitiveTypeMeta,
    ObjectAttributeTypeExtractor as Extractor, OnOATResolved,
    PrimitiveTypeMeta
} from './ObjectAttributeTypeExtractor';
import { FormConfig, SetupConfig } from './ng2Form/NgFormFactoryAnnotations';

export const expectedMapping = {
    "anyAttributeName": "any",
    "booleanAttributeName": new PrimitiveTypeMeta(true),
    "dateAttributeName": new NonPrimitiveTypeMeta('date', null, new Date('2017-08-24')),
    "objectArrayAttributeName": {
        "_mapping": {
            "anyAttributeName": "any",
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

describe('ObjectAttributeTypeExtractor.generateMapping', () => {
    it('should generate mapping for a mixed type object with nested object array', () => {
        expect(
            Extractor.generateMapping({
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
            })
        ).toMatchObject(expectedMapping)
    });

    it('should support callback on config resolved. Example usage: Decorator', () => {
        const decorator = 'DemoDecorator';

        class DecoratorDemo {
            @SetupConfig()
            @FormConfig({
                label: 'This is a attribute',
                defaultValue: 99
            })
            @Reflect.metadata(decorator, 'demo decorator value')
            attr: string = null;
            inner: Array<InsideObjectArrayDecoratorDemo> = [new InsideObjectArrayDecoratorDemo()]
        }

        class InsideObjectArrayDecoratorDemo {
            @OnOATResolved((target, key, resolved) => {
                resolved.anythingYouWantToAdd = 'this attribute is actually type of number';
            })
            innerAttr: string = '';
        }

        expect(
            Extractor.generateMapping(
                new DecoratorDemo(), {
                    onResolved: (target, key, resolved) => {
                        resolved.decorators = {};

                        const decoratorValue = Reflect.getMetadata(decorator, target, key);

                        if (decoratorValue) {
                            resolved.decorators[decorator] = decoratorValue;
                        }
                    }
                }
            )
        ).toEqual({
            //toMatchObject
            "attr": {
                "_type": "string",
                "_value": "",
                "decorators": {
                    "DemoDecorator": "demo decorator value"
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