import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@src/app/shared/modules';

import { LoginComponent } from '../components';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [LoginComponent],
  entryComponents: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, SharedModule, FormsModule],
})
export class LoginModule {}
