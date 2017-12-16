/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { WithEntitiesTestModule } from '../../../test.module';
import { SpeakerMeetingFacesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/speaker-meeting-faces/speaker-meeting-faces-delete-dialog.component';
import { SpeakerMeetingFacesService } from '../../../../../../main/webapp/app/entities/speaker-meeting-faces/speaker-meeting-faces.service';

describe('Component Tests', () => {

    describe('SpeakerMeetingFaces Management Delete Component', () => {
        let comp: SpeakerMeetingFacesDeleteDialogComponent;
        let fixture: ComponentFixture<SpeakerMeetingFacesDeleteDialogComponent>;
        let service: SpeakerMeetingFacesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [WithEntitiesTestModule],
                declarations: [SpeakerMeetingFacesDeleteDialogComponent],
                providers: [
                    SpeakerMeetingFacesService
                ]
            })
            .overrideTemplate(SpeakerMeetingFacesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SpeakerMeetingFacesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpeakerMeetingFacesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
