/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { WithEntitiesTestModule } from '../../../test.module';
import { MeetupMeetingFacesDialogComponent } from '../../../../../../main/webapp/app/entities/meetup-meeting-faces/meetup-meeting-faces-dialog.component';
import { MeetupMeetingFacesService } from '../../../../../../main/webapp/app/entities/meetup-meeting-faces/meetup-meeting-faces.service';
import { MeetupMeetingFaces } from '../../../../../../main/webapp/app/entities/meetup-meeting-faces/meetup-meeting-faces.model';
import { SpeakerMeetingFacesService } from '../../../../../../main/webapp/app/entities/speaker-meeting-faces';
import { ImageMeetingFacesService } from '../../../../../../main/webapp/app/entities/image-meeting-faces';

describe('Component Tests', () => {

    describe('MeetupMeetingFaces Management Dialog Component', () => {
        let comp: MeetupMeetingFacesDialogComponent;
        let fixture: ComponentFixture<MeetupMeetingFacesDialogComponent>;
        let service: MeetupMeetingFacesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [WithEntitiesTestModule],
                declarations: [MeetupMeetingFacesDialogComponent],
                providers: [
                    SpeakerMeetingFacesService,
                    ImageMeetingFacesService,
                    MeetupMeetingFacesService
                ]
            })
            .overrideTemplate(MeetupMeetingFacesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MeetupMeetingFacesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeetupMeetingFacesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MeetupMeetingFaces(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.meetup = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'meetupListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MeetupMeetingFaces();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.meetup = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'meetupListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
