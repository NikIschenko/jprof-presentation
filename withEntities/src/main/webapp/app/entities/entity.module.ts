import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { WithEntitiesCommunityMeetingFacesModule } from './community-meeting-faces/community-meeting-faces.module';
import { WithEntitiesMeetupMeetingFacesModule } from './meetup-meeting-faces/meetup-meeting-faces.module';
import { WithEntitiesImageMeetingFacesModule } from './image-meeting-faces/image-meeting-faces.module';
import { WithEntitiesFaceMeetingFacesModule } from './face-meeting-faces/face-meeting-faces.module';
import { WithEntitiesSpeakerMeetingFacesModule } from './speaker-meeting-faces/speaker-meeting-faces.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        WithEntitiesCommunityMeetingFacesModule,
        WithEntitiesMeetupMeetingFacesModule,
        WithEntitiesImageMeetingFacesModule,
        WithEntitiesFaceMeetingFacesModule,
        WithEntitiesSpeakerMeetingFacesModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WithEntitiesEntityModule {}
