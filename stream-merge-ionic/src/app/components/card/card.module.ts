import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardComponent } from './card.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class CardComponentModule {}
