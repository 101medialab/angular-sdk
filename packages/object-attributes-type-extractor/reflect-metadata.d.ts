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
}