import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { ChooseFormatComponent } from './Components/choose-format/choose-format.component';
import { DisplayResultComponent } from './Components/display-result/display-result.component';

@NgModule({
  declarations: [
    ChooseFormatComponent,
    DisplayResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [
    ChooseFormatComponent,
    DisplayResultComponent,
  ]
})
export class AppModule { }
