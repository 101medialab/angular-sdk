import 'jest';
import { FormBuilder } from '@angular/forms';
import { Ng2FormFactory as Factory } from './Ng2FormFactory';
import { expectedMapping } from '../ObjectAttributeTypeExtractor.spec';
import '../hb-es-shim';

describe('Ng2FormFactory.generateFormGroupByOATMapping', () => {
    it('pass', () => {
        let expected = Factory.generateFormGroupByOATMapping(
            new FormBuilder(),
            expectedMapping
        ).templateConfig;

        expect(
            expected
        ).toEqual(null);
    });

    it('should generate Angular form object and HBForm compatible template object from ObjectAttributeTypeExtractor mapping for a mixed renderType object with nested object array', () => {
        let expected = Factory.generateFormGroupByOATMapping(
            new FormBuilder(),
            expectedMapping
        ).templateConfig;

        expect(
            expected
        ).toMatchObject({
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
            "objectArrayAttributeName": {
                "children": [{
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
                    "objectArrayAttributeName": {
                        "children": [{
                            "attr1": {
                                "label": "Attr1",
                                "renderType": "number",
                                "type": "number"
                            }
                        }],
                        "groupType": "array",
                        "label": "Object Array Attribute Name"
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
                        "arrayType": "primitive",
                        "children": [{
                            "primitiveArrayAttributeName": {
                                "label": "Primitive Array Attribute Name",
                                "renderType": "number",
                                "type": "number"
                            }
                        }],
                        "groupType": "array",
                        "label": "Primitive Array Attribute Name",
                        "renderType": "array"
                    },
                    "stringAttributeName": {
                        "label": "String Attribute Name",
                        "renderType": "text",
                        "type": "string"
                    }
                }],
                "groupType": "array",
                "label": "Object Array Attribute Name"
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
});