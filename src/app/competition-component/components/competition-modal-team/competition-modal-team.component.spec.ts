import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { CoreService } from '@src/app/shared/services';
import { of } from 'rxjs';
import { Competition } from '../../interfaces';
import { CompetitionService } from '../../services';
import { CompetitionModalTeamComponent } from './competition-modal-team.component';

describe('CompetitionModalTeamComponent', () => {
  let fixture: ComponentFixture<CompetitionModalTeamComponent>;
  let component: CompetitionModalTeamComponent;
  let _coreServices: CoreService;
  let _competitionService: CompetitionService;
  let dialogRef: MatDialogRef<CompetitionModalTeamComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CompetitionModalTeamComponent],
        providers: [
          { provide: MatDialogRef, useValue: { close: (item) => item } },
          {
            provide: CompetitionService,
            useValue: { getCompetitionTeam: (id) => of(id) },
          },
          { provide: CoreService, useValue: { displaySpinner: '' } },
          { provide: MAT_SNACK_BAR_DATA, useValue: {} },
          { provide: MAT_DIALOG_DATA, useValue: {} },
        ],
      }).compileComponents();
      _coreServices = TestBed.get(CoreService);
      _competitionService = TestBed.get(CompetitionService);
      dialogRef = TestBed.get(MatDialogRef);
      fixture = TestBed.createComponent(CompetitionModalTeamComponent);
      component = new CompetitionModalTeamComponent(
        dialogRef,
        MAT_SNACK_BAR_DATA,
        _coreServices,
        _competitionService
      );
      component.competition = { id: null } as Competition;
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial params with Id', () => {
    component.competition.id = 2003;
    spyOn(_competitionService, 'getCompetitionTeam').and.callThrough();
    spyOn(_coreServices, 'displaySpinner').and.callThrough();
    component.ngOnInit();
    expect(_competitionService.getCompetitionTeam).toHaveBeenCalledWith(
      component.competition.id
    );
    expect(_coreServices.displaySpinner).toHaveBeenCalled();
  });

  it('should set initial params without Id', () => {
    component.competition.id = null;
    spyOn(component, 'cancel').and.callThrough();
    spyOn(dialogRef, 'close').and.callThrough();
    component.ngOnInit();
    expect(component.cancel).toHaveBeenCalled();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
