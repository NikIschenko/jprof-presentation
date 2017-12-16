import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CommunityMeetingFaces } from './community-meeting-faces.model';
import { CommunityMeetingFacesService } from './community-meeting-faces.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-community-meeting-faces',
    templateUrl: './community-meeting-faces.component.html'
})
export class CommunityMeetingFacesComponent implements OnInit, OnDestroy {
communities: CommunityMeetingFaces[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private communityService: CommunityMeetingFacesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.communityService.query().subscribe(
            (res: ResponseWrapper) => {
                this.communities = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCommunities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CommunityMeetingFaces) {
        return item.id;
    }
    registerChangeInCommunities() {
        this.eventSubscriber = this.eventManager.subscribe('communityListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
