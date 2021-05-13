import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Competition, CompetitionResponse } from '../interfaces';

@Injectable()
export class CompetitionService {
  private competititonApi: string;
  constructor(private _http: HttpClient) {
    this.competititonApi = 'https://api.football-data.org/v2/competitions';
  }

  getCompetitions(
    filter = '',
    limit = 10,
    offset = 0
  ): Observable<CompetitionResponse> {
    const search = filter ? `year=${filter}` : '';
    return this._http.get<CompetitionResponse>(
      `${this.competititonApi}?${search}`
    );
  }

  getCompetitionDetail(id: number): Observable<Competition> {
    return id
      ? this._http.get<Competition>(`${this.competititonApi}/${id}`)
      : throwError('error-url');
  }

  getCompetitionTeam(id: number): Observable<Competition> {
    return id
      ? this._http.get<Competition>(`${this.competititonApi}/${id}/teams`)
      : throwError('error-url');
  }
}
