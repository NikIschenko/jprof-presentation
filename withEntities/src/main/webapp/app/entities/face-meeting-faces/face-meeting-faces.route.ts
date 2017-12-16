import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FaceMeetingFacesComponent } from './face-meeting-faces.component';
import { FaceMeetingFacesDetailComponent } from './face-meeting-faces-detail.component';
import { FaceMeetingFacesPopupComponent } from './face-meeting-faces-dialog.component';
import { FaceMeetingFacesDeletePopupComponent } from './face-meeting-faces-delete-dialog.component';

export const faceRoute: Routes = [
    {
        path: 'face-meeting-faces',
        component: FaceMeetingFacesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.face.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'face-meeting-faces/:id',
        component: FaceMeetingFacesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.face.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const facePopupRoute: Routes = [
    {
        path: 'face-meeting-faces-new',
        component: FaceMeetingFacesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.face.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'face-meeting-faces/:id/edit',
        component: FaceMeetingFacesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.face.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'face-meeting-faces/:id/delete',
        component: FaceMeetingFacesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.face.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
