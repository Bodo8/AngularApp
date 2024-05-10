import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoroscopeRoutingModule } from './horoscope-routing.module';
import { HoroscopeCreateComponent } from './horoscope-create/horoscope-create.component';
import { HoroscopeService } from './horoscope-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HoroscopeCommonModule } from '../horoscope-common/horoscope-common.module';
import { HoroscopeHomeComponent } from './horoscope-home/horoscope-home.component';
import { HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'
import { MatInputModule } from '@angular/material/input';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

@NgModule({
  declarations: [
    HoroscopeCreateComponent,
    HoroscopeHomeComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    HoroscopeRoutingModule,
    HoroscopeCommonModule,
    HammerModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxMatTimepickerModule,
  ],
  providers: [
    HoroscopeService,
  ],
 // bootstrap: [HoroscopeCreateComponent]
})
export class HoroscopeModule { }
