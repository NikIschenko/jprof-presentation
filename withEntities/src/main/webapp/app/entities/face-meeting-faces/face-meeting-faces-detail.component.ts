import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { FaceMeetingFaces } from './face-meeting-faces.model';
import { FaceMeetingFacesService } from './face-meeting-faces.service';

@Component({
    selector: 'jhi-face-meeting-faces-detail',
    templateUrl: './face-meeting-faces-detail.component.html'
})
export class FaceMeetingFacesDetailComponent implements OnInit, OnDestroy {

    face: FaceMeetingFaces;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private faceService: FaceMeetingFacesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFaces();
    }

    load(id) {
        this.faceService.find(id).subscribe((face) => {
            this.face = face;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFaces() {
        this.eventSubscriber = this.eventManager.subscribe(
            'faceListModification',
            (response) => this.load(this.face.id)
        );
    }
}
