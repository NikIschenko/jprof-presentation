/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { WithEntitiesTestModule } from '../../../test.module';
import { CommunityMeetingFacesDialogComponent } from '../../../../../../main/webapp/app/entities/community-meeting-faces/community-meeting-faces-dialog.component';
import { CommunityMeetingFacesService } from '../../../../../../main/webapp/app/entities/community-meeting-faces/community-meeting-faces.service';
import { CommunityMeetingFaces } from '../../../../../../main/webapp/app/entities/community-meeting-faces/community-meeting-faces.model';
import { MeetupMeetingFacesService } from '../../../../../../main/webapp/app/entities/meetup-meeting-faces';

describe('Component Tests', () => {

    describe('CommunityMeetingFaces Management Dialog Component', () => {
        let comp: CommunityMeetingFacesDialogComponent;
        let fixture: ComponentFixture<CommunityMeetingFacesDialogComponent>;
        let service: CommunityMeetingFacesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [WithEntitiesTestModule],
                declarations: [CommunityMeetingFacesDialogComponent],
                providers: [
                    MeetupMeetingFacesService,
                    CommunityMeetingFacesService
                ]
            })
            .overrideTemplate(CommunityMeetingFacesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommunityMeetingFacesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommunityMeetingFacesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CommunityMeetingFaces(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.community = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'communityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CommunityMeetingFaces();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.community = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'communityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
