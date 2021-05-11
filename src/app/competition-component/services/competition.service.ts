import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { Competition } from '../interfaces';

@Injectable()
export class CompetitionService {
  private competititonApi: string;
  constructor(private _http: HttpClient) {
    this.competititonApi = 'http://api.football-data.org/v2/competitions';
  }

  getCompetitions(filter = '', limit = 10, offset = 0): Observable<Competition[]> {
    const search = filter ? `&${filter}` : '';
    return this._http.get<Competition[]>(
      // `${this.competititonApi}limit=${limit}&offset=${offset}${search}`
      `${this.competititonApi}`
    );
  }

  getCompetitionDetail(competitionUrl: string): Observable<Competition> {
    return competitionUrl
      ? this._http.get<Competition>(`${competitionUrl}`)
      : throwError('error-url');
  }

  getCompetitionLocation(locationUrl: string): Observable<Competition> {
    return locationUrl
      ? this._http.get<Competition>(`${locationUrl}`)
      : throwError('error-url');
  }
}
