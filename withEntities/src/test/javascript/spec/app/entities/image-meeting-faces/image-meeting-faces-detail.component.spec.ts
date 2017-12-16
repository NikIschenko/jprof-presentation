/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { WithEntitiesTestModule } from '../../../test.module';
import { ImageMeetingFacesDetailComponent } from '../../../../../../main/webapp/app/entities/image-meeting-faces/image-meeting-faces-detail.component';
import { ImageMeetingFacesService } from '../../../../../../main/webapp/app/entities/image-meeting-faces/image-meeting-faces.service';
import { ImageMeetingFaces } from '../../../../../../main/webapp/app/entities/image-meeting-faces/image-meeting-faces.model';

describe('Component Tests', () => {

    describe('ImageMeetingFaces Management Detail Component', () => {
        let comp: ImageMeetingFacesDetailComponent;
        let fixture: ComponentFixture<ImageMeetingFacesDetailComponent>;
        let service: ImageMeetingFacesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [WithEntitiesTestModule],
                declarations: [ImageMeetingFacesDetailComponent],
                providers: [
                    ImageMeetingFacesService
                ]
            })
            .overrideTemplate(ImageMeetingFacesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ImageMeetingFacesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImageMeetingFacesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ImageMeetingFaces(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.image).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
