/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { WithEntitiesTestModule } from '../../../test.module';
import { FaceMeetingFacesDialogComponent } from '../../../../../../main/webapp/app/entities/face-meeting-faces/face-meeting-faces-dialog.component';
import { FaceMeetingFacesService } from '../../../../../../main/webapp/app/entities/face-meeting-faces/face-meeting-faces.service';
import { FaceMeetingFaces } from '../../../../../../main/webapp/app/entities/face-meeting-faces/face-meeting-faces.model';

describe('Component Tests', () => {

    describe('FaceMeetingFaces Management Dialog Component', () => {
        let comp: FaceMeetingFacesDialogComponent;
        let fixture: ComponentFixture<FaceMeetingFacesDialogComponent>;
        let service: FaceMeetingFacesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [WithEntitiesTestModule],
                declarations: [FaceMeetingFacesDialogComponent],
                providers: [
                    FaceMeetingFacesService
                ]
            })
            .overrideTemplate(FaceMeetingFacesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FaceMeetingFacesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FaceMeetingFacesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FaceMeetingFaces(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.face = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'faceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FaceMeetingFaces();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.face = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'faceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
