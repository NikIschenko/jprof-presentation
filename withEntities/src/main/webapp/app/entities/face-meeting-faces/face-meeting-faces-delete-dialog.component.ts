import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FaceMeetingFaces } from './face-meeting-faces.model';
import { FaceMeetingFacesPopupService } from './face-meeting-faces-popup.service';
import { FaceMeetingFacesService } from './face-meeting-faces.service';

@Component({
    selector: 'jhi-face-meeting-faces-delete-dialog',
    templateUrl: './face-meeting-faces-delete-dialog.component.html'
})
export class FaceMeetingFacesDeleteDialogComponent {

    face: FaceMeetingFaces;

    constructor(
        private faceService: FaceMeetingFacesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.faceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'faceListModification',
                content: 'Deleted an face'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-face-meeting-faces-delete-popup',
    template: ''
})
export class FaceMeetingFacesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private facePopupService: FaceMeetingFacesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.facePopupService
                .open(FaceMeetingFacesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
