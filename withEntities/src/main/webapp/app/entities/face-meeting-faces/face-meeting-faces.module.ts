import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WithEntitiesSharedModule } from '../../shared';
import {
    FaceMeetingFacesService,
    FaceMeetingFacesPopupService,
    FaceMeetingFacesComponent,
    FaceMeetingFacesDetailComponent,
    FaceMeetingFacesDialogComponent,
    FaceMeetingFacesPopupComponent,
    FaceMeetingFacesDeletePopupComponent,
    FaceMeetingFacesDeleteDialogComponent,
    faceRoute,
    facePopupRoute,
} from './';

const ENTITY_STATES = [
    ...faceRoute,
    ...facePopupRoute,
];

@NgModule({
    imports: [
        WithEntitiesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FaceMeetingFacesComponent,
        FaceMeetingFacesDetailComponent,
        FaceMeetingFacesDialogComponent,
        FaceMeetingFacesDeleteDialogComponent,
        FaceMeetingFacesPopupComponent,
        FaceMeetingFacesDeletePopupComponent,
    ],
    entryComponents: [
        FaceMeetingFacesComponent,
        FaceMeetingFacesDialogComponent,
        FaceMeetingFacesPopupComponent,
        FaceMeetingFacesDeleteDialogComponent,
        FaceMeetingFacesDeletePopupComponent,
    ],
    providers: [
        FaceMeetingFacesService,
        FaceMeetingFacesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WithEntitiesFaceMeetingFacesModule {}
