import { Component, OnInit } from '@angular/core';
import {SettingsService, TSettings} from '../../services/settings.service';

@Component({
  selector: 'app-qlock-page',
  templateUrl: './qlock.page.html',
  styleUrls: ['./qlock.page.scss'],
})
export class QlockPage implements OnInit {

  config: TSettings;

  constructor(
    private readonly settings: SettingsService
  ) { }

  async ngOnInit() {
    this.config = await this.settings.loadConfig();
  }

  async ionViewWillEnter() {
    const old = await this.settings.loadConfig();
    this.config = Object.assign({}, old); // close for update
  }

}
