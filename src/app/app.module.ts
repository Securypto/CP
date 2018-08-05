import { AndroidPermissions } from '@ionic-native/android-permissions';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from '@angular/http';
import { HttpClientModule} from '@angular/common/http';

import { ClipboardModule } from 'ngx-clipboard';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home';
import { ScanPage } from '../pages/scan';
import { ShowQRPage } from '../pages/show';
import { TransactionsPage } from '../pages/transaction';
import { InputPage } from '../pages/input';
import { AddressesPage } from '../pages/addresses';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ScanPage,
    ShowQRPage,
    TransactionsPage,
    InputPage,
    AddressesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    ClipboardModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ScanPage,
    ShowQRPage,
    TransactionsPage,    
    InputPage,
    AddressesPage   
  ],
  providers: [
    AndroidPermissions,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
