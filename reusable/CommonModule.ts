import {NgModule} from '@angular/core';
import {CommonModule as BaseCommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';

import CanDeactivateGuard from '../HbComponent/CanDeactivateGuard';

import {FileDropDirective} from 'ng2-file-upload/file-upload/file-drop.directive';
import {FileSelectDirective} from 'ng2-file-upload/file-upload/file-select.directive';

import {Angulartics2, Angulartics2On} from 'angulartics2';

import BackToTop from './directives/BackToTop';
import EmitWhenViewportChanges from './directives/EmitWhenViewportChanges';
import HbClass from './directives/HbClass';
import HbHeightModifier from './directives/HbHeightModifier';
import HbPerfectScroll from './directives/HbPerfectScroll';
import HbTooltip from './directives/HbTooltip';
import ProfileSelectize from './directives/ProfileSelectize';
import ScrollToWhen from './directives/ScrollToWhen';
import Selectize from './directives/Selectize';

import Backdrop from './ui/Backdrop.cpn';
import JSONEditorComponent from './ui/JSONEditor.cpn';
import UploaderComponent from './ui/Uploader.cpn';

import Default from './pipe/Default';
import Asset from './pipe/Asset';
import Photon from './pipe/Photon';
import Values from './pipe/Values';
import BaseDIContainer from '../HbComponent/BaseDIContainer';

import DummyDIContainer from './modules/DummyDIContainer';
import Status from './modules/status.svc';
import Config from './modules/Config';

let directivesAndPipes = [
    Angulartics2On,

    FileSelectDirective,
    FileDropDirective,

    BackToTop,
    EmitWhenViewportChanges,
    HbClass,
    HbHeightModifier,
    HbPerfectScroll,
    HbTooltip,
    ProfileSelectize,
    ScrollToWhen,
    Selectize,

    Backdrop,
    JSONEditorComponent,
    UploaderComponent,

    // Pipe
    Default,
    Asset,
    Photon,
    Values
];

@NgModule({
    imports: [
        BaseCommonModule,
        RouterModule,
        HttpModule
    ],
    providers: [
        BaseDIContainer,
        {
            provide: DummyDIContainer,
            useFactory: (baseDIContainer, config, status) => {
                return new DummyDIContainer(baseDIContainer, config, status);
            },
            deps: [BaseDIContainer, Config, Status]
        },
        [CanDeactivateGuard]
    ],
    declarations: directivesAndPipes,
    exports: directivesAndPipes.concat([
        BaseCommonModule,
        HttpModule,
        RouterModule
    ])
})
export default class CommonModule {}