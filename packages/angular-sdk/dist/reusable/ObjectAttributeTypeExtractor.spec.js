import 'jest';
import { NonPrimitiveTypeMeta, ObjectAttributeTypeExtractor as Extractor, PrimitiveTypeMeta } from './ObjectAttributeTypeExtractor';
export var expectedMapping = new NonPrimitiveTypeMeta('object', {
    "anyAttributeName": new PrimitiveTypeMeta(null),
    "booleanAttributeName": new PrimitiveTypeMeta(true),
    "dateAttributeName": new NonPrimitiveTypeMeta('date', null, new Date('2017-08-24')),
    "objectArrayAttributeName": new NonPrimitiveTypeMeta('array', new NonPrimitiveTypeMeta("object", {
        "anyAttributeName": new PrimitiveTypeMeta(null),
        "booleanAttributeName": new PrimitiveTypeMeta(true),
        "dateAttributeName": new NonPrimitiveTypeMeta('date', null, new Date('2017-08-24')),
        "objectArrayAttributeName": new NonPrimitiveTypeMeta("array", new NonPrimitiveTypeMeta("object", {
            "attr1": new PrimitiveTypeMeta(1)
        })),
        "objectAttributeName": new NonPrimitiveTypeMeta("object", {
            "attr1": new PrimitiveTypeMeta(1)
        }),
        "primitiveArrayAttributeName": new NonPrimitiveTypeMeta('array', new PrimitiveTypeMeta(1)),
        "stringAttributeName": new PrimitiveTypeMeta("some characters")
    })),
    "objectAttributeName": new NonPrimitiveTypeMeta("object", {
        "attr1": new PrimitiveTypeMeta(1)
    }),
    "primitiveArrayAttributeName": new NonPrimitiveTypeMeta("array", new PrimitiveTypeMeta(1)),
    "stringAttributeName": new PrimitiveTypeMeta("some characters")
});
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
});
//# sourceMappingURL=ObjectAttributeTypeExtractor.spec.js.map