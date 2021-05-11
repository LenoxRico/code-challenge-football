import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '@src/app/shared/services';

import { ModalData, Competition } from '../../interfaces';
import { CompetitionService } from '../../services';

@Component({
  selector: 'app-competition-modal',
  templateUrl: './competition-modal.component.html',
  styleUrls: ['./competition-modal.component.scss'],
})
export class CompetitionModalComponent implements OnInit {
  competitionUrl: Competition;
  competition: Competition;
  competitionLocation: any;

  constructor(
    public dialogRef: MatDialogRef<CompetitionModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ModalData,
    private _coreServices: CoreService,
    private _competitionService: CompetitionService
  ) {
    this.competitionUrl = this.data.competition;
  }

  ngOnInit(): void {
    if (this.competitionUrl.url) {
      this.getCompetitionDetail(this.competitionUrl.url);
    } else {
      this.cancel();
    }
  }

  getCompetitionDetail(competitionUrl) {
    this._coreServices.displaySpinner(true);
    this._competitionService
      .getCompetitionDetail(competitionUrl)
      .subscribe((response: any) => {
        this.competition = response;
        this._coreServices.displaySpinner(false);
        this._competitionService
          .getCompetitionLocation(response.location_area_encounters)
          .subscribe((location: any) => {
            this.competitionLocation = location.length ? location : false;
          });
      });
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
