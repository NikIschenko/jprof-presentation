import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { CommunityMeetingFaces } from './community-meeting-faces.model';
import { CommunityMeetingFacesService } from './community-meeting-faces.service';

@Component({
    selector: 'jhi-community-meeting-faces-detail',
    templateUrl: './community-meeting-faces-detail.component.html'
})
export class CommunityMeetingFacesDetailComponent implements OnInit, OnDestroy {

    community: CommunityMeetingFaces;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private communityService: CommunityMeetingFacesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCommunities();
    }

    load(id) {
        this.communityService.find(id).subscribe((community) => {
            this.community = community;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCommunities() {
        this.eventSubscriber = this.eventManager.subscribe(
            'communityListModification',
            (response) => this.load(this.community.id)
        );
    }
}
