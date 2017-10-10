export declare class ProfileSearchMixin {
    static readonly fromSeparator: string;
    handleProfileSearchResponse(resp: Array<any>, callWhenDone: any): void;
    fixProfileSelectizeValue(slug: any): {
        type?: string;
        slug: string;
    };
    convertToProfileNameAndSlug(data: any, key: any): void;
}
