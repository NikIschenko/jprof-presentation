import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { SpeakerMeetingFaces } from './speaker-meeting-faces.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SpeakerMeetingFacesService {

    private resourceUrl = SERVER_API_URL + 'api/speakers';

    constructor(private http: Http) { }

    create(speaker: SpeakerMeetingFaces): Observable<SpeakerMeetingFaces> {
        const copy = this.convert(speaker);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(speaker: SpeakerMeetingFaces): Observable<SpeakerMeetingFaces> {
        const copy = this.convert(speaker);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<SpeakerMeetingFaces> {
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
     * Convert a returned JSON object to SpeakerMeetingFaces.
     */
    private convertItemFromServer(json: any): SpeakerMeetingFaces {
        const entity: SpeakerMeetingFaces = Object.assign(new SpeakerMeetingFaces(), json);
        return entity;
    }

    /**
     * Convert a SpeakerMeetingFaces to a JSON which can be sent to the server.
     */
    private convert(speaker: SpeakerMeetingFaces): SpeakerMeetingFaces {
        const copy: SpeakerMeetingFaces = Object.assign({}, speaker);
        return copy;
    }
}
