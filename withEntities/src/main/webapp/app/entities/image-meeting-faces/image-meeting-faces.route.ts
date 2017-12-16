import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ImageMeetingFacesComponent } from './image-meeting-faces.component';
import { ImageMeetingFacesDetailComponent } from './image-meeting-faces-detail.component';
import { ImageMeetingFacesPopupComponent } from './image-meeting-faces-dialog.component';
import { ImageMeetingFacesDeletePopupComponent } from './image-meeting-faces-delete-dialog.component';

@Injectable()
export class ImageMeetingFacesResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const imageRoute: Routes = [
    {
        path: 'image-meeting-faces',
        component: ImageMeetingFacesComponent,
        resolve: {
            'pagingParams': ImageMeetingFacesResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.image.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'image-meeting-faces/:id',
        component: ImageMeetingFacesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.image.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const imagePopupRoute: Routes = [
    {
        path: 'image-meeting-faces-new',
        component: ImageMeetingFacesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.image.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'image-meeting-faces/:id/edit',
        component: ImageMeetingFacesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.image.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'image-meeting-faces/:id/delete',
        component: ImageMeetingFacesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.image.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
