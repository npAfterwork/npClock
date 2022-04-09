import {Component, HostListener, OnInit} from '@angular/core';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {ActionSheetController, Platform} from '@ionic/angular';
import * as moment from 'moment';
import {SettingsService, TSettings} from '../services/settings.service';


@Component({
						 selector:    'app-home',
						 templateUrl: 'home.page.html',
						 styleUrls:   ['home.page.scss'],
					 })
export class HomePage implements OnInit {

	private inteval: number;
	private config: TSettings;

	@HostListener('window:resize')
	onResize() {
		document.documentElement.style.setProperty('--qlock-max-height', (Math.min(this.platform.width(), this.platform.height())) + 'px');
	}

	private amount: number = 0;

	constructor(
		private readonly platform: Platform,
		private readonly screenOrientation: ScreenOrientation,
		private readonly setttings: SettingsService,
		public actionSheetController: ActionSheetController
	) {
		this.screenOrientation.lock('portrait').then(() => console.log('locked screen')).catch(() => console.warn('not supported'));
		this.onResize();
	}

	async ngOnInit() {
		this.config = await this.setttings.loadConfig();
		this.updateAmount();
		this.inteval = window.setInterval(() => this.updateAmount(), 1000);
	}

	ngOnDestroy(): void {
		window.clearInterval(this.inteval);
	}

	async presentActionSheet() {
		const actionSheet = await this.actionSheetController.create({
																																	header:  'Links',
																																	buttons: [{
																																		text:    'www.leuchtbildshop.net',
																																		role:    'destructive',
																																		icon:    'link',
																																		handler: () => {
																																			window.open('https://www.leuchtbildshop.net/', '_system', 'location=yes');
																																		}
																																	},
																																		{
																																			text:    'bastelladen.wortuhr.de',
																																			role:    'destructive',
																																			icon:    'link',
																																			handler: () => {
																																				window.open('https://bastelladen.wortuhr.de/', '_system', 'location=yes');
																																			}
																																		},
																																		{
																																			text: 'build-yours.de',
																																			role: 'destructive',
																																			icon: 'link', handler: () => {
																																				window.open('https://build-yours.de/', '_system', 'location=yes');
																																			}
																																		}, {
																																			text:    'Cancel',
																																			icon:    'close',
																																			role:    'cancel',
																																			handler: () => {
																																				console.log('Cancel clicked');
																																			}
																																		}]
																																});
		await actionSheet.present();
	}

	private updateAmount() {
		const t = moment(this.config.targetDate, 'DD.MM.YYYY');
		const start = moment();
		const hours = t.diff(start, 'hours');
		const mins = t.diff(start, 'minutes') % 60;
		const secs = t.diff(start, 'seconds') % 60;
		this.amount = hours <= 0 ? 334.75 : Math.trunc((334.75 - hours * 0.05 - mins * 0.05 / 60 - secs * 0.05 / 60 / 60)* 1000000000)/1000000000;

	}
}
