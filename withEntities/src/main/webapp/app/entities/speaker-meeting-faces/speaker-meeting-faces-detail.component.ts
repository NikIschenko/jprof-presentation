import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { SpeakerMeetingFaces } from './speaker-meeting-faces.model';
import { SpeakerMeetingFacesService } from './speaker-meeting-faces.service';

@Component({
    selector: 'jhi-speaker-meeting-faces-detail',
    templateUrl: './speaker-meeting-faces-detail.component.html'
})
export class SpeakerMeetingFacesDetailComponent implements OnInit, OnDestroy {

    speaker: SpeakerMeetingFaces;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private speakerService: SpeakerMeetingFacesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSpeakers();
    }

    load(id) {
        this.speakerService.find(id).subscribe((speaker) => {
            this.speaker = speaker;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSpeakers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'speakerListModification',
            (response) => this.load(this.speaker.id)
        );
    }
}
