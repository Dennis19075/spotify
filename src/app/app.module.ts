import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Route } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [ // declarations, components, directvies, pipes
    AppComponent
  ],
  imports: [ //only modules
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
