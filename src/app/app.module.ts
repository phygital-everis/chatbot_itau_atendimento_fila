import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { SMS } from '@ionic-native/sms';
import { Sim } from '@ionic-native/sim';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { IonicStorageModule } from '@ionic/storage';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { Camera } from '@ionic-native/camera';
import { MediaCapture} from '@ionic-native/media-capture';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat/chat';
import { NicknamePage} from '../pages/nickname/nickname';
import { TakePicturePage } from '../pages/take-picture/take-picture';
import { ShowDocPage } from "../pages/show-doc/show-doc";
import { SendSmsPage } from "../pages/send-sms/send-sms";
import { PlanosPage } from '../pages/planos/planos';
import { CustomPlanePage } from '../pages/custom-plane/custom-plane';
import { AddressPage } from "../pages/address/address";
import { ModalHistoryPage } from "../pages/modal-history/modal-history";
import { VideoPage } from "../pages/video/video";

import { VisionProvider } from '../providers/vision/vision';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { HttpEvaProvider } from '../providers/http-eva/http-eva';
import { SendSmsProvider } from '../providers/send-sms/send-sms';
import { WatsonapiProvider } from '../providers/watsonapi/watsonapi';
import { BuscaCepProvider } from '../providers/busca-cep/busca-cep';
import { HttpGenericProvider } from '../providers/http-generic/http-generic';


const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TakePicturePage,
    ChatPage,
    NicknamePage,
    ShowDocPage,
    SendSmsPage,
    PlanosPage,
    CustomPlanePage,
    AddressPage,
    ModalHistoryPage,
    VideoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon:'arrow-back',
      iconMode: 'md',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition'
    }),
    HttpClientModule,
    SocketIoModule.forRoot(config),
    IonicStorageModule.forRoot(),
    BrMaskerModule,
    IonicPageModule.forChild(HomePage)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TakePicturePage,
    ChatPage,
    NicknamePage,
    ShowDocPage,
    SendSmsPage,
    PlanosPage,
    CustomPlanePage,
    AddressPage,
    ModalHistoryPage,
    VideoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    VisionProvider,
    Camera,
    LocalStorageProvider,
    HttpEvaProvider,
    SMS,
    Sim,
    SendSmsProvider,
    WatsonapiProvider,
    BuscaCepProvider,
    HttpGenericProvider,
    MediaCapture
  ]
})
export class AppModule {}
