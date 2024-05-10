import { APP_INITIALIZER, NgModule } from '@angular/core';
import {ErrorHandlingInterceptor} from "./error-handling.interceptor";
import {MessageService} from "./message.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from "@angular/router";
import { NotFoundComponent } from './not-found/not-found.component';
import {CommonModule} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import { AlertComponent } from './alert/alert.component';
import { AccountService } from '../account/account-service';
import { appInitializer } from './helpers/app.initializer';
import { JwtInterceptor } from './helpers/jwt-Interceptor';
import { HoroscopeNamesService } from '../horoscope-storage/horoscope-names.service';
import { MatchFieldsDirective } from './match-fields-directive';

@NgModule({
  imports:
   [ RouterModule,
     CommonModule,
      MatToolbarModule,
    ],

  providers: [
    AccountService,
    { provide: appInitializer, useExisting: AccountService },
    HoroscopeNamesService,
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true },
    MessageService,
    
  ],

declarations: [
   NavbarComponent,
    NotFoundComponent, 
    AlertComponent,
    MatchFieldsDirective,
  ],

exports: [
   NavbarComponent,
   MatchFieldsDirective,
  ]
})

export class CoreModuleApp { }
