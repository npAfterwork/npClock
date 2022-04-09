import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {ComponentsModule} from '../components/components.module';

import {HomePage} from './home.page';

@NgModule({
						imports:      [
							CommonModule,
							FormsModule,
							IonicModule,
							RouterModule.forChild([
																			{
																				path:      '',
																				component: HomePage,
																				children:  [
																					{path: 'settings', loadChildren: () => import('../pages/settings/settings.module').then(m => m.SettingsPageModule)},
																					{path: 'qlock', loadChildren: () => import('../pages/qlock/qlock.module').then(m => m.QlockPageModule)},
																				]
																			},
																		]),
							ComponentsModule,
						],
						declarations: [HomePage]
					})
export class HomePageModule {}
