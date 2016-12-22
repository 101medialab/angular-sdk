export class NavItem {
    constructor(
        private name: string,
        private args: (string | Array<string> | Object),
        private matrix: any = null,
        private query: any = null
    ) {}
}