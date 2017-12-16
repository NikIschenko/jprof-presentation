/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { WithEntitiesTestModule } from '../../../test.module';
import { SpeakerMeetingFacesDialogComponent } from '../../../../../../main/webapp/app/entities/speaker-meeting-faces/speaker-meeting-faces-dialog.component';
import { SpeakerMeetingFacesService } from '../../../../../../main/webapp/app/entities/speaker-meeting-faces/speaker-meeting-faces.service';
import { SpeakerMeetingFaces } from '../../../../../../main/webapp/app/entities/speaker-meeting-faces/speaker-meeting-faces.model';
import { MeetupMeetingFacesService } from '../../../../../../main/webapp/app/entities/meetup-meeting-faces';

describe('Component Tests', () => {

    describe('SpeakerMeetingFaces Management Dialog Component', () => {
        let comp: SpeakerMeetingFacesDialogComponent;
        let fixture: ComponentFixture<SpeakerMeetingFacesDialogComponent>;
        let service: SpeakerMeetingFacesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [WithEntitiesTestModule],
                declarations: [SpeakerMeetingFacesDialogComponent],
                providers: [
                    MeetupMeetingFacesService,
                    SpeakerMeetingFacesService
                ]
            })
            .overrideTemplate(SpeakerMeetingFacesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SpeakerMeetingFacesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpeakerMeetingFacesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SpeakerMeetingFaces(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.speaker = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'speakerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SpeakerMeetingFaces();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.speaker = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'speakerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
