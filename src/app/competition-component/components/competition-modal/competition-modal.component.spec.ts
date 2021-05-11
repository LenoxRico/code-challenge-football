import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CompetitionModalComponent } from './competition-modal.component';

describe('CompetitionModalComponent', () => {
  let component: CompetitionModalComponent;
  let fixture: ComponentFixture<CompetitionModalComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CompetitionModalComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
