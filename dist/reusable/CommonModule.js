import { NgModule } from '@angular/core';
import { CommonModule as BaseCommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { CanDeactivateGuard, BackToTop, EmitWhenViewportChanges, HbClass, HbHeightModifier, HbPerfectScroll, HbTooltip, ProfileSelectize, ScrollToWhen, Selectize, Backdrop, JSONEditorComponent, UploaderComponent, ShareButton, LogoutComponent, HbFlickity, HbCollectionFlickity, HbFlickityNav, Default, Asset, Photon, Values, MapToIterable, BaseDIContainer, DummyDIContainer, Status, Config } from '../index';
import { FileUploadModule } from "ng2-file-upload";
export function DummyDIContainerFactory(baseDIContainer, config, status) {
    return new DummyDIContainer(baseDIContainer, config, status);
}
var directivesAndPipes = [
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
    MapToIterable
];
var CommonModule = /** @class */ (function () {
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
                        FileUploadModule,
                        Angulartics2Module.forRoot([Angulartics2GoogleAnalytics])
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
    return CommonModule;
}());
export { CommonModule };
//# sourceMappingURL=CommonModule.js.map