import {NgModule} from '@angular/core';
import {CommonModule as BaseCommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';

import {FileDropDirective} from 'ng2-file-upload/file-upload/file-drop.directive';
import {FileSelectDirective} from 'ng2-file-upload/file-upload/file-select.directive';

import {Angulartics2Module} from 'angulartics2';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';

import {
    CanDeactivateGuard,

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

    ShareButton,
    LogoutComponent,

    HbFlickity,
    HbCollectionFlickity,
    HbFlickityNav,

    Default,
    Asset,
    Photon,
    Values,
    MapToIterable,

    BaseDIContainer,
    DummyDIContainer,
    Status,
    Config
} from '../index';

export function DummyDIContainerFactory(baseDIContainer: BaseDIContainer, config: Config, status: Status) {
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

        Backdrop,
        JSONEditorComponent,
        UploaderComponent,

        ShareButton,
        LogoutComponent,

        HbFlickity,
        HbCollectionFlickity,
        HbFlickityNav,

        // Pipe
        Default,
        Asset,
        Photon,
        Values,
        MapToIterable
    ]
;

@NgModule({
    imports: [
        BaseCommonModule,
        RouterModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ])
    ],
    providers: [
        BaseDIContainer, {
            provide: DummyDIContainer,
            useFactory: DummyDIContainerFactory,
            deps: [BaseDIContainer, Config, Status]
        },
        [CanDeactivateGuard]
    ],
    declarations: directivesAndPipes,
    exports: [
        ...directivesAndPipes,
        BaseCommonModule,
        RouterModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        Angulartics2Module
    ]
})
export class CommonModule {}