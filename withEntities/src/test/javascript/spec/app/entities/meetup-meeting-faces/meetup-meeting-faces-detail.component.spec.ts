/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { WithEntitiesTestModule } from '../../../test.module';
import { MeetupMeetingFacesDetailComponent } from '../../../../../../main/webapp/app/entities/meetup-meeting-faces/meetup-meeting-faces-detail.component';
import { MeetupMeetingFacesService } from '../../../../../../main/webapp/app/entities/meetup-meeting-faces/meetup-meeting-faces.service';
import { MeetupMeetingFaces } from '../../../../../../main/webapp/app/entities/meetup-meeting-faces/meetup-meeting-faces.model';

describe('Component Tests', () => {

    describe('MeetupMeetingFaces Management Detail Component', () => {
        let comp: MeetupMeetingFacesDetailComponent;
        let fixture: ComponentFixture<MeetupMeetingFacesDetailComponent>;
        let service: MeetupMeetingFacesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [WithEntitiesTestModule],
                declarations: [MeetupMeetingFacesDetailComponent],
                providers: [
                    MeetupMeetingFacesService
                ]
            })
            .overrideTemplate(MeetupMeetingFacesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MeetupMeetingFacesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeetupMeetingFacesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new MeetupMeetingFaces(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.meetup).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
