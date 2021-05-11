import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Observable, of } from 'rxjs';

import { Profile } from '../interfaces';

@Injectable()
export class ProfileService {
  private competitionApi: string;
  constructor(private _http: HttpClient) {
    this.competitionApi = 'https://pokeapi.co/api/v2/competition/';
  }

  getUser(): Observable<Profile> {
    const user = Cookie.get('access_token');
    const competition = user === 'user1' ? 'dragonite' : 'suicune';
    const response = { name: competition, url: `${this.competitionApi}${competition}` };
    return of(response);
  }
}
