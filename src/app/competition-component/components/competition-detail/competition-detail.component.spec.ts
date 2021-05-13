import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CompetitionDetailComponent } from './competition-detail.component';

describe('CompetitionDetailComponent', () => {
  let component: CompetitionDetailComponent;
  let fixture: ComponentFixture<CompetitionDetailComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CompetitionDetailComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
