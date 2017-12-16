/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { WithEntitiesTestModule } from '../../../test.module';
import { ImageMeetingFacesComponent } from '../../../../../../main/webapp/app/entities/image-meeting-faces/image-meeting-faces.component';
import { ImageMeetingFacesService } from '../../../../../../main/webapp/app/entities/image-meeting-faces/image-meeting-faces.service';
import { ImageMeetingFaces } from '../../../../../../main/webapp/app/entities/image-meeting-faces/image-meeting-faces.model';

describe('Component Tests', () => {

    describe('ImageMeetingFaces Management Component', () => {
        let comp: ImageMeetingFacesComponent;
        let fixture: ComponentFixture<ImageMeetingFacesComponent>;
        let service: ImageMeetingFacesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [WithEntitiesTestModule],
                declarations: [ImageMeetingFacesComponent],
                providers: [
                    ImageMeetingFacesService
                ]
            })
            .overrideTemplate(ImageMeetingFacesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ImageMeetingFacesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImageMeetingFacesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ImageMeetingFaces(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.images[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
