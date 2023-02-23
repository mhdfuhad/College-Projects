import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ContentService } from 'src/app/services/content.service';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { Keyboard } from '@capacitor/keyboard';

import SUBSCRIPTIONS from '../../../assets/subscriptionsData.js';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  results = false; // buttons show only if results are available
  items: any; // The search results
  tempItems: any; // array to hold unfiltered items in case user filters
  years: any; // array of years for the filters
  count: number; // the number of items found in the results
  loading: boolean;

  // Props for the filters
  year: string;
  movie = false;
  series = false;
  mySubscriptions = false;
  rating: number;
  subscriptions: Array<string>;
  mySubs: Array<string>;

  constructor(
    private actionSheetController: ActionSheetController,
    private contentService: ContentService,
    private toastController: ToastController,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.subscriptions = [];
    this.loading = false;
    this.items = [];

    this.storageService.getSubscriptions().subscribe((data) => {
      this.mySubs = data;
    });
  }

  async clickedSearch(ev: any) {
    if (ev.target.value === '') {
      this.items = [];
      this.results = false;
      return;
    }

    this.loading = true;
    this.contentService.search(ev.target.value, '').subscribe((data) => {
      if (data) {
        this.items = data;
        this.tempItems = data;
      }
      this.loading = false;
      this.count = this.items.length;
      this.results = true;

      // Set data for filters
      this.years = Array.from(
        new Set(this.items.map((item) => item.year))
      ).sort((a: any, b: any) => b - a);
    });

    await Keyboard.hide();
  }

  async filter(modal: any) {
    modal.dismiss();

    let temp = this.tempItems;

    if (this.year) {
      temp = temp.filter((item) => item.year.toString() === this.year);
    }

    if (this.rating) {
      temp = temp.filter((item) => item.imdbRating / 10 > this.rating);
    }

    if (this.series && !this.movie) {
      temp = temp.filter((item) => item.episodes);
    }

    if (this.movie && !this.series) {
      temp = temp.filter((item) => !item.episodes);
    }

    if (this.subscriptions.length > 0 && !this.mySubscriptions) {
      temp = temp.filter((item) => {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < this.subscriptions.length; i++) {
          if (
            Object.getOwnPropertyNames(item.streamingInfo).includes(
              this.subscriptions[i].toLowerCase()
            )
          ) {
            return true;
          }
        }
      });
    }

    if (this.mySubscriptions && this.mySubs.length > 0) {
      temp = temp.filter((item) => {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < this.mySubs.length; i++) {
          if (
            Object.getOwnPropertyNames(item.streamingInfo).includes(
              this.mySubs[i].toLowerCase()
            )
          ) {
            return true;
          }
        }
      });
    }

    this.items = temp;
    this.count = this.items.length;

    const toast = await this.toastController.create({
      message: `Results filtered, ${this.count} results`,
      duration: 2000,
      position: 'bottom',
      color: 'dark',
    });

    toast.present();

    // Reset filters
    this.year = '';
    this.rating = null;
    this.subscriptions = [];
    this.mySubscriptions = false;
    this.movie = false;
    this.series = false;
  }

  async sort() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Sort by',
      buttons: [
        {
          text: 'Name',
          role: 'name',
        },
        {
          text: 'Year',
          role: 'year',
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();

    if (role === 'name') {
      this.items.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });

      const toast = await this.toastController.create({
        message: 'Sorted by name',
        position: 'bottom',
        color: 'dark',
        duration: 2000,
      });

      toast.present();
    } else if (role === 'year') {
      this.items.sort((a, b) => {
        if (a.year < b.year) {
          return -1;
        }
        if (a.year > b.year) {
          return 1;
        }
        return 0;
      });

      const toast = await this.toastController.create({
        message: 'Sorted by year',
        position: 'bottom',
        color: 'dark',
        duration: 2000,
      });

      toast.present();
    }
  }

  async filterSubscriptions() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Select subscriptions';
    alert.buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      'OK',
    ];
    alert.inputs = SUBSCRIPTIONS.map((subscription) => ({
      label: subscription,
      type: 'checkbox',
      value: subscription,
    }));

    document.body.appendChild(alert);
    await alert.present();

    const { data, role } = await alert.onDidDismiss();

    if (role !== 'cancel') {
      this.subscriptions = data.values;
    }
  }
}
