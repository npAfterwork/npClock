import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {ComponentsModule} from '../../components/components.module';

import { QlockPageRoutingModule } from './qlock-routing.module';

import { QlockPage } from './qlock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QlockPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [QlockPage]
})
export class QlockPageModule {}
