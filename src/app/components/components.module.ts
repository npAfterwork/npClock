import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {QlockComponent} from './qlock/qlock.component';

@NgModule({
						imports:      [
							CommonModule,
							IonicModule,
						],
						exports:      [
							QlockComponent,
						],
						declarations: [QlockComponent]
					})
export class ComponentsModule {}
