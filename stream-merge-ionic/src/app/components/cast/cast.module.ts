import { CastComponent } from './cast.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [CastComponent],
  exports: [CastComponent],
})
export class CastComponentModule {}
