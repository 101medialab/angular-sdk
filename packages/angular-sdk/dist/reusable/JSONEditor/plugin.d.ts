import { BaseResource } from '../../HbComponent/BaseResource';
import 'selectize';
export declare function setupProfileSelectizeField(options: {
    field;
    resource: BaseResource;
    list: Array<any>;
    onSetupDone?: (cpn) => void;
    selectizeOptions?: any;
    apiEndPoint?: string;
    resolveResponse?: (resp, callWhenDone) => void;
    manuallySetValue?: boolean;
}): void;
export declare function setupProfileSelectize(input: any, options: {
    resource: BaseResource;
    list: Array<any>;
    selectizeOptions?: any;
    apiEndPoint?: string;
    resolveResponse?: (resp, callWhenDone, instance) => void;
}): any;
