import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../login/guards/auth.guard';
import { FavoriteComponent } from '../components';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: FavoriteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteRoutingModule {}
