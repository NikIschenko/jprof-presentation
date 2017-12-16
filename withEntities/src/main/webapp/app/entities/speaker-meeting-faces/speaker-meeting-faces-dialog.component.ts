import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SpeakerMeetingFaces } from './speaker-meeting-faces.model';
import { SpeakerMeetingFacesPopupService } from './speaker-meeting-faces-popup.service';
import { SpeakerMeetingFacesService } from './speaker-meeting-faces.service';
import { MeetupMeetingFaces, MeetupMeetingFacesService } from '../meetup-meeting-faces';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-speaker-meeting-faces-dialog',
    templateUrl: './speaker-meeting-faces-dialog.component.html'
})
export class SpeakerMeetingFacesDialogComponent implements OnInit {

    speaker: SpeakerMeetingFaces;
    isSaving: boolean;

    meetups: MeetupMeetingFaces[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private speakerService: SpeakerMeetingFacesService,
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
        if (this.speaker.id !== undefined) {
            this.subscribeToSaveResponse(
                this.speakerService.update(this.speaker));
        } else {
            this.subscribeToSaveResponse(
                this.speakerService.create(this.speaker));
        }
    }

    private subscribeToSaveResponse(result: Observable<SpeakerMeetingFaces>) {
        result.subscribe((res: SpeakerMeetingFaces) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SpeakerMeetingFaces) {
        this.eventManager.broadcast({ name: 'speakerListModification', content: 'OK'});
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
    selector: 'jhi-speaker-meeting-faces-popup',
    template: ''
})
export class SpeakerMeetingFacesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private speakerPopupService: SpeakerMeetingFacesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.speakerPopupService
                    .open(SpeakerMeetingFacesDialogComponent as Component, params['id']);
            } else {
                this.speakerPopupService
                    .open(SpeakerMeetingFacesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
