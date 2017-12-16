import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { CommunityMeetingFaces } from './community-meeting-faces.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CommunityMeetingFacesService {

    private resourceUrl = SERVER_API_URL + 'api/communities';

    constructor(private http: Http) { }

    create(community: CommunityMeetingFaces): Observable<CommunityMeetingFaces> {
        const copy = this.convert(community);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(community: CommunityMeetingFaces): Observable<CommunityMeetingFaces> {
        const copy = this.convert(community);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CommunityMeetingFaces> {
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
     * Convert a returned JSON object to CommunityMeetingFaces.
     */
    private convertItemFromServer(json: any): CommunityMeetingFaces {
        const entity: CommunityMeetingFaces = Object.assign(new CommunityMeetingFaces(), json);
        return entity;
    }

    /**
     * Convert a CommunityMeetingFaces to a JSON which can be sent to the server.
     */
    private convert(community: CommunityMeetingFaces): CommunityMeetingFaces {
        const copy: CommunityMeetingFaces = Object.assign({}, community);
        return copy;
    }
}
