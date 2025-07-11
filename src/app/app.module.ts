import { NgModule } from '@angular/core';
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


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/language/', '.json');
}

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
    PerformanceDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  exports: [GoToTopComponent, FooterComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
