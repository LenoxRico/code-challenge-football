import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CompetitionService } from './competition.service';

describe('CompetitionService', () => {
  let service: CompetitionService;
  let _http: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CompetitionService,
        { provide: HttpClient, useValue: { get: (item) => item } },
      ],
    });
    service = TestBed.get(CompetitionService);
    _http = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getCompetitions', () => {
    const filter = '2008';
    spyOn(_http, 'get').and.callThrough();
    service.getCompetitions(filter);
    expect(_http.get).toHaveBeenCalled();
  });

  it('should call getCompetitionDetail', () => {
    const id = 2008;
    spyOn(_http, 'get').and.callThrough();
    service.getCompetitionDetail(id);
    expect(_http.get).toHaveBeenCalled();
  });

  it('should call getCompetitionTeam', () => {
    const id = 2008;
    spyOn(_http, 'get').and.callThrough();
    service.getCompetitionTeam(id);
    expect(_http.get).toHaveBeenCalled();
  });
});
