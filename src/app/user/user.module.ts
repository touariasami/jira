import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { GoogleSigninDirective } from './google-signin.directive';

import { SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [LoginPageComponent, GoogleSigninDirective],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
