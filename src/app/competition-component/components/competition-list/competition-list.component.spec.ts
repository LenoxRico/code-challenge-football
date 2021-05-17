import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '@src/app/shared/modules';
import { CoreService } from '@src/app/shared/services';
import { of } from 'rxjs';
import { CompetitionService } from '../../services';
import { CompetitionListComponent } from './competititon-list.component';

describe('CompetitionListComponent', () => {
  let fixture: ComponentFixture<CompetitionListComponent>;
  let component: CompetitionListComponent;
  let _coreServices: CoreService;
  let _competitionService: CompetitionService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CompetitionListComponent],
        imports: [
          HttpClientTestingModule,
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient],
            },
          }),
        ],
        providers: [
          { provide: MatDialog, useValue: {} },
          {
            provide: CompetitionService,
            useValue: {
              getCompetitions: (id) => of({ competitions: [], count: 0 }),
            },
          },
          { provide: CoreService, useValue: { displaySpinner: '' } },
        ],
      }).compileComponents();
      _coreServices = TestBed.get(CoreService);
      _competitionService = TestBed.get(CompetitionService);
      fixture = TestBed.createComponent(CompetitionListComponent);
      component = new CompetitionListComponent(
        _competitionService,
        _coreServices
      );
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial params', () => {
    spyOn(_competitionService, 'getCompetitions').and.callThrough();
    spyOn(_coreServices, 'displaySpinner').and.callThrough();
    component.ngOnInit();
    expect(_competitionService.getCompetitions).toHaveBeenCalled();
    expect(_coreServices.displaySpinner).toHaveBeenCalled();
  });
});
