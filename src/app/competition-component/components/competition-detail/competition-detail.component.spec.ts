import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from '@src/app/shared/services';
import { of } from 'rxjs';
import { Competition } from '../../interfaces';
import { CompetitionService } from '../../services';
import { CompetitionDetailComponent } from './competition-detail.component';

describe('CompetitionDetailComponent', () => {
  let fixture: ComponentFixture<CompetitionDetailComponent>;
  let component: CompetitionDetailComponent;
  let _coreServices: CoreService;
  let _competitionService: CompetitionService;
  let route: ActivatedRoute;
  let dialog: MatDialog;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CompetitionDetailComponent],
        providers: [
          {
            provide: MatDialog,
            useValue: {
              open: (item) => ({ item, afterClosed: (item) => of(item) }),
            },
          },
          { provide: ActivatedRoute, useValue: { params: of('') } },
          {
            provide: CompetitionService,
            useValue: {
              getCompetitionDetail: (id) => of({ season: [] }),
            },
          },
          { provide: CoreService, useValue: { displaySpinner: '' } },
        ],
      }).compileComponents();
      _coreServices = TestBed.get(CoreService);
      _competitionService = TestBed.get(CompetitionService);
      route = TestBed.get(ActivatedRoute);
      dialog = TestBed.get(MatDialog);
      fixture = TestBed.createComponent(CompetitionDetailComponent);
      component = new CompetitionDetailComponent(
        route,
        _coreServices,
        dialog,
        _competitionService
      );
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial params', () => {
    component.id = 2003;
    spyOn(_competitionService, 'getCompetitionDetail').and.callThrough();
    spyOn(_coreServices, 'displaySpinner').and.callThrough();
    component.ngOnInit();
    expect(_competitionService.getCompetitionDetail).toHaveBeenCalledWith(
      component.id
    );
    expect(_coreServices.displaySpinner).toHaveBeenCalled();
  });

  it('should call openDialog', () => {
    const competition = { id: 2003 } as Competition;
    spyOn(dialog, 'open').and.callThrough();
    component.openDialog(competition);
    expect(dialog.open).toHaveBeenCalled();
  });
});
