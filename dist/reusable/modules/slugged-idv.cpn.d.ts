import { ActivatedRoute } from '@angular/router';
import { IdvComponent } from './idv.cpn';
import { DummyDIContainer } from './DummyDIContainer';
export declare class SluggedIdvComponent extends IdvComponent {
    constructor(diContainer: DummyDIContainer, activatedRoute: ActivatedRoute);
    onInit(): void;
    resolveBaseUrl(slug: any): any;
    onResourceNotFound(error: any): void;
    getMetaData(): {
        title: string;
        description: any;
    };
}
