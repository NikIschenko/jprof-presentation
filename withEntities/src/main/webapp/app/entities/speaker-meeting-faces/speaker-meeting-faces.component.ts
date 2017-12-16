import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SpeakerMeetingFaces } from './speaker-meeting-faces.model';
import { SpeakerMeetingFacesService } from './speaker-meeting-faces.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-speaker-meeting-faces',
    templateUrl: './speaker-meeting-faces.component.html'
})
export class SpeakerMeetingFacesComponent implements OnInit, OnDestroy {
speakers: SpeakerMeetingFaces[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private speakerService: SpeakerMeetingFacesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.speakerService.query().subscribe(
            (res: ResponseWrapper) => {
                this.speakers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSpeakers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SpeakerMeetingFaces) {
        return item.id;
    }
    registerChangeInSpeakers() {
        this.eventSubscriber = this.eventManager.subscribe('speakerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
