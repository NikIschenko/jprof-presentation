/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { WithEntitiesTestModule } from '../../../test.module';
import { MeetupMeetingFacesComponent } from '../../../../../../main/webapp/app/entities/meetup-meeting-faces/meetup-meeting-faces.component';
import { MeetupMeetingFacesService } from '../../../../../../main/webapp/app/entities/meetup-meeting-faces/meetup-meeting-faces.service';
import { MeetupMeetingFaces } from '../../../../../../main/webapp/app/entities/meetup-meeting-faces/meetup-meeting-faces.model';

describe('Component Tests', () => {

    describe('MeetupMeetingFaces Management Component', () => {
        let comp: MeetupMeetingFacesComponent;
        let fixture: ComponentFixture<MeetupMeetingFacesComponent>;
        let service: MeetupMeetingFacesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [WithEntitiesTestModule],
                declarations: [MeetupMeetingFacesComponent],
                providers: [
                    MeetupMeetingFacesService
                ]
            })
            .overrideTemplate(MeetupMeetingFacesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MeetupMeetingFacesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeetupMeetingFacesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new MeetupMeetingFaces(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.meetups[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
