import { Browser } from '@capacitor/browser';
import { StorageService } from 'src/app/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { DomSanitizer } from '@angular/platform-browser';
import SwiperCore, { FreeMode } from 'swiper';
import { ToastController } from '@ionic/angular';
import { IonicSlides } from '@ionic/angular';

SwiperCore.use([FreeMode, IonicSlides]);

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  content: any;
  rating: string;
  genres: any;
  videoURL: any;
  availableOn: any;
  cast: any;
  loaded: boolean; // when all observables are subscribed

  constructor(
    private route: ActivatedRoute,
    private service: ContentService,
    private sanitizer: DomSanitizer,
    private toastController: ToastController,
    private storage: StorageService
  ) {}

  ngOnInit() {
    // Initialization of variables
    this.availableOn = [];
    this.loaded = false;
    this.genres = [];
    this.cast = [];

    // Router params
    const id = this.route.snapshot.paramMap.get('id');
    const type = this.route.snapshot.paramMap.get('type');

    this.service.getDetails(id, type).subscribe((data) => {
      this.content = Object.values(data)[1];

      if (this.content.video.length > 0) {
        this.videoURL =
          'https://www.youtube-nocookie.com/embed/' + this.content.video;
      }

      if (this.content.age < 12) {
        this.rating = 'G';
      } else if (this.content.age < 16) {
        this.rating = 'PG';
      } else if (this.content.age < 18) {
        this.rating = 'PG-13';
      } else {
        this.rating = 'R';
      }

      if (this.content.streamingInfo) {
        this.availableOn = Object.entries(this.content.streamingInfo).filter(
          (plat) => plat[1].hasOwnProperty('ca')
        );
      }

      if (Object.getOwnPropertyNames(data).includes('series')) {
        this.service.getGenres().subscribe((genres) => {
          this.genres = genres.tvGenres.filter((genre) =>
            this.content.genres.includes(genre.id)
          );
        });
      } else {
        this.service.getGenres().subscribe((genres) => {
          this.genres = genres.movieGenres.filter((genre) =>
            this.content.genres.includes(genre.id)
          );
        });
      }

      this.service
        .getCast(this.content.tmdbID, this.content.episodes ? 'tv' : 'movie')
        .subscribe((cast) => {
          this.cast = cast.slice(0, 20);
          this.loaded = true;
        });
    });
  }

  async openLink(link: string) {
    await Browser.open({ url: link });
  }

  getVideoURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
  }

  timeConvert(n) {
    const num = n;
    const hours = num / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    if (rhours === 0) {
      return rminutes + ' mins';
    } else if (rminutes === 0) {
      return rhours + ` hr`;
    } else {
      return rhours + ` hr ` + rminutes + ' mins';
    }
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      color: 'dark',
    });

    toast.present();
  }

  async addToFav() {
    this.storage.getList('favorites').subscribe((favs) => {
      if (favs != null && favs.some((fav) => fav.id === this.content.id)) {
        this.presentToast('Already in favorites');
      } else {
        let list = [];
        if (favs != null) {
          list = favs;
        }

        this.storage
          .saveToList('favorites', [...list, this.content])
          .subscribe(() => {
            this.presentToast('Added to favorites');
          });
      }
    });
  }

  async addToWatchList() {
    this.storage.getList('watchlist').subscribe((watchlist) => {
      console.log(watchlist);
      if (
        watchlist != null &&
        watchlist.some((watch) => watch.id === this.content.id)
      ) {
        this.presentToast('Already in watchlist');
      } else {
        let list = [];
        if (watchlist != null) {
          list = watchlist;
        }

        this.storage
          .saveToList('watchlist', [...list, this.content])
          .subscribe(() => {
            this.presentToast('Added to watchlist');
          });
      }
    });
  }
}
