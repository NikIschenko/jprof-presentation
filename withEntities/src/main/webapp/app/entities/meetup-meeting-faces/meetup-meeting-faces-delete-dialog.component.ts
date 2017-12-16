import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MeetupMeetingFaces } from './meetup-meeting-faces.model';
import { MeetupMeetingFacesPopupService } from './meetup-meeting-faces-popup.service';
import { MeetupMeetingFacesService } from './meetup-meeting-faces.service';

@Component({
    selector: 'jhi-meetup-meeting-faces-delete-dialog',
    templateUrl: './meetup-meeting-faces-delete-dialog.component.html'
})
export class MeetupMeetingFacesDeleteDialogComponent {

    meetup: MeetupMeetingFaces;

    constructor(
        private meetupService: MeetupMeetingFacesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.meetupService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'meetupListModification',
                content: 'Deleted an meetup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-meetup-meeting-faces-delete-popup',
    template: ''
})
export class MeetupMeetingFacesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private meetupPopupService: MeetupMeetingFacesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.meetupPopupService
                .open(MeetupMeetingFacesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
