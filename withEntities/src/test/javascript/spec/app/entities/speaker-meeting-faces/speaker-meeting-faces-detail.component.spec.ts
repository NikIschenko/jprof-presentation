/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { WithEntitiesTestModule } from '../../../test.module';
import { SpeakerMeetingFacesDetailComponent } from '../../../../../../main/webapp/app/entities/speaker-meeting-faces/speaker-meeting-faces-detail.component';
import { SpeakerMeetingFacesService } from '../../../../../../main/webapp/app/entities/speaker-meeting-faces/speaker-meeting-faces.service';
import { SpeakerMeetingFaces } from '../../../../../../main/webapp/app/entities/speaker-meeting-faces/speaker-meeting-faces.model';

describe('Component Tests', () => {

    describe('SpeakerMeetingFaces Management Detail Component', () => {
        let comp: SpeakerMeetingFacesDetailComponent;
        let fixture: ComponentFixture<SpeakerMeetingFacesDetailComponent>;
        let service: SpeakerMeetingFacesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [WithEntitiesTestModule],
                declarations: [SpeakerMeetingFacesDetailComponent],
                providers: [
                    SpeakerMeetingFacesService
                ]
            })
            .overrideTemplate(SpeakerMeetingFacesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SpeakerMeetingFacesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpeakerMeetingFacesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new SpeakerMeetingFaces(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.speaker).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
