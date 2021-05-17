import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CoreService, NotificationService } from '@src/app/shared/services';
import { Cookie } from 'ng2-cookies';
import { AuthService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  src = 'assets/login.jpg';
  itemForm: FormGroup;

  constructor(
    private _authService: AuthService,
    private _translate: TranslateService,
    private _notificationService: NotificationService,
    private _route: ActivatedRoute,
    private _coreServices: CoreService
  ) {}

  ngOnInit(): void {
    Cookie.delete('access_token');
    this.prepareForm();
    this.validateParamUser();
  }

  prepareForm() {
    this.itemForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      // password: new FormControl('', Validators.required),
    });
  }

  validateParamUser() {
    this._route.queryParams.subscribe((params) => {
      if (params.username) {
        this.itemForm.controls.userName.setValue(params.username);
        // this.itemForm.controls.password.setValue(params.username);
        this.login();
      }
    });
  }

  login(): void {
    this._coreServices.displaySpinner(true);
    if (this.itemForm.valid) {
      const login = Object.assign({}, this.itemForm.value);
      this._authService.obtainAccessToken(login).subscribe(
        (_) => {
          this._coreServices.displaySpinner(false);
          this._translate
            .get(`shared.notification.success-login`)
            .subscribe((text) => {
              this._notificationService.showNotification(text, true);
            });
          this.prepareForm();
          this._authService.saveToken(login.userName);
        },
        (err) => {
          this._coreServices.displaySpinner(false);
          this._translate
            .get(`shared.notification.${err}`)
            .subscribe((text) => {
              this._notificationService.showNotification(text, false);
            });
        }
      );
    } else {
      this._coreServices.displaySpinner(false);
      this._translate
        .get('shared.notification.error-login')
        .subscribe((text) => {
          this._notificationService.showNotification(text, false);
        });
    }
  }
}
