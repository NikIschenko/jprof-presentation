import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MeetupMeetingFaces } from './meetup-meeting-faces.model';
import { MeetupMeetingFacesPopupService } from './meetup-meeting-faces-popup.service';
import { MeetupMeetingFacesService } from './meetup-meeting-faces.service';
import { CommunityMeetingFaces, CommunityMeetingFacesService } from '../community-meeting-faces';
import { SpeakerMeetingFaces, SpeakerMeetingFacesService } from '../speaker-meeting-faces';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-meetup-meeting-faces-dialog',
    templateUrl: './meetup-meeting-faces-dialog.component.html'
})
export class MeetupMeetingFacesDialogComponent implements OnInit {

    meetup: MeetupMeetingFaces;
    isSaving: boolean;

    communities: CommunityMeetingFaces[];

    speakers: SpeakerMeetingFaces[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private meetupService: MeetupMeetingFacesService,
        private communityService: CommunityMeetingFacesService,
        private speakerService: SpeakerMeetingFacesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.communityService.query()
            .subscribe((res: ResponseWrapper) => { this.communities = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.speakerService.query()
            .subscribe((res: ResponseWrapper) => { this.speakers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.meetup.id !== undefined) {
            this.subscribeToSaveResponse(
                this.meetupService.update(this.meetup));
        } else {
            this.subscribeToSaveResponse(
                this.meetupService.create(this.meetup));
        }
    }

    private subscribeToSaveResponse(result: Observable<MeetupMeetingFaces>) {
        result.subscribe((res: MeetupMeetingFaces) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MeetupMeetingFaces) {
        this.eventManager.broadcast({ name: 'meetupListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCommunityById(index: number, item: CommunityMeetingFaces) {
        return item.id;
    }

    trackSpeakerById(index: number, item: SpeakerMeetingFaces) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-meetup-meeting-faces-popup',
    template: ''
})
export class MeetupMeetingFacesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private meetupPopupService: MeetupMeetingFacesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.meetupPopupService
                    .open(MeetupMeetingFacesDialogComponent as Component, params['id']);
            } else {
                this.meetupPopupService
                    .open(MeetupMeetingFacesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
