/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { WithEntitiesTestModule } from '../../../test.module';
import { FaceMeetingFacesDetailComponent } from '../../../../../../main/webapp/app/entities/face-meeting-faces/face-meeting-faces-detail.component';
import { FaceMeetingFacesService } from '../../../../../../main/webapp/app/entities/face-meeting-faces/face-meeting-faces.service';
import { FaceMeetingFaces } from '../../../../../../main/webapp/app/entities/face-meeting-faces/face-meeting-faces.model';

describe('Component Tests', () => {

    describe('FaceMeetingFaces Management Detail Component', () => {
        let comp: FaceMeetingFacesDetailComponent;
        let fixture: ComponentFixture<FaceMeetingFacesDetailComponent>;
        let service: FaceMeetingFacesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [WithEntitiesTestModule],
                declarations: [FaceMeetingFacesDetailComponent],
                providers: [
                    FaceMeetingFacesService
                ]
            })
            .overrideTemplate(FaceMeetingFacesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FaceMeetingFacesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FaceMeetingFacesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new FaceMeetingFaces(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.face).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
