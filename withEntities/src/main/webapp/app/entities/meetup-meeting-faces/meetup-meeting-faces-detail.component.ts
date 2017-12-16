import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MeetupMeetingFaces } from './meetup-meeting-faces.model';
import { MeetupMeetingFacesService } from './meetup-meeting-faces.service';

@Component({
    selector: 'jhi-meetup-meeting-faces-detail',
    templateUrl: './meetup-meeting-faces-detail.component.html'
})
export class MeetupMeetingFacesDetailComponent implements OnInit, OnDestroy {

    meetup: MeetupMeetingFaces;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private meetupService: MeetupMeetingFacesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMeetups();
    }

    load(id) {
        this.meetupService.find(id).subscribe((meetup) => {
            this.meetup = meetup;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMeetups() {
        this.eventSubscriber = this.eventManager.subscribe(
            'meetupListModification',
            (response) => this.load(this.meetup.id)
        );
    }
}
