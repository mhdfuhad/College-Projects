import { CastComponentModule } from './../../components/cast/cast.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetailsPageRoutingModule } from './details-routing.module';
import { DetailsPage } from './details.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CastComponentModule,
    DetailsPageRoutingModule,
    SwiperModule,
  ],
  declarations: [DetailsPage],
})
export class DetailsPageModule {}
