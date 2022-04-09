import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {TSettings} from '../../services/settings.service';

const W_ES = 'ES';
const W_IST = 'IST';
const W_FUENF = 'FÜNF';
const W_FUENF_FIRST = 0;
const W_FUENF_SECOND = 4;
const W_ZWANZIG = 'ZWANZIG';
const W_ZEHN = 'ZEHN';
const W_ZEHN_FIRST = 1;
const W_ZEHN_SECOND = 9;

const W_VIERTEL = 'VIERTEL';
const W_VOR = 'VOR';
const W_HALB = 'HALB';
const W_NACH = 'NACH';
const W_NEUN = 'NEUN';

const W_EIN = 'EIN';
const W_EINS = 'EINS';
const W_ELF = 'ELF';
const W_ZWEI = 'ZWEI';
const W_DREI = 'DREI';
const W_DREI_FIRST = 2;
const W_DREI_SND = 6;
const W_VIER = 'VIER';
const W_VIER_ROW = 6;
const W_SECHS = 'SECHS';
const W_ACHT = 'ACHT';
const W_SIEBEN = 'SIEBEN';
const W_ZWOELF = 'ZWÖLF';
const W_UHR = 'UHR';

/**
 * Sprachvarianten für den deutschsprachigen Raum
		ZWANZIG NACH ... ZEHN VOR HALB
		ZWANZIG VOR ... ZEHN NACH HALB
		VIERTEL VOR ... DREIVIERTEL

 	Die Ecken zeigen die Minuten an

 */
@Component({
						 selector:    'app-qlock',
						 templateUrl: './qlock.component.html',
						 styleUrls:   ['./qlock.component.scss'],
					 })
export class QlockComponent implements OnInit, OnDestroy {
	rows: string[][] = [];
	mins = {topLeft: false, topRight: false, botLeft: false, botRight: false};
	_config: TSettings;
	@Input()
	set config(value: TSettings) {
		this._config = value;
		this.update();
	}

	get config(): TSettings {
		return this._config;
	}

	private activeWords: { word: string, row: number }[] = [];
	private rows_unsplit: string[] = [
		'ESKISTAFÜNF',
		'ZEHNZWANZIG',
		'DREIVIERTEL',
		'VORUNKTNACH',
		'HALBAELFÜNF',
		'EINSXAMZWEI',
		'DREIAUJVIER',
		'SECHSNLACHT',
		'SIEBENZWÖLF',
		'ZEHNEUNKUHR'
	];

	private hour: number;
	private min: number;
	private inteval: number;

	constructor() {
		this.rows_unsplit.forEach((row) => {
			this.rows.push(row.split(''));
		});
		this.update();
	}

	async ngOnInit() {
		const intervalTime = this.debug ? 1200 : 1000 * 30;
		this.inteval = window.setInterval(() => this.update(), intervalTime);
	}

	ngOnDestroy(): void {
		window.clearInterval(this.inteval);
	}

	isActive(row: string[], col: string, colIdx: number, rowIdx: number) {
		let result = false;
		const all = row.join('');
		this.activeWords.forEach((itm) => {
			const charIdxOfWord = itm.word.indexOf(col);
			const wordIdxOfRow = all.indexOf(itm.word);
			const wordEndIdxOfRow = wordIdxOfRow + itm.word.length - 1;
			if ((wordIdxOfRow >= 0) && (charIdxOfWord >= 0) && (colIdx >= wordIdxOfRow) && (colIdx <= wordEndIdxOfRow) && (rowIdx === (itm.row > -1 ? itm.row : rowIdx))) {
				result = true;
				return false;
			}
		});
		return result;
	}

	activateWord(word: string, row: number = -1) {
		this.activeWords.push({word, row});
	}

	private hhh = 9;
	private mmm = 20;
	private debug = false;
	private debugStr = '';

