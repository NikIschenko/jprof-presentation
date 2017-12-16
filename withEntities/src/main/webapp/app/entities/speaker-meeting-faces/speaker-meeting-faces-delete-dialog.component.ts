import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SpeakerMeetingFaces } from './speaker-meeting-faces.model';
import { SpeakerMeetingFacesPopupService } from './speaker-meeting-faces-popup.service';
import { SpeakerMeetingFacesService } from './speaker-meeting-faces.service';

@Component({
    selector: 'jhi-speaker-meeting-faces-delete-dialog',
    templateUrl: './speaker-meeting-faces-delete-dialog.component.html'
})
export class SpeakerMeetingFacesDeleteDialogComponent {

    speaker: SpeakerMeetingFaces;

    constructor(
        private speakerService: SpeakerMeetingFacesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.speakerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'speakerListModification',
                content: 'Deleted an speaker'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-speaker-meeting-faces-delete-popup',
    template: ''
})
export class SpeakerMeetingFacesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private speakerPopupService: SpeakerMeetingFacesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.speakerPopupService
                .open(SpeakerMeetingFacesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
