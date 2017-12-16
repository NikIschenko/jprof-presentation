import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MeetupMeetingFacesComponent } from './meetup-meeting-faces.component';
import { MeetupMeetingFacesDetailComponent } from './meetup-meeting-faces-detail.component';
import { MeetupMeetingFacesPopupComponent } from './meetup-meeting-faces-dialog.component';
import { MeetupMeetingFacesDeletePopupComponent } from './meetup-meeting-faces-delete-dialog.component';

@Injectable()
export class MeetupMeetingFacesResolvePagingParams implements Resolve<any> {

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

export const meetupRoute: Routes = [
    {
        path: 'meetup-meeting-faces',
        component: MeetupMeetingFacesComponent,
        resolve: {
            'pagingParams': MeetupMeetingFacesResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.meetup.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'meetup-meeting-faces/:id',
        component: MeetupMeetingFacesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.meetup.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const meetupPopupRoute: Routes = [
    {
        path: 'meetup-meeting-faces-new',
        component: MeetupMeetingFacesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.meetup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'meetup-meeting-faces/:id/edit',
        component: MeetupMeetingFacesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.meetup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'meetup-meeting-faces/:id/delete',
        component: MeetupMeetingFacesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'withEntitiesApp.meetup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
