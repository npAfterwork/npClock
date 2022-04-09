import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';


export type TSettings = {
	targetDate: string;
	showCorners:   boolean; // Minuten werden in den Ecken angezeigt
	deZwanzigNach: boolean; // ZWANZIG NACH ... ZEHN VOR HALB
	deZwanzigVor:  boolean; // ZWANZIG VOR ... ZEHN NACH HALB
	deDreiviertel: boolean; // DREIVIERTEL ... VIERTEL VOR
};

const LS_CONFIG_KEY = 'config';

@Injectable({
							providedIn: 'root'
						})
export class SettingsService {

	/**
	 *
	 * 		ZWANZIG VOR ... ZEHN NACH HALB
	 * 		VIERTEL VOR ... DREIVIERTEL
	 */
	private _config: TSettings = {
		targetDate:    '28.9.2020',
		showCorners:   true, // Minuten werden in den Ecken angezeigt
		deZwanzigNach: true, // ZWANZIG NACH ... ZEHN VOR HALB
		deZwanzigVor:  true, // ZWANZIG VOR ... ZEHN NACH HALB
		deDreiviertel: true, // DREIVIERTEL ... VIERTEL VOR
	};
	private hasLoaded = false;

	constructor(private readonly storage: Storage) {
	}

	async loadConfig() {
		if (!this.hasLoaded) {
			const fromStore = await this.storage.get(LS_CONFIG_KEY);
			if (fromStore) {
				this._config = fromStore;
			} else {
				await this.saveConfig();
			}
			this.hasLoaded = true;
		}
		return this._config;
	}

	async saveConfig() {
		return this.storage.set(LS_CONFIG_KEY, this._config);
	}
}
