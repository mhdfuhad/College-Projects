import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';
import { CardComponentModule } from '../../components/card/card.module';
import { SearchPage } from './search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardComponentModule,
    SearchPageRoutingModule,
  ],
  declarations: [SearchPage],
})
export class SearchPageModule {}
