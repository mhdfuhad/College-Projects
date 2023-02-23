import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {
  items: any;
  edit = false;
  currSegment = 'watchlist';

  constructor(
    private toastController: ToastController,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.storage.getList(this.currSegment).subscribe((data) => {
      if (data) {
        this.items = data;
      } else {
        this.items = [];
      }
    });
  }

  segmentChanged(ev: any) {
    if (ev.detail.value === 'favorites') {
      this.currSegment = 'favorites';
      this.edit = false;

      this.storage.getList(this.currSegment).subscribe((data) => {
        if (data) {
          this.items = data;
        } else {
          this.items = [];
        }
      });
    } else {
      this.currSegment = 'watchlist';
      this.edit = false;

      this.storage.getList(this.currSegment).subscribe((data) => {
        if (data) {
          this.items = data;
        } else {
          this.items = [];
        }
      });
    }
  }

  setEdit() {
    this.edit = !this.edit;
  }

  async removeCurrentHandler(id: number) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Would you like to remove this item?';
    alert.buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      'Yes',
    ];

    document.body.appendChild(alert);
    await alert.present();

    const { data, role } = await alert.onDidDismiss();

    if (role !== 'cancel') {
      this.items = this.items.filter((item) => item.id !== id);

      this.storage
        .saveToList(this.currSegment, this.items)
        .subscribe(async () => {
          const toast = await this.toastController.create({
            message: `Removed from list`,
            duration: 3000,
            position: 'bottom',
            color: 'dark',
          });

          toast.present();
        });
    }
  }

  ionViewWillLeave() {
    this.edit = false;
  }

  ionViewWillEnter() {
    this.storage.getList(this.currSegment).subscribe((data) => {
      if (data) {
        this.items = data;
      } else {
        this.items = [];
      }
    });
  }
}
