import { JSONEditorFactory } from './JSONEditorFactory';
import "json-editor";
export declare class ExtendedJSONEditorFactory extends JSONEditorFactory {
    constructor({config, schema, data}: {
        config: any;
        schema: any;
        data: any;
    });
    setupExtendFields(): void;
}
