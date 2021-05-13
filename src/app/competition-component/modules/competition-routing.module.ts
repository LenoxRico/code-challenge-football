import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../login/guards/auth.guard';
import {
  CompetitionDetailComponent,
  CompetitionListComponent,
} from '../components';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: CompetitionListComponent,
    pathMatch: 'full',
  },
  {
    path: 'details/:id',
    canActivate: [AuthGuard],
    component: CompetitionDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompetitionRoutingModule {}
