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