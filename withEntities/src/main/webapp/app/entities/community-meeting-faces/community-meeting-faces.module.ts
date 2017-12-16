import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WithEntitiesSharedModule } from '../../shared';
import {
    CommunityMeetingFacesService,
    CommunityMeetingFacesPopupService,
    CommunityMeetingFacesComponent,
    CommunityMeetingFacesDetailComponent,
    CommunityMeetingFacesDialogComponent,
    CommunityMeetingFacesPopupComponent,
    CommunityMeetingFacesDeletePopupComponent,
    CommunityMeetingFacesDeleteDialogComponent,
    communityRoute,
    communityPopupRoute,
} from './';

const ENTITY_STATES = [
    ...communityRoute,
    ...communityPopupRoute,
];

@NgModule({
    imports: [
        WithEntitiesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CommunityMeetingFacesComponent,
        CommunityMeetingFacesDetailComponent,
        CommunityMeetingFacesDialogComponent,
        CommunityMeetingFacesDeleteDialogComponent,
        CommunityMeetingFacesPopupComponent,
        CommunityMeetingFacesDeletePopupComponent,
    ],
    entryComponents: [
        CommunityMeetingFacesComponent,
        CommunityMeetingFacesDialogComponent,
        CommunityMeetingFacesPopupComponent,
        CommunityMeetingFacesDeleteDialogComponent,
        CommunityMeetingFacesDeletePopupComponent,
    ],
    providers: [
        CommunityMeetingFacesService,
        CommunityMeetingFacesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WithEntitiesCommunityMeetingFacesModule {}
