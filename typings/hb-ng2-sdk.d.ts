interface Window {
    _hypebeast: any;
    prerenderReady: boolean;
    JSONEditor: any;
    CKEDITOR: any;
    moment: any;
    $: any;
}

declare var window: Window;

interface String {
    capitalize(): string;
    toSnakecase(): string;
    toTitlecase(): string;
    slugify(): string;
}

interface Array<T> {
    prepend(): void;
    contains(any): boolean;
    unique(): Array<T>;
}

interface DateConstructor {
    fromISO(args: string): Date;
    now(): number;
}

interface Date {
    yyyymmdd(separator: string): string;
}

declare var Exception: any;

interface JQuery {
    selectize(args: any): void;
}

interface HTMLElement {
    selectize: any;
}

declare var ga: any;

declare namespace Reflect {
    function defineMetadata(metadataKey: any, metadataValue: any, target: Object, targetKey?: string | symbol): void;
    function deleteMetadata(metadataKey: any, target: Object, targetKey?: string | symbol): boolean;
    function getMetadata(metadataKey: any, target: Object, targetKey?: string | symbol): any;
    function getMetadataKeys(target: Object, targetKey?: string | symbol): any[];
    function getOwnMetadata(metadataKey: any, target: Object, targetKey?: string | symbol): any;
    function getOwnMetadataKeys(target: Object, targetKey?: string | symbol): any[];
    function hasMetadata(metadataKey: any, target: Object, targetKey?: string | symbol): boolean;
    function hasOwnMetadata(metadataKey: any, target: Object, targetKey?: string | symbol): boolean;
    function metadata(metadataKey: any, metadataValue: any): {
        (target: Function): void;
        (target: Object, targetKey: string | symbol): void;
    };
};