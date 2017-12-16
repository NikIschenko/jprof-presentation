import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { FaceMeetingFaces } from './face-meeting-faces.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FaceMeetingFacesService {

    private resourceUrl = SERVER_API_URL + 'api/faces';

    constructor(private http: Http) { }

    create(face: FaceMeetingFaces): Observable<FaceMeetingFaces> {
        const copy = this.convert(face);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(face: FaceMeetingFaces): Observable<FaceMeetingFaces> {
        const copy = this.convert(face);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<FaceMeetingFaces> {
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
     * Convert a returned JSON object to FaceMeetingFaces.
     */
    private convertItemFromServer(json: any): FaceMeetingFaces {
        const entity: FaceMeetingFaces = Object.assign(new FaceMeetingFaces(), json);
        return entity;
    }

    /**
     * Convert a FaceMeetingFaces to a JSON which can be sent to the server.
     */
    private convert(face: FaceMeetingFaces): FaceMeetingFaces {
        const copy: FaceMeetingFaces = Object.assign({}, face);
        return copy;
    }
}
