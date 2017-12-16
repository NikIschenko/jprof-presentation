import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CommunityMeetingFaces } from './community-meeting-faces.model';
import { CommunityMeetingFacesPopupService } from './community-meeting-faces-popup.service';
import { CommunityMeetingFacesService } from './community-meeting-faces.service';
import { MeetupMeetingFaces, MeetupMeetingFacesService } from '../meetup-meeting-faces';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-community-meeting-faces-dialog',
    templateUrl: './community-meeting-faces-dialog.component.html'
})
export class CommunityMeetingFacesDialogComponent implements OnInit {

    community: CommunityMeetingFaces;
    isSaving: boolean;

    meetups: MeetupMeetingFaces[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private communityService: CommunityMeetingFacesService,
        private meetupService: MeetupMeetingFacesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.meetupService.query()
            .subscribe((res: ResponseWrapper) => { this.meetups = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.community.id !== undefined) {
            this.subscribeToSaveResponse(
                this.communityService.update(this.community));
        } else {
            this.subscribeToSaveResponse(
                this.communityService.create(this.community));
        }
    }

    private subscribeToSaveResponse(result: Observable<CommunityMeetingFaces>) {
        result.subscribe((res: CommunityMeetingFaces) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CommunityMeetingFaces) {
        this.eventManager.broadcast({ name: 'communityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMeetupById(index: number, item: MeetupMeetingFaces) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-community-meeting-faces-popup',
    template: ''
})
export class CommunityMeetingFacesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private communityPopupService: CommunityMeetingFacesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.communityPopupService
                    .open(CommunityMeetingFacesDialogComponent as Component, params['id']);
            } else {
                this.communityPopupService
                    .open(CommunityMeetingFacesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
