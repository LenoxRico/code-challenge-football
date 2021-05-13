import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CompetitionModalTeamComponent } from './competition-modal-team.component';

describe('CompetitionModalTeamComponent', () => {
  let component: CompetitionModalTeamComponent;
  let fixture: ComponentFixture<CompetitionModalTeamComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CompetitionModalTeamComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionModalTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
