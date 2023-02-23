import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import SwiperCore, { FreeMode } from 'swiper';
import { ContentService } from 'src/app/services/content.service';
import { StorageService } from 'src/app/services/storage.service';

SwiperCore.use([FreeMode]);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  items: any; // array of recommended
  subItems: any; // array of subscribed recommended
  random: any; // array of random
  loading: any;

  subscriptions: any; // must be pulled from db
  userName: string; // name to be shown on home screen pulled from db

  constructor(
    private service: ContentService,
    private loadingCtrl: LoadingController,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.storageService.getName().subscribe((name) => {
      this.showLoading();
      if (name.length > 0) {
        this.userName = name.split(' ')[0];

        this.storageService.getSubscriptions().subscribe((subs) => {
          if (subs) {
            this.subscriptions = subs;
          } else {
            this.subscriptions = [];
          }

          this.service
            .search('', this.subscriptions.join(',').toLowerCase())
            .subscribe((data) => {
              this.subItems = data;
              this.dismissLoading();
            });

          this.service.getRecommended().subscribe((data) => {
            this.items = data;
          });

          this.service.getRandom().subscribe((data) => {
            this.random = data;
          });
        });
      } else {
        this.dismissLoading();
      }
    });
  }

  ionViewWillEnter() {
    this.storageService.getSubscriptions().subscribe((subs) => {
      if (subs) {
        this.subscriptions = subs;
      } else {
        this.subscriptions = [];
      }
    });
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading...',
      cssClass: 'custom-loading',
    });

    this.loading.present();
  }

  dismissLoading() {
    this.loading.dismiss();
  }
}
