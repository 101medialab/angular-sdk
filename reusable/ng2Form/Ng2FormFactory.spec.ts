import 'jest';
import { FormBuilder, FormGroup } from '@angular/forms';
import { expectedMapping } from '../ObjectAttributeTypeExtractor.spec';
import {
    ObjectAttributeTypeExtractor as Extractor
} from '../ObjectAttributeTypeExtractor';
import { Ng2FormFactory as Factory } from './Ng2FormFactory';
import { FormConfig, SetupConfig } from './NgFormFactoryAnnotations';
import { FlexibleObjectArray } from "./decorators/FlexibleObjectArray";
import '../hb-es-shim';

describe('Ng2FormFactory.generateFormGroupByOATMapping', () => {
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

    it('should generate Angular form object and HBForm compatible template object from ObjectAttributeTypeExtractor mapping for a mixed renderType object with nested object array', () => {
        let expected = Factory.generateFormGroupByOATMapping(
            new FormBuilder(),
            expectedMapping
        );

        new FormGroup(expected.ngFormControl);

        expected.templateConfig.primitiveArrayAttributeName.add();
        expected.templateConfig.objectArrayAttributeName.add();
        expected.templateConfig.objectArrayAttributeName.children[0].objectArrayAttributeName.add();
        expected.templateConfig.objectArrayAttributeName.children[0].primitiveArrayAttributeName.add();

        expect(
            expected.templateConfig
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
                        "arrayType": "object",
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
                        "arrayType": "primitive",
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
                "arrayType": "object",
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

    it('should generate form for Mixed type Array', () => {
        class A {
            name: string = '';
        }

        class B {
            @SetupConfig()
            @FormConfig({
                defaultValue: ''
            })
            phoneNo: number = null;
        }

        class DecoratorDemo {
            @SetupConfig()
            @FlexibleObjectArray({
                objectDefinitions: [{
                    label: 'Type A',
                    structure: Extractor.generateMapping(
                        new A()
                    )
                }, {
                    label: 'Type B',
                    structure: Extractor.generateMapping(
                        new B()
                    )
                }]
            })
            attr: Array<A|B> = [];
        }

        let expected = Factory.generateFormGroupByOATMapping(
            new FormBuilder(),
            Extractor.generateMapping(
                new DecoratorDemo()
            )
        );

        new FormGroup(expected.ngFormControl);

        expected.templateConfig.attr.useConfig = 1;
        expected.templateConfig.attr.add();

        expected.templateConfig.attr.useConfig = 0;
        expected.templateConfig.attr.add();

        expect(
            expected.templateConfig.attr.children
        ).toMatchObject([{
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