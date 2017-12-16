import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CommunityMeetingFaces } from './community-meeting-faces.model';
import { CommunityMeetingFacesPopupService } from './community-meeting-faces-popup.service';
import { CommunityMeetingFacesService } from './community-meeting-faces.service';

@Component({
    selector: 'jhi-community-meeting-faces-delete-dialog',
    templateUrl: './community-meeting-faces-delete-dialog.component.html'
})
export class CommunityMeetingFacesDeleteDialogComponent {

    community: CommunityMeetingFaces;

    constructor(
        private communityService: CommunityMeetingFacesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.communityService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'communityListModification',
                content: 'Deleted an community'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-community-meeting-faces-delete-popup',
    template: ''
})
export class CommunityMeetingFacesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private communityPopupService: CommunityMeetingFacesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.communityPopupService
                .open(CommunityMeetingFacesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
