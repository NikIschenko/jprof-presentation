/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { WithEntitiesTestModule } from '../../../test.module';
import { CommunityMeetingFacesDetailComponent } from '../../../../../../main/webapp/app/entities/community-meeting-faces/community-meeting-faces-detail.component';
import { CommunityMeetingFacesService } from '../../../../../../main/webapp/app/entities/community-meeting-faces/community-meeting-faces.service';
import { CommunityMeetingFaces } from '../../../../../../main/webapp/app/entities/community-meeting-faces/community-meeting-faces.model';

describe('Component Tests', () => {

    describe('CommunityMeetingFaces Management Detail Component', () => {
        let comp: CommunityMeetingFacesDetailComponent;
        let fixture: ComponentFixture<CommunityMeetingFacesDetailComponent>;
        let service: CommunityMeetingFacesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [WithEntitiesTestModule],
                declarations: [CommunityMeetingFacesDetailComponent],
                providers: [
                    CommunityMeetingFacesService
                ]
            })
            .overrideTemplate(CommunityMeetingFacesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommunityMeetingFacesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommunityMeetingFacesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new CommunityMeetingFaces(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.community).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
