import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModule } from '@src/app/login/modules';
import { SharedModule } from '@src/app/shared/modules';
import {
  CompetitionDetailComponent,
  CompetitionModalTeamComponent,
  CompetitionListComponent,
} from '../components';
import { CompetitionService } from '../services';
import { CompetitionRoutingModule } from './competition-routing.module';

@NgModule({
  declarations: [
    CompetitionListComponent,
    CompetitionDetailComponent,
    CompetitionModalTeamComponent,
  ],
  entryComponents: [
    CompetitionListComponent,
    CompetitionDetailComponent,
    CompetitionModalTeamComponent,
  ],
  imports: [CommonModule, CompetitionRoutingModule, SharedModule, LoginModule],
  providers: [CompetitionService],
})
export class CompetitionModule {}
