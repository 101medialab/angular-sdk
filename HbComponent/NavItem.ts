export class NavItem {
    constructor(
        private name: string,
        private args: (string | Array),
        private matrix: {} = null,
        private query: {} = null
    ) {}
}