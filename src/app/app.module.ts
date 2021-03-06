import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {IonicStorageModule} from '@ionic/storage';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@NgModule({
						declarations:    [AppComponent],
						entryComponents: [],
						imports:         [
							BrowserModule,
							IonicModule.forRoot(),
							IonicStorageModule.forRoot(),
							AppRoutingModule
						],
						providers:       [
							StatusBar,
							SplashScreen,
							ScreenOrientation,
							{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
						],
						bootstrap:       [AppComponent]
					})
export class AppModule {}