	private update() {
		let t: moment.Moment;
		if (this.debug) {
			const ts = this.debugStr = '2019-12-12 ' + this.hhh.toString() + ':' + this.mmm.toString();
			// this.hhh++;
			// this.mmm += 1;
			if (this.hhh >= 24) {
				this.hhh = 0;
				this.mmm += 5;
				if (this.mmm >= 60) {
					this.mmm = 0;
				}
			}
			t = moment(ts, 'yyyy-MM-dd hh:mm');
		} else {
			t = moment();
		}

		let hour: number = t.hour(),
			min: number = t.minute();
		if (hour >= 12) hour = hour - 12;

		if (this.config && this.config.showCorners) {
			const mindetail = min % 5;
			this.mins.topLeft = mindetail >= 1;
			this.mins.topRight = mindetail >= 2;
			this.mins.botRight = mindetail >= 3;
			this.mins.botLeft = mindetail >= 4;
			min = (Math.floor(min / 5) * 5) % 60;
		} else {
			min = (Math.round(min / 5) * 5) % 60;
		}

		this.hour = hour;
		this.min = min;

		this.activeWords = [];
		this.activateWord(W_ES);
		this.activateWord(W_IST);
		switch (min) {
			case 0:
				this.activateWord(W_UHR);
				break;
			case 5:
				this.activateWord(W_FUENF, W_FUENF_FIRST);
				this.activateWord(W_NACH);
				break;
			case 10:
				this.activateWord(W_ZEHN, W_ZEHN_FIRST);
				this.activateWord(W_NACH);
				break;
			case 15:
				this.activateWord(W_VIERTEL);
				this.activateWord(W_NACH);
				break;
			case 20:
				//	deZwanzigNach: boolean; // ZWANZIG NACH ... ZEHN VOR HALB
				if (this.config && this.config.deZwanzigNach) {
					this.activateWord(W_ZWANZIG);
					this.activateWord(W_NACH);
				} else {
					this.activateWord(W_ZEHN, W_ZEHN_FIRST);
					this.activateWord(W_VOR);
					this.activateWord(W_HALB);
					hour++;
				}
				break;
			case 25:
				this.activateWord(W_FUENF, W_FUENF_FIRST);
				this.activateWord(W_VOR);
				this.activateWord(W_HALB);
				hour++;
				break;
			case 30:
				this.activateWord(W_HALB);
				hour++;
				break;
			case 35:
				this.activateWord(W_FUENF, W_FUENF_FIRST);
				this.activateWord(W_NACH);
				this.activateWord(W_HALB);
				hour++;
				break;
			case 40:
				// 	deZwanzigVor:  boolean; // ZWANZIG VOR ... ZEHN NACH HALB
				if (this.config && this.config.deZwanzigVor) {
					this.activateWord(W_ZWANZIG);
					this.activateWord(W_VOR);
				} else {
					this.activateWord(W_ZEHN, W_ZEHN_FIRST);
					this.activateWord(W_NACH);
					this.activateWord(W_HALB);
				}
				hour++;
				break;
			case 45:
				// 	deDreiviertel: boolean; // DREIVIERTEL ... VIERTEL VOR
				if (this.config && this.config.deDreiviertel) {
					this.activateWord(W_DREI, W_DREI_FIRST);
					this.activateWord(W_VIERTEL);
				} else {
					this.activateWord(W_VIERTEL);
					this.activateWord(W_VOR);
				}
				hour++;
				break;
			case 50:
				this.activateWord(W_ZEHN, W_ZEHN_FIRST);
				this.activateWord(W_VOR);
				hour++;
				break;
			case 55:
				this.activateWord(W_FUENF, W_FUENF_FIRST);
				this.activateWord(W_VOR);
				hour++;
				break;
			default:
		}
		if (hour >= 12) hour = hour - 12;
		switch (hour) {
			case 0:
				this.activateWord(W_ZWOELF);
				break;
			case 1:
				if (min === 0) {
					this.activateWord(W_EIN);
				} else {
					this.activateWord(W_EINS);
				}
				break;
			case 2:
				this.activateWord(W_ZWEI);
				break;
			case 3:
				this.activateWord(W_DREI, W_DREI_SND);
				break;
			case 4:
				this.activateWord(W_VIER, W_VIER_ROW);
				break;
			case 5:
				this.activateWord(W_FUENF, W_FUENF_SECOND);
				break;
			case 6:
				this.activateWord(W_SECHS);
				break;
			case 7:
				this.activateWord(W_SIEBEN);
				break;
			case 8:
				this.activateWord(W_ACHT);
				break;
			case 9:
				this.activateWord(W_NEUN);
				break;
			case 10:
				this.activateWord(W_ZEHN, W_ZEHN_SECOND);
				break;
			case 11:
				this.activateWord(W_ELF);
				break;
			default:

		}
	}


}
