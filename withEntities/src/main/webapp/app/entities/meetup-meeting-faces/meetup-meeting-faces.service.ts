import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { MeetupMeetingFaces } from './meetup-meeting-faces.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MeetupMeetingFacesService {

    private resourceUrl = SERVER_API_URL + 'api/meetups';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(meetup: MeetupMeetingFaces): Observable<MeetupMeetingFaces> {
        const copy = this.convert(meetup);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(meetup: MeetupMeetingFaces): Observable<MeetupMeetingFaces> {
        const copy = this.convert(meetup);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<MeetupMeetingFaces> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to MeetupMeetingFaces.
     */
    private convertItemFromServer(json: any): MeetupMeetingFaces {
        const entity: MeetupMeetingFaces = Object.assign(new MeetupMeetingFaces(), json);
        entity.date = this.dateUtils
            .convertDateTimeFromServer(json.date);
        return entity;
    }

    /**
     * Convert a MeetupMeetingFaces to a JSON which can be sent to the server.
     */
    private convert(meetup: MeetupMeetingFaces): MeetupMeetingFaces {
        const copy: MeetupMeetingFaces = Object.assign({}, meetup);

        copy.date = this.dateUtils.toDate(meetup.date);
        return copy;
    }
}
