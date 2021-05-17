import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBar: MatSnackBar;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService, MatSnackBar, Overlay],
      imports: [BrowserAnimationsModule],
    });
    service = TestBed.get(NotificationService);
    snackBar = TestBed.get(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call showNotification', () => {
    spyOn(snackBar, 'openFromComponent').and.callThrough();
    service.showNotification('Test', true);
    expect(snackBar.openFromComponent).toHaveBeenCalled();
  });
});
