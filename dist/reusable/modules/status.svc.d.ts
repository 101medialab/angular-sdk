import { BaseStatus } from '../../HbComponent/BaseStatus';
import { EventDispatcher } from '../../HbComponent/EventDispatcher';
import { Resource } from './resource.svc';
import { Bindable } from '../Bindable';
export declare class Status extends BaseStatus {
    private static appEnv;
    private deviceType;
    private deviceHeight;
    private $win;
    private $head;
    private $metas;
    private dataForNextRoute;
    private _isEditor;
    isEditor: boolean;
    constructor(eventDispatcher: EventDispatcher, resource: Resource);
    passDataToNextRoute(data: any): void;
    getDataPassingToNextRoute(): any;
    getDataPassedFromPreviousRoute(): any;
    /**
     * Format:
     * {
     *     name: 'content'
     *     name: {
     *         attr1 : 'value1',
     *         attr2 : 'value2'
     *     }
     * }
     */
    setMetaData(attrs: any): void;
    private onWindowResize();
    static readonly APP_ENV: boolean;
    readonly DEVICE_TYPE: Bindable;
    readonly WIN_HEIGHT: Bindable;
}
