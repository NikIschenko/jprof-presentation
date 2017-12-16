/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { WithEntitiesTestModule } from '../../../test.module';
import { CommunityMeetingFacesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/community-meeting-faces/community-meeting-faces-delete-dialog.component';
import { CommunityMeetingFacesService } from '../../../../../../main/webapp/app/entities/community-meeting-faces/community-meeting-faces.service';

describe('Component Tests', () => {

    describe('CommunityMeetingFaces Management Delete Component', () => {
        let comp: CommunityMeetingFacesDeleteDialogComponent;
        let fixture: ComponentFixture<CommunityMeetingFacesDeleteDialogComponent>;
        let service: CommunityMeetingFacesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [WithEntitiesTestModule],
                declarations: [CommunityMeetingFacesDeleteDialogComponent],
                providers: [
                    CommunityMeetingFacesService
                ]
            })
            .overrideTemplate(CommunityMeetingFacesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommunityMeetingFacesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommunityMeetingFacesService);
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
