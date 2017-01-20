import {NgModule} from '@angular/core';
import {CommonModule as BaseCommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';

import {CanDeactivateGuard} from '../HbComponent/CanDeactivateGuard';

import {FileDropDirective} from 'ng2-file-upload/file-upload/file-drop.directive';
import {FileSelectDirective} from 'ng2-file-upload/file-upload/file-select.directive';

import {Angulartics2, Angulartics2Module} from 'angulartics2';

import {BackToTop} from './directives/BackToTop';
import {EmitWhenViewportChanges} from './directives/EmitWhenViewportChanges';
import {HbClass} from './directives/HbClass';
import {HbHeightModifier} from './directives/HbHeightModifier';
import {HbPerfectScroll} from './directives/HbPerfectScroll';
import {HbTooltip} from './directives/HbTooltip';
import {ProfileSelectize} from './directives/ProfileSelectize';
import {ScrollToWhen} from './directives/ScrollToWhen';
import {Selectize} from './directives/Selectize';

import {HbFormArray} from './directives/HbFormArray';
import {HbFormObject} from './directives/HbFormObject';
import {HbFormWidget} from './directives/HbFormWidget';

import {Backdrop} from './ui/Backdrop.cpn';
import {JSONEditorComponent} from './ui/JSONEditor.cpn';
import {UploaderComponent} from './ui/Uploader.cpn';

import {Default} from './pipe/Default';
import {Asset} from './pipe/Asset';
import {Photon} from './pipe/Photon';
import {Values} from './pipe/Values';
import {MapToIterable} from './pipe/MapToIterable';
import {BaseDIContainer} from '../HbComponent/BaseDIContainer';

import {DummyDIContainer} from './modules/DummyDIContainer';
import {Status} from './modules/status.svc';
import {Config} from './modules/Config';

export function DummyDIContainerFactory (baseDIContainer, config, status) => {
    return new DummyDIContainer(baseDIContainer, config, status);
}

let directivesAndPipes = [
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

    HbFormArray,
    HbFormObject,
    HbFormWidget,

    Backdrop,
    JSONEditorComponent,
    UploaderComponent,

    // Pipe
    Default,
    Asset,
    Photon,
    Values,
    MapToIterable
];

let exports = [
    BaseCommonModule,
    RouterModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,

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

    HbFormArray,
    HbFormObject,
    HbFormWidget,

    Backdrop,
    JSONEditorComponent,
    UploaderComponent,

    // Pipe
    Default,
    Asset,
    Photon,
    Values,
    MapToIterable
];

@NgModule({
    imports: [
        BaseCommonModule,
        RouterModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        Angulartics2Module
    ],
    providers: [
        BaseDIContainer,
        {
            provide: DummyDIContainer,
            useFactory: DummyDIContainerFactory,
            deps: [BaseDIContainer, Config, Status]
        },
        [CanDeactivateGuard]
    ],
    declarations: directivesAndPipes,
    exports
})
export class CommonModule {}