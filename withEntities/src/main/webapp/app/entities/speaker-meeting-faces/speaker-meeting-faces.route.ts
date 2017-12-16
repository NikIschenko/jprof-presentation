import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SpeakerMeetingFacesComponent } from './speaker-meeting-faces.component';
import { SpeakerMeetingFacesDetailComponent } from './speaker-meeting-faces-detail.component';
import { SpeakerMeetingFacesPopupComponent } from './speaker-meeting-faces-dialog.component';
import { SpeakerMeetingFacesDeletePopupComponent } from './speaker-meeting-faces-delete-dialog.component';

export const speakerRoute: Routes = [
    {
        path: 'speaker-meeting-faces',
        component: SpeakerMeetingFacesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.speaker.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'speaker-meeting-faces/:id',
        component: SpeakerMeetingFacesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.speaker.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const speakerPopupRoute: Routes = [
    {
        path: 'speaker-meeting-faces-new',
        component: SpeakerMeetingFacesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.speaker.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'speaker-meeting-faces/:id/edit',
        component: SpeakerMeetingFacesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.speaker.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'speaker-meeting-faces/:id/delete',
        component: SpeakerMeetingFacesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.speaker.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
