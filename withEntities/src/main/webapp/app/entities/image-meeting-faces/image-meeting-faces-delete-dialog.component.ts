import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ImageMeetingFaces } from './image-meeting-faces.model';
import { ImageMeetingFacesPopupService } from './image-meeting-faces-popup.service';
import { ImageMeetingFacesService } from './image-meeting-faces.service';

@Component({
    selector: 'jhi-image-meeting-faces-delete-dialog',
    templateUrl: './image-meeting-faces-delete-dialog.component.html'
})
export class ImageMeetingFacesDeleteDialogComponent {

    image: ImageMeetingFaces;

    constructor(
        private imageService: ImageMeetingFacesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.imageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'imageListModification',
                content: 'Deleted an image'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-image-meeting-faces-delete-popup',
    template: ''
})
export class ImageMeetingFacesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private imagePopupService: ImageMeetingFacesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.imagePopupService
                .open(ImageMeetingFacesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
