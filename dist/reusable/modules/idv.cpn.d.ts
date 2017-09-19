import { ActivatedRoute } from '@angular/router';
import { BaseResourceComponent } from '../../HbComponent/BaseResourceComponent';
import { DummyDIContainer } from './DummyDIContainer';
export declare class IdvComponent extends BaseResourceComponent {
    data: any;
    constructor(diContainer: DummyDIContainer, activatedRoute: ActivatedRoute);
    reset(): void;
    onInit(): void;
    setupData(data: any): any;
    onSetupData(data: any): void;
}
