/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { WithEntitiesTestModule } from '../../../test.module';
import { FaceMeetingFacesComponent } from '../../../../../../main/webapp/app/entities/face-meeting-faces/face-meeting-faces.component';
import { FaceMeetingFacesService } from '../../../../../../main/webapp/app/entities/face-meeting-faces/face-meeting-faces.service';
import { FaceMeetingFaces } from '../../../../../../main/webapp/app/entities/face-meeting-faces/face-meeting-faces.model';

describe('Component Tests', () => {

    describe('FaceMeetingFaces Management Component', () => {
        let comp: FaceMeetingFacesComponent;
        let fixture: ComponentFixture<FaceMeetingFacesComponent>;
        let service: FaceMeetingFacesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [WithEntitiesTestModule],
                declarations: [FaceMeetingFacesComponent],
                providers: [
                    FaceMeetingFacesService
                ]
            })
            .overrideTemplate(FaceMeetingFacesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FaceMeetingFacesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FaceMeetingFacesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new FaceMeetingFaces(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.faces[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
