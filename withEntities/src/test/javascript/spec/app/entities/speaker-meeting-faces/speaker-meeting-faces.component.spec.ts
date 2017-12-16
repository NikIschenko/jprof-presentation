/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { WithEntitiesTestModule } from '../../../test.module';
import { SpeakerMeetingFacesComponent } from '../../../../../../main/webapp/app/entities/speaker-meeting-faces/speaker-meeting-faces.component';
import { SpeakerMeetingFacesService } from '../../../../../../main/webapp/app/entities/speaker-meeting-faces/speaker-meeting-faces.service';
import { SpeakerMeetingFaces } from '../../../../../../main/webapp/app/entities/speaker-meeting-faces/speaker-meeting-faces.model';

describe('Component Tests', () => {

    describe('SpeakerMeetingFaces Management Component', () => {
        let comp: SpeakerMeetingFacesComponent;
        let fixture: ComponentFixture<SpeakerMeetingFacesComponent>;
        let service: SpeakerMeetingFacesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [WithEntitiesTestModule],
                declarations: [SpeakerMeetingFacesComponent],
                providers: [
                    SpeakerMeetingFacesService
                ]
            })
            .overrideTemplate(SpeakerMeetingFacesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SpeakerMeetingFacesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpeakerMeetingFacesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new SpeakerMeetingFaces(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.speakers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
