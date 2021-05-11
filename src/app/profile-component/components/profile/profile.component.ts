import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CompetitionModalComponent } from '@src/app/competition-component/components/competition-modal';
import { Competition } from '@src/app/competition-component/interfaces';
import { CoreService } from '@src/app/shared/services';

import { Profile } from '../../interfaces';
import { ProfileService } from '../../services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userInformation: Profile;

  constructor(
    private dialog: MatDialog,
    private _profileService: ProfileService,
    private _router: Router,
    private _coreServices: CoreService
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this._coreServices.displaySpinner(true);
    this._profileService.getUser().subscribe((response: any) => {
      this.userInformation = response;
      this.openDialog(response);
      this._coreServices.displaySpinner(false);
    });
  }

  openDialog(competition: Competition): void {
    const dialogRef = this.dialog.open(CompetitionModalComponent, {
      width: '700px',
      data: {
        competition,
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((_) => this._router.navigate(['/competition-list']));
  }
}
