import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import countries from '../../../assets/countriesList';
import SUBSCRIPTIONS from '../../../assets/subscriptionsData.js';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  customActionSheetOptions = {
    header: 'Select Country',
    cssClass: 'my-custom-actionSheetClass',
  };

  private firstName: string;
  private lastName: string;
  private country: string;
  private countries = countries;
  private subscriptions: Array<string> = [];

  constructor(
    private toastController: ToastController,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit() {}

  setFirstName(ev: any) {
    this.firstName = ev.target.value;
  }

  setLastName(ev: any) {
    this.lastName = ev.target.value;
  }

  setCountry(ev: any) {
    this.country = ev.target.value;
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
      this.subscriptions = data.values;
    }
  }

  removeSubscription(subscription: string) {
    this.subscriptions = this.subscriptions.filter((s) => s !== subscription);
  }

  async next() {
    if (
      !this.firstName ||
      !this.lastName ||
      !this.country ||
      !this.subscriptions.length
    ) {
      const toast = await this.toastController.create({
        message:
          'Please enter data in all fields and select at least one subscription',
        duration: 4000,
        position: 'top',
        color: 'danger',
      });

      toast.present();
    } else {
      console.log(
        this.firstName,
        this.lastName,
        this.country,
        this.subscriptions
      );

      this.storageService
        .setName(this.firstName + ' ' + this.lastName)
        .subscribe((a) => {
          this.storageService.setCountry(this.country).subscribe((b) => {
            this.storageService
              .setSubscriptions(this.subscriptions)
              .subscribe((c) => {
                this.router.navigate(['/']);
              });
          });
        });
    }
  }
}
