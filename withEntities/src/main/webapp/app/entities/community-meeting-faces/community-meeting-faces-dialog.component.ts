import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CommunityMeetingFaces } from './community-meeting-faces.model';
import { CommunityMeetingFacesPopupService } from './community-meeting-faces-popup.service';
import { CommunityMeetingFacesService } from './community-meeting-faces.service';

@Component({
    selector: 'jhi-community-meeting-faces-dialog',
    templateUrl: './community-meeting-faces-dialog.component.html'
})
export class CommunityMeetingFacesDialogComponent implements OnInit {

    community: CommunityMeetingFaces;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private communityService: CommunityMeetingFacesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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
