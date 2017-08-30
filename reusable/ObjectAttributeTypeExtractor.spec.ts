import 'jest';
import {
    NonPrimitiveTypeMeta,
    ObjectAttributeTypeExtractor as Extractor, OnOATResolved,
    PrimitiveTypeMeta
} from './ObjectAttributeTypeExtractor';
import { FormConfig, SetupConfig } from './ng2Form/NgFormFactoryAnnotations';

export const expectedMapping = {
    "anyAttributeName": new PrimitiveTypeMeta(null),
    "booleanAttributeName": new PrimitiveTypeMeta(true),
    "dateAttributeName": new NonPrimitiveTypeMeta('date', null, new Date('2017-08-24')),
    "objectArrayAttributeName": new NonPrimitiveTypeMeta('array', {
        "anyAttributeName": new PrimitiveTypeMeta(null),
        "booleanAttributeName": new PrimitiveTypeMeta(true),
        "dateAttributeName": new NonPrimitiveTypeMeta('date', null, new Date('2017-08-24')),
        "objectArrayAttributeName": new NonPrimitiveTypeMeta("array", {
            "attr1": new PrimitiveTypeMeta(1)
        }),
        "objectAttributeName": new NonPrimitiveTypeMeta("object", {
            "attr1": new PrimitiveTypeMeta(1)
        }),
        "primitiveArrayAttributeName": new NonPrimitiveTypeMeta('array', new PrimitiveTypeMeta(1)),
        "stringAttributeName": new PrimitiveTypeMeta("some characters")
    }),
    "objectAttributeName": new NonPrimitiveTypeMeta("object", {
        "attr1": new PrimitiveTypeMeta(1)
    }),
    "primitiveArrayAttributeName": new NonPrimitiveTypeMeta("array", new PrimitiveTypeMeta(1)),
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
        ).toMatchObject({
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