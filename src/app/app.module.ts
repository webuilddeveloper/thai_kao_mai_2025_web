import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { GoToTopComponent } from './component/go-to-top/go-to-top.component';
import { AboutComponent } from './pages/about/about.component';
import { NewsComponent } from './pages/news/news.component';
import { ProductAndServiceComponent } from './pages/product-and-service/product-and-service.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './component/footer/footer.component';
import { NewsDetailComponent } from './pages/newsdetail/newsdetail.component';

import { ProductAndServiceDetailsComponent } from './pages/product-and-service-details/product-and-service-details.component';
import { PerformanceDetailsComponent } from './pages/performance-details/performance-details.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';

import { PartyExecutiveComponent } from './pages/party-executive/party-executive.component';
import { IdeologyComponent } from './pages/ideology/ideology.component';
import { FirstComponent } from './pages/first/first.component';
import { HistoryComponent } from './pages/history/history.component';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';


import { registerLocaleData } from '@angular/common';
import localeTh from '@angular/common/locales/th';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EventCalendarDetailComponent } from './pages/event-calendar-detail/event-calendar-detail.component';
import { DonateComponent } from './pages/donate/donate.component';

import { PolicyComponent } from './pages/policy/policy.component';
import { EventCalendarComponent } from './pages/event-calendar/event-calendar.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/language/', '.json');
}

registerLocaleData(localeTh);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    GoToTopComponent,
    AboutComponent,
    NewsComponent,
    ProductAndServiceComponent,
    FooterComponent,
    ContactComponent,
    NewsDetailComponent,
    ProductAndServiceDetailsComponent,
    PerformanceDetailsComponent,
    PartyExecutiveComponent,
    IdeologyComponent,
    FirstComponent,
    HistoryComponent,
    RegisterComponent,
    RegisterFormComponent,
    EventCalendarComponent,
    EventCalendarDetailComponent,
    DonateComponent,
    PolicyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [GoToTopComponent, FooterComponent],
  providers: [ { provide: LOCALE_ID, useValue: 'th-TH' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
