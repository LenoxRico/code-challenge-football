import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Notification } from '../../interfaces';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  message: string;
  success: boolean;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Notification) {
    this.message = this.data.messageValue;
    this.success = this.data.success;
  }
}
