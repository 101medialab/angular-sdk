import 'jest';
import { NonPrimitiveTypeMeta, PrimitiveTypeMeta } from './ObjectAttributeTypeExtractor';
export declare const expectedMapping: {
    "anyAttributeName": PrimitiveTypeMeta;
    "booleanAttributeName": PrimitiveTypeMeta;
    "dateAttributeName": NonPrimitiveTypeMeta;
    "objectArrayAttributeName": {
        "_mapping": {
            "anyAttributeName": PrimitiveTypeMeta;
            "booleanAttributeName": PrimitiveTypeMeta;
            "dateAttributeName": NonPrimitiveTypeMeta;
            "objectArrayAttributeName": {
                "_mapping": {
                    "attr1": PrimitiveTypeMeta;
                };
                "_type": string;
            };
            "objectAttributeName": {
                "_mapping": {
                    "attr1": PrimitiveTypeMeta;
                };
                "_type": string;
            };
            "primitiveArrayAttributeName": NonPrimitiveTypeMeta;
            "stringAttributeName": PrimitiveTypeMeta;
        };
        "_type": string;
    };
    "objectAttributeName": {
        "_mapping": {
            "attr1": PrimitiveTypeMeta;
        };
        "_type": string;
    };
    "primitiveArrayAttributeName": {
        "_mapping": PrimitiveTypeMeta;
        "_type": string;
    };
    "stringAttributeName": PrimitiveTypeMeta;
};
