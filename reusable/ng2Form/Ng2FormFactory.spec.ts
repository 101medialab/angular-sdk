import 'jest';
import { FormBuilder } from '@angular/forms';
import { Ng2FormFactory as Factory } from './Ng2FormFactory';
import { expectedMapping } from '../ObjectAttributeTypeExtractor.spec';
import '../hb-es-shim';

describe('Ng2FormFactory.generateFormGroupByAttributeTypeObject', () => {
    it('should generate Angular form object and HBForm compatible template object from ObjectAttributeTypeExtractor mapping for a mixed renderType object with nested object array', () => {
        let expected = Factory.generateFormGroupByOATMapping(
            new FormBuilder(),
            expectedMapping
        );

        expect(
            expected
        ).toEqual({
            "templateConfig": {
                "anyAttributeName": {
                    "label": "Any Attribute Name",
                    "renderType": "text",
                },
                "booleanAttributeName": {
                    "label": "Boolean Attribute Name",
                    "renderType": "checkbox",
                    "type": "boolean",
                },
                "dateAttributeName": {
                    "label": "Date Attribute Name",
                    "renderType": "date",
                    "type": "date",
                },
                "objectArrayAttributeName": {
                    "label": "Object Array Attribute Name",
                    "renderType": "text",
                },
                "objectAttributeName": {
                    "label": "Object Attribute Name",
                    "renderType": "text",
                },
                "primitiveArrayAttributeName": {
                    "label": "Primitive Array Attribute Name",
                    "renderType": "text",
                },
                "stringAttributeName": {
                    "label": "String Attribute Name",
                    "renderType": "text",
                }
            }
        });
    });
});