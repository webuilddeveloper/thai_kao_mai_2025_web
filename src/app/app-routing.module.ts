import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NewsComponent } from './pages/news/news.component';
import { ProductAndServiceComponent } from './pages/product-and-service/product-and-service.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NewsDetailComponent } from './pages/newsdetail/newsdetail.component';

import { ProductAndServiceDetailsComponent } from './pages/product-and-service-details/product-and-service-details.component';
import { PerformanceDetailsComponent } from './pages/performance-details/performance-details.component';
import { PartyExecutiveComponent } from './pages/party-executive/party-executive.component';
import { IdeologyComponent } from './pages/ideology/ideology.component';
import { FirstComponent } from './pages/first/first.component';
import { HistoryComponent } from './pages/history/history.component';
import { RegisterComponent } from './pages/register/register.component';
import { EventCalendarComponent } from './pages/event-calendar/event-calendar.component';
import { EventCalendarDetailComponent } from './pages/event-calendar-detail/event-calendar-detail.component';
import { DonateComponent } from './pages/donate/donate.component';

const routes: Routes = [
  { path: '', component: FirstComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'news', component: NewsComponent },
  { path: 'product-and-service', component: ProductAndServiceComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'newsdetail/:code', component: NewsDetailComponent },
  { path: 'product-and-service-details', component: ProductAndServiceDetailsComponent },
  { path: 'performance-details/:code', component: PerformanceDetailsComponent },
  { path: 'party-executive', component: PartyExecutiveComponent },
  { path: 'ideology', component: IdeologyComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'event-calendar', component: EventCalendarComponent },
  { path: 'event-calendar-detail/:code', component: EventCalendarDetailComponent },
  { path: 'donate', component: DonateComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
