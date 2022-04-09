import { Component, OnInit } from '@angular/core';
import {SettingsService, TSettings} from '../../services/settings.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  config: TSettings;

  constructor(private readonly settings: SettingsService) { }

  async ngOnInit() {
    this.config = await this.settings.loadConfig();
  }

	async save() {
    await this.settings.saveConfig();
  }
}
