import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

import SUBSCRIPTIONS from '../../../assets/subscriptionsData.js';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  subscriptions: Array<string>;
  name: string;
  country: string;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.storageService.getName().subscribe((name) => {
      if (name) {
        this.name = name;

        this.storageService.getSubscriptions().subscribe((subs) => {
          if (subs) {
            this.subscriptions = subs;
          } else {
            this.subscriptions = [];
          }
        });

        this.storageService.getCountry().subscribe((country) => {
          if (country) {
            this.country = country;
          } else {
            this.country = '';
          }
        });
      }
    });
  }

  async addSubscription() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Select subscriptions';
    alert.buttons = ['Cancel', 'OK'];
    alert.inputs = SUBSCRIPTIONS.map((subscription) => ({
      label: subscription,
      type: 'checkbox',
      value: subscription,
      checked: this.subscriptions.includes(subscription),
    }));

    document.body.appendChild(alert);
    await alert.present();

    const { data } = await alert.onDidDismiss();

    if (data) {
      this.storageService.setSubscriptions(data.values).subscribe((subs) => {
        this.subscriptions = subs;
      });
    }
  }

  removeSubscription(subscription: string) {
    this.subscriptions = this.subscriptions.filter((s) => s !== subscription);

    this.storageService
      .setSubscriptions(this.subscriptions)
      .subscribe((subs) => {
        this.subscriptions = subs;
      });
  }
}
