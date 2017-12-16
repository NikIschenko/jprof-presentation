/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { WithEntitiesTestModule } from '../../../test.module';
import { CommunityMeetingFacesComponent } from '../../../../../../main/webapp/app/entities/community-meeting-faces/community-meeting-faces.component';
import { CommunityMeetingFacesService } from '../../../../../../main/webapp/app/entities/community-meeting-faces/community-meeting-faces.service';
import { CommunityMeetingFaces } from '../../../../../../main/webapp/app/entities/community-meeting-faces/community-meeting-faces.model';

describe('Component Tests', () => {

    describe('CommunityMeetingFaces Management Component', () => {
        let comp: CommunityMeetingFacesComponent;
        let fixture: ComponentFixture<CommunityMeetingFacesComponent>;
        let service: CommunityMeetingFacesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [WithEntitiesTestModule],
                declarations: [CommunityMeetingFacesComponent],
                providers: [
                    CommunityMeetingFacesService
                ]
            })
            .overrideTemplate(CommunityMeetingFacesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommunityMeetingFacesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommunityMeetingFacesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new CommunityMeetingFaces(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.communities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
