import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Network } from "@ionic-native/network";
import { clientRequestService } from '../providers/clientRequest';
import { InterceptorService } from '../providers/InterceptorService';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
// import { EmojiPickerModule } from '@ionic-tools/emoji-picker';
import { EmojiProvider } from '../providers/emoji';

import { chatService } from '../providers/chatRoom';
import { AdDirective } from '../components/ad.directive';
import { AlbumCameraProvider } from "../providers/album-camera";
import {SQLite} from "@ionic-native/sqlite"; // 本地数据库;
import { ImagePicker  } from '@ionic-native/image-picker';
import { AndroidPermissions  } from '@ionic-native/android-permissions';
import { File} from "@ionic-native/file";
import { Media } from '@ionic-native/media';
import { FileTransfer, FileUploadOptions, FileTransferObject }from'@ionic-native/file-transfer';
import { MediaCapture } from '@ionic-native/media-capture';
import { Camera } from '@ionic-native/camera';
import { VideoEditor } from '@ionic-native/video-editor';

import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import { ChatServiceClass } from '../providers/chatService'
import { MyApp } from './app.component';
import { Base64 } from '@ionic-native/base64';
// 导入组件
import { ComponentsModule } from '../components/components.module';
import { ChatEleComponent } from '../components/chat-ele/chat-ele';
import { ChatSendEleComponent } from '../components/chat-send-ele/chat-send-ele';
import { RecordChatComponent } from '../components/record-chat/record-chat';
import { ImgChatEleComponent } from '../components/img-chat-ele/img-chat-ele';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DataProvider } from "../providers/db";
import { DeleteDBProvider } from "../providers/deleteDB";
import { UserDataDBService } from "../providers/user-data-db";
import { Config } from "../providers/config";

@NgModule({
  declarations: [
    MyApp,
    AdDirective
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    HttpClientModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:true,//二级页面隐藏tabs1
      // backButtonText:"返回"
    })
],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatEleComponent,
    ChatSendEleComponent,
    RecordChatComponent,
    ImgChatEleComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    clientRequestService,
    SQLite,
    ImagePicker,
    AndroidPermissions,
    chatService,
    DataProvider,
    DeleteDBProvider,
    Config,
    UserDataDBService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    AlbumCameraProvider,
    File,
    Media,
    FileTransfer,
    FileTransferObject,
    MediaCapture,
    Camera,
    VideoEditor,
    ChatServiceClass,
    Base64,
    EmojiProvider
  ]
})
export class AppModule {}
