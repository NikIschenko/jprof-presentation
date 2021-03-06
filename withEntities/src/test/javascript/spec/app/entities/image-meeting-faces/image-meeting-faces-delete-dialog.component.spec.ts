/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { WithEntitiesTestModule } from '../../../test.module';
import { ImageMeetingFacesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/image-meeting-faces/image-meeting-faces-delete-dialog.component';
import { ImageMeetingFacesService } from '../../../../../../main/webapp/app/entities/image-meeting-faces/image-meeting-faces.service';

describe('Component Tests', () => {

    describe('ImageMeetingFaces Management Delete Component', () => {
        let comp: ImageMeetingFacesDeleteDialogComponent;
        let fixture: ComponentFixture<ImageMeetingFacesDeleteDialogComponent>;
        let service: ImageMeetingFacesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [WithEntitiesTestModule],
                declarations: [ImageMeetingFacesDeleteDialogComponent],
                providers: [
                    ImageMeetingFacesService
                ]
            })
            .overrideTemplate(ImageMeetingFacesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ImageMeetingFacesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImageMeetingFacesService);
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
