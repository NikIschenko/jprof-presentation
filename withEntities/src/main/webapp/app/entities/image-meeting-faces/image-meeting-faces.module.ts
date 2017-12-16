import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WithEntitiesSharedModule } from '../../shared';
import {
    ImageMeetingFacesService,
    ImageMeetingFacesPopupService,
    ImageMeetingFacesComponent,
    ImageMeetingFacesDetailComponent,
    ImageMeetingFacesDialogComponent,
    ImageMeetingFacesPopupComponent,
    ImageMeetingFacesDeletePopupComponent,
    ImageMeetingFacesDeleteDialogComponent,
    imageRoute,
    imagePopupRoute,
    ImageMeetingFacesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...imageRoute,
    ...imagePopupRoute,
];

@NgModule({
    imports: [
        WithEntitiesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ImageMeetingFacesComponent,
        ImageMeetingFacesDetailComponent,
        ImageMeetingFacesDialogComponent,
        ImageMeetingFacesDeleteDialogComponent,
        ImageMeetingFacesPopupComponent,
        ImageMeetingFacesDeletePopupComponent,
    ],
    entryComponents: [
        ImageMeetingFacesComponent,
        ImageMeetingFacesDialogComponent,
        ImageMeetingFacesPopupComponent,
        ImageMeetingFacesDeleteDialogComponent,
        ImageMeetingFacesDeletePopupComponent,
    ],
    providers: [
        ImageMeetingFacesService,
        ImageMeetingFacesPopupService,
        ImageMeetingFacesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WithEntitiesImageMeetingFacesModule {}
