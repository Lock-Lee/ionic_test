import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
export const firebaseConfig = {
     apiKey: "AIzaSyAa3AHyI8eOYCbBX-5v12xNZeZF5pvFeMk",
    authDomain: "test-ionic-ed2a0.firebaseapp.com",
    databaseURL: "https://test-ionic-ed2a0.firebaseio.com",
    projectId: "test-ionic-ed2a0",
    storageBucket: "test-ionic-ed2a0.appspot.com",
    messagingSenderId: "224895507517" 
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
