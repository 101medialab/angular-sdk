import { ActivatedRoute } from '@angular/router';
import { BaseResourceComponent } from '../../HbComponent/BaseResourceComponent';
import { DummyDIContainer } from './DummyDIContainer';
export declare class MainComponent extends BaseResourceComponent {
    protected criteriaNames: any[];
    protected defaultCriteria: any;
    data: any;
    protected currentCriteria: any;
    protected nPerRow: number;
    private criteriaChangeEventDebounce;
    constructor(criteriaNames: any[], defaultCriteria: any, diContainer: DummyDIContainer, activatedRoute: ActivatedRoute);
    getMetaData(): {
        title: string;
        description: string;
    };
    onInit(): void;
    updateNPerRow(): void;
    loadMore(): void;
    resolveCriteriaFromRouteParams(): any;
    resolveRequestingNoOfResult(netCriteria: any, includePage: any): {
        num: number;
        offset: any;
    };
    onCriteriaChanged(includePage?: boolean): void;
    sendRequest(query: any, num: any, offset: any, includePage: any): void;
    onRequestDone(data: any, includePage: any, num: any): void;
    setupData(data: any): any;
    protected generateRoute(name: any, config?: any): Object;
    protected getNetCriteria(config?: {}): Array<string> | Object;
    updateCriteria(criteria: any, value: any): void;
    resetCriteria(): void;
}
