import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WithEntitiesSharedModule } from '../../shared';
import {
    SpeakerMeetingFacesService,
    SpeakerMeetingFacesPopupService,
    SpeakerMeetingFacesComponent,
    SpeakerMeetingFacesDetailComponent,
    SpeakerMeetingFacesDialogComponent,
    SpeakerMeetingFacesPopupComponent,
    SpeakerMeetingFacesDeletePopupComponent,
    SpeakerMeetingFacesDeleteDialogComponent,
    speakerRoute,
    speakerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...speakerRoute,
    ...speakerPopupRoute,
];

@NgModule({
    imports: [
        WithEntitiesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SpeakerMeetingFacesComponent,
        SpeakerMeetingFacesDetailComponent,
        SpeakerMeetingFacesDialogComponent,
        SpeakerMeetingFacesDeleteDialogComponent,
        SpeakerMeetingFacesPopupComponent,
        SpeakerMeetingFacesDeletePopupComponent,
    ],
    entryComponents: [
        SpeakerMeetingFacesComponent,
        SpeakerMeetingFacesDialogComponent,
        SpeakerMeetingFacesPopupComponent,
        SpeakerMeetingFacesDeleteDialogComponent,
        SpeakerMeetingFacesDeletePopupComponent,
    ],
    providers: [
        SpeakerMeetingFacesService,
        SpeakerMeetingFacesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WithEntitiesSpeakerMeetingFacesModule {}
