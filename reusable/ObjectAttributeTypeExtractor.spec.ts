import 'jest';
import {
    NonPrimitiveTypeMeta,
    ObjectAttributeTypeExtractor as Extractor,
    PrimitiveTypeMeta
} from './ObjectAttributeTypeExtractor';

export let expectedMapping = {
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
});