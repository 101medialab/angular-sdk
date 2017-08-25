import 'jest';
import { FormBuilder } from '@angular/forms';
import { Ng2FormFactory as Factory } from './Ng2FormFactory';
import { expectedMapping } from '../ObjectAttributeTypeExtractor.spec';
import '../hb-es-shim';

describe('Ng2FormFactory.generateFormGroupByAttributeTypeObject', () => {
    it('should generate Angular form object and HBForm compatible template object from ObjectAttributeTypeExtractor mapping for a mixed type object with nested object array', () => {
        expect(
            Factory.generateFormGroupByAttributeTypeObject(
                new FormBuilder(),
                expectedMapping
            )
        ).toEqual({});
    });
});