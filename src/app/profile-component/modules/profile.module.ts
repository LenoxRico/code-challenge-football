import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModule } from '@src/app/login/modules';
import { CompetitionService } from '@src/app/competition-component/services';
import { SharedModule } from '@src/app/shared/modules';

import { ProfileComponent } from '../components';
import { ProfileService } from '../services';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [ProfileComponent],
  entryComponents: [ProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, SharedModule, LoginModule],
  providers: [ProfileService, CompetitionService],
})
export class ProfileModule {}
