import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModuleApp} from "./core/core-module-app.module";
import {HttpClientModule } from "@angular/common/http";
import { StorageModule } from './horoscope-storage/storage.module';
import { HomeComponent } from './home/home.component';
import { HoroscopeModule } from './horoscope/horoscope.module';

@NgModule({
  imports: [
    CoreModuleApp,
    BrowserModule,
    AppRoutingModule,
      ToastrModule.forRoot(),
      BrowserAnimationsModule,
      HttpClientModule,
      StorageModule,
      HoroscopeModule,
      
  ],
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
