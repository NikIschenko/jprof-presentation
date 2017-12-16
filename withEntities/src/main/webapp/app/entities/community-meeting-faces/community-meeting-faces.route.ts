import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CommunityMeetingFacesComponent } from './community-meeting-faces.component';
import { CommunityMeetingFacesDetailComponent } from './community-meeting-faces-detail.component';
import { CommunityMeetingFacesPopupComponent } from './community-meeting-faces-dialog.component';
import { CommunityMeetingFacesDeletePopupComponent } from './community-meeting-faces-delete-dialog.component';

export const communityRoute: Routes = [
    {
        path: 'community-meeting-faces',
        component: CommunityMeetingFacesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.community.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'community-meeting-faces/:id',
        component: CommunityMeetingFacesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.community.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const communityPopupRoute: Routes = [
    {
        path: 'community-meeting-faces-new',
        component: CommunityMeetingFacesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.community.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'community-meeting-faces/:id/edit',
        component: CommunityMeetingFacesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.community.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'community-meeting-faces/:id/delete',
        component: CommunityMeetingFacesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.community.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
