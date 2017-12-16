import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ImageMeetingFaces } from './image-meeting-faces.model';
import { ImageMeetingFacesPopupService } from './image-meeting-faces-popup.service';
import { ImageMeetingFacesService } from './image-meeting-faces.service';
import { FaceMeetingFaces, FaceMeetingFacesService } from '../face-meeting-faces';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-image-meeting-faces-dialog',
    templateUrl: './image-meeting-faces-dialog.component.html'
})
export class ImageMeetingFacesDialogComponent implements OnInit {

    image: ImageMeetingFaces;
    isSaving: boolean;

    faces: FaceMeetingFaces[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private imageService: ImageMeetingFacesService,
        private faceService: FaceMeetingFacesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.faceService.query()
            .subscribe((res: ResponseWrapper) => { this.faces = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.image.id !== undefined) {
            this.subscribeToSaveResponse(
                this.imageService.update(this.image));
        } else {
            this.subscribeToSaveResponse(
                this.imageService.create(this.image));
        }
    }

    private subscribeToSaveResponse(result: Observable<ImageMeetingFaces>) {
        result.subscribe((res: ImageMeetingFaces) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ImageMeetingFaces) {
        this.eventManager.broadcast({ name: 'imageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFaceById(index: number, item: FaceMeetingFaces) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-image-meeting-faces-popup',
    template: ''
})
export class ImageMeetingFacesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private imagePopupService: ImageMeetingFacesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.imagePopupService
                    .open(ImageMeetingFacesDialogComponent as Component, params['id']);
            } else {
                this.imagePopupService
                    .open(ImageMeetingFacesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
