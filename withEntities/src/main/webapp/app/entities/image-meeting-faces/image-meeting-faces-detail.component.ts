import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ImageMeetingFaces } from './image-meeting-faces.model';
import { ImageMeetingFacesService } from './image-meeting-faces.service';

@Component({
    selector: 'jhi-image-meeting-faces-detail',
    templateUrl: './image-meeting-faces-detail.component.html'
})
export class ImageMeetingFacesDetailComponent implements OnInit, OnDestroy {

    image: ImageMeetingFaces;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private imageService: ImageMeetingFacesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInImages();
    }

    load(id) {
        this.imageService.find(id).subscribe((image) => {
            this.image = image;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInImages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'imageListModification',
            (response) => this.load(this.image.id)
        );
    }
}
