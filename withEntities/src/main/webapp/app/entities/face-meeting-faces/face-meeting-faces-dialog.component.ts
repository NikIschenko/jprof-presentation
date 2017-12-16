import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FaceMeetingFaces } from './face-meeting-faces.model';
import { FaceMeetingFacesPopupService } from './face-meeting-faces-popup.service';
import { FaceMeetingFacesService } from './face-meeting-faces.service';

@Component({
    selector: 'jhi-face-meeting-faces-dialog',
    templateUrl: './face-meeting-faces-dialog.component.html'
})
export class FaceMeetingFacesDialogComponent implements OnInit {

    face: FaceMeetingFaces;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private faceService: FaceMeetingFacesService,
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
        if (this.face.id !== undefined) {
            this.subscribeToSaveResponse(
                this.faceService.update(this.face));
        } else {
            this.subscribeToSaveResponse(
                this.faceService.create(this.face));
        }
    }

    private subscribeToSaveResponse(result: Observable<FaceMeetingFaces>) {
        result.subscribe((res: FaceMeetingFaces) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FaceMeetingFaces) {
        this.eventManager.broadcast({ name: 'faceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-face-meeting-faces-popup',
    template: ''
})
export class FaceMeetingFacesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private facePopupService: FaceMeetingFacesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.facePopupService
                    .open(FaceMeetingFacesDialogComponent as Component, params['id']);
            } else {
                this.facePopupService
                    .open(FaceMeetingFacesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
