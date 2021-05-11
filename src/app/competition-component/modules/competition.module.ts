import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModule } from '@src/app/login/modules';
import { SharedModule } from '@src/app/shared/modules';

import { CompetitionListComponent } from '../components';
import { CompetitionModalComponent } from '../components/competition-modal';
import { CompetitionService } from '../services';
import { CompetitionRoutingModule } from './competition-routing.module';

@NgModule({
  declarations: [CompetitionListComponent, CompetitionModalComponent],
  entryComponents: [CompetitionListComponent, CompetitionModalComponent],
  imports: [CommonModule, CompetitionRoutingModule, SharedModule, LoginModule],
  providers: [CompetitionService],
})
export class CompetitionModule {}
