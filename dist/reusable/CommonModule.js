import { NgModule } from '@angular/core';
import { CommonModule as BaseCommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FileDropDirective } from 'ng2-file-upload/file-upload/file-drop.directive';
import { FileSelectDirective } from 'ng2-file-upload/file-upload/file-select.directive';
import { Angulartics2Module } from 'angulartics2';
import { CanDeactivateGuard, BackToTop, EmitWhenViewportChanges, HbClass, HbHeightModifier, HbPerfectScroll, HbTooltip, ProfileSelectize, ScrollToWhen, Selectize, Backdrop, JSONEditorComponent, UploaderComponent, ShareButton, LogoutComponent, HbFlickity, HbCollectionFlickity, HbFlickityNav, Default, Asset, Photon, Values, MapToIterable, BaseDIContainer, DummyDIContainer, Status, Config } from '../index';
export function DummyDIContainerFactory(baseDIContainer, config, status) {
    return new DummyDIContainer(baseDIContainer, config, status);
}
var directivesAndPipes = [
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
];
var CommonModule = (function () {
    function CommonModule() {
    }
    CommonModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BaseCommonModule,
                        RouterModule,
                        HttpModule,
                        FormsModule,
                        ReactiveFormsModule,
                        Angulartics2Module
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
                    exports: directivesAndPipes.concat([
                        BaseCommonModule,
                        RouterModule,
                        HttpModule,
                        FormsModule,
                        ReactiveFormsModule,
                        Angulartics2Module
                    ])
                },] },
    ];
    /** @nocollapse */
    CommonModule.ctorParameters = function () { return []; };
    return CommonModule;
}());
export { CommonModule };
//# sourceMappingURL=CommonModule.js.map