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
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { EventCalendarComponent } from './pages/event-calendar/event-calendar.component';
import { EventCalendarDetailComponent } from './pages/event-calendar-detail/event-calendar-detail.component';
import { DonateComponent } from './pages/donate/donate.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { RegisterMemberComponent } from './pages/register-member/register-member.component';
import { PolicyDetailComponent } from './pages/policy-detail/policy-detail.component';
import { First2Component } from './pages/first2/first2.component';

const routes: Routes = [
  { path: '', component: First2Component },
  { path: '2', component: FirstComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'news', component: NewsComponent },
  { path: 'product-and-service', component: ProductAndServiceComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'newsdetail/:code', component: NewsDetailComponent },
  {
    path: 'product-and-service-details',
    component: ProductAndServiceDetailsComponent,
  },
  { path: 'performance-details/:code', component: PerformanceDetailsComponent },
  { path: 'party-executive', component: PartyExecutiveComponent },
  { path: 'ideology', component: IdeologyComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-form', component: RegisterFormComponent },
  { path: 'event-calendar', component: EventCalendarComponent },
  {
    path: 'event-calendar-detail/:code',
    component: EventCalendarDetailComponent,
  },
  { path: 'donate', component: DonateComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'register-member', component: RegisterMemberComponent },
  { path: 'policy-detail', component: PolicyDetailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
