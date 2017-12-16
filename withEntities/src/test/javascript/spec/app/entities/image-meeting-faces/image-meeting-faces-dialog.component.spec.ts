/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { WithEntitiesTestModule } from '../../../test.module';
import { ImageMeetingFacesDialogComponent } from '../../../../../../main/webapp/app/entities/image-meeting-faces/image-meeting-faces-dialog.component';
import { ImageMeetingFacesService } from '../../../../../../main/webapp/app/entities/image-meeting-faces/image-meeting-faces.service';
import { ImageMeetingFaces } from '../../../../../../main/webapp/app/entities/image-meeting-faces/image-meeting-faces.model';
import { MeetupMeetingFacesService } from '../../../../../../main/webapp/app/entities/meetup-meeting-faces';

describe('Component Tests', () => {

    describe('ImageMeetingFaces Management Dialog Component', () => {
        let comp: ImageMeetingFacesDialogComponent;
        let fixture: ComponentFixture<ImageMeetingFacesDialogComponent>;
        let service: ImageMeetingFacesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [WithEntitiesTestModule],
                declarations: [ImageMeetingFacesDialogComponent],
                providers: [
                    MeetupMeetingFacesService,
                    ImageMeetingFacesService
                ]
            })
            .overrideTemplate(ImageMeetingFacesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ImageMeetingFacesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImageMeetingFacesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ImageMeetingFaces(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.image = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'imageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ImageMeetingFaces();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.image = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'imageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
