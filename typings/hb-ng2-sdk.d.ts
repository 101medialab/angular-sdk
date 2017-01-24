interface Window {
    _hypebeast: any;
    prerenderReady: boolean;
    JSONEditor: any;
}

declare var window: Window;

interface String {
    capitalize(): string;
    toSnakecase(): string;
    toTitlecase(): string;
    slugify(): string;
}

interface JQuery {
    selectize(args: any): void;
}

interface HTMLElement {
    selectize: any;
}

declare var ga: any;