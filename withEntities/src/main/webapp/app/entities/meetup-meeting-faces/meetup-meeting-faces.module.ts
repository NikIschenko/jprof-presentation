import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WithEntitiesSharedModule } from '../../shared';
import {
    MeetupMeetingFacesService,
    MeetupMeetingFacesPopupService,
    MeetupMeetingFacesComponent,
    MeetupMeetingFacesDetailComponent,
    MeetupMeetingFacesDialogComponent,
    MeetupMeetingFacesPopupComponent,
    MeetupMeetingFacesDeletePopupComponent,
    MeetupMeetingFacesDeleteDialogComponent,
    meetupRoute,
    meetupPopupRoute,
    MeetupMeetingFacesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...meetupRoute,
    ...meetupPopupRoute,
];

@NgModule({
    imports: [
        WithEntitiesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MeetupMeetingFacesComponent,
        MeetupMeetingFacesDetailComponent,
        MeetupMeetingFacesDialogComponent,
        MeetupMeetingFacesDeleteDialogComponent,
        MeetupMeetingFacesPopupComponent,
        MeetupMeetingFacesDeletePopupComponent,
    ],
    entryComponents: [
        MeetupMeetingFacesComponent,
        MeetupMeetingFacesDialogComponent,
        MeetupMeetingFacesPopupComponent,
        MeetupMeetingFacesDeleteDialogComponent,
        MeetupMeetingFacesDeletePopupComponent,
    ],
    providers: [
        MeetupMeetingFacesService,
        MeetupMeetingFacesPopupService,
        MeetupMeetingFacesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WithEntitiesMeetupMeetingFacesModule {}
